// Vault link checker — resolves [[wikilinks]], ![[embeds]], and relative
// Markdown links against the real file tree, the way Obsidian does.
//
// Usage: node scripts/vault-links.mjs [--json]
// Exit code is always 0 — this is a reporting tool. Hard gates live in
// scripts/test-vault-links.mjs (node --test).

import { readdirSync, readFileSync, statSync } from "node:fs";
import { basename, dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const SKIP_DIRS = new Set([".git", ".obsidian", ".trash", "node_modules"]);
const URI_SCHEME = /^[a-zA-Z][a-zA-Z0-9+.-]*:/;

export function indexVault(root) {
  const files = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      if (SKIP_DIRS.has(name)) continue;
      const path = join(dir, name);
      if (statSync(path).isDirectory()) walk(path);
      else files.push(relative(root, path).split("\\").join("/"));
    }
  };
  walk(root);

  const byRel = new Set(files);
  const byName = new Map(); // basename with extension -> rel paths
  const byStem = new Map(); // basename without extension -> rel paths
  for (const rel of files) {
    const base = basename(rel);
    (byName.get(base) ?? byName.set(base, []).get(base)).push(rel);
    if (base.startsWith(".")) continue; // dotfiles are never [[stem]] targets
    const stem = base.replace(/\.[^.]*$/, "");
    (byStem.get(stem) ?? byStem.set(stem, []).get(stem)).push(rel);
  }
  return { root, files, byRel, byName, byStem };
}

// Remove fenced code blocks and inline code spans. Links inside code are
// examples, not real vault links — Obsidian does not resolve them either.
export function stripCode(markdown) {
  const out = [];
  let fence = null;
  for (const line of markdown.split("\n")) {
    const m = line.match(/^ {0,3}(`{3,}|~{3,})/);
    if (fence === null && m) {
      fence = { ch: m[1][0], len: m[1].length };
      continue;
    }
    if (fence !== null) {
      if (m && m[1][0] === fence.ch && m[1].length >= fence.len) fence = null;
      continue;
    }
    out.push(line.replace(/`[^`\n]*`/g, ""));
  }
  return out.join("\n");
}

const WIKI_RE = /(!?)\[\[([^\]|#\n]+)((?:#[^\]|#\n]*)*)(?:\|[^\]\n]*)?\]\]/g;
const MDLINK_RE = /(?<![!\[])\[[^\]]*\]\(([^)#\n]*)(#[^)\n]*)?\)/g;

export function extractLinks(markdown) {
  const body = stripCode(markdown);
  const links = [];
  const lineOf = (idx) => body.slice(0, idx).split("\n").length;
  for (const m of body.matchAll(WIKI_RE)) {
    let target = m[2].trim();
    try {
      target = decodeURIComponent(target);
    } catch {
      // literal % in target — Obsidian tolerates it
    }
    links.push({
      kind: m[1] === "!" ? "embed" : "wiki",
      target,
      anchor: (m[3] || "").slice(1),
      line: lineOf(m.index),
      raw: m[0],
    });
  }
  for (const m of body.matchAll(MDLINK_RE)) {
    let target = m[1].trim();
    if (!target || URI_SCHEME.test(target) || target.startsWith("#")) continue;
    try {
      target = decodeURIComponent(target);
    } catch {
      // literal % — treat verbatim
    }
    links.push({
      kind: "md",
      target,
      anchor: (m[2] || "").slice(1),
      line: lineOf(m.index),
      raw: m[0],
    });
  }
  return links;
}

function stripMdSuffix(target) {
  return target.replace(/\.md$/i, "");
}

// Obsidian resolution: a bare stem matches any file with that basename;
// a path containing "/" is vault-relative (with a file-dir-relative fallback).
export function resolveWikiTarget(target, fromRel, index) {
  const candidates = [];
  const noExt = stripMdSuffix(target);
  if (target.includes("/")) {
    for (const c of [target, `${target}.md`, noExt]) {
      if (index.byRel.has(c)) candidates.push(c);
      const rel = join(dirname(fromRel), c).split("\\").join("/");
      if (index.byRel.has(rel)) candidates.push(rel);
    }
    return { resolved: candidates.length > 0, path: candidates[0], ambiguous: false, candidates };
  }
  // An explicit extension ([[x.png]], [[x.md]]) selects that exact file;
  // a bare stem matches every file sharing it (Obsidian may then pick one).
  const nameHits = index.byName.get(target) ?? [];
  const stemHits = nameHits.length ? [] : index.byStem.get(noExt) ?? index.byStem.get(target) ?? [];
  const hits = [...new Set([...nameHits, ...stemHits])];
  return {
    resolved: hits.length > 0,
    path: hits[0],
    ambiguous: hits.length > 1,
    candidates: hits,
  };
}

export function resolveMdTarget(target, fromRel, index) {
  const rel = join(dirname(fromRel), target).split("\\").join("/");
  return index.byRel.has(rel) ? rel : index.byRel.has(target) ? target : null;
}

// Headings and block ids a note exposes, for #anchor validation.
export function extractAnchors(markdown) {
  const body = stripCode(markdown);
  const headings = new Set();
  const blocks = new Set();
  for (const line of body.split("\n")) {
    const h = line.match(/^#{1,6}\s+(.*?)\s*#*\s*$/);
    if (h) headings.add(h[1].replace(/[*_`~\[\]]/g, "").trim());
    const b = line.match(/\^([A-Za-z0-9_-]+)\s*$/);
    if (b) blocks.add(b[1]);
  }
  return { headings, blocks };
}

export function scanVault(root) {
  const index = indexVault(root);
  const report = {
    files: index.files.length,
    mdFiles: 0,
    wikiLinks: 0,
    embeds: 0,
    mdLinks: 0,
    dangling: [], // intentional: note links to a not-yet-written note
    unresolvedEmbeds: [],
    brokenMdLinks: [],
    ambiguousLinks: [],
    missingAnchors: [],
  };
  const anchorCache = new Map();
  const anchorsFor = (rel) => {
    if (!anchorCache.has(rel)) {
      anchorCache.set(rel, extractAnchors(readFileSync(join(root, rel), "utf8")));
    }
    return anchorCache.get(rel);
  };

  for (const rel of index.files) {
    if (!rel.endsWith(".md")) continue;
    report.mdFiles++;
    const body = readFileSync(join(root, rel), "utf8");
    for (const link of extractLinks(body)) {
      if (link.kind === "md") {
        report.mdLinks++;
        if (!resolveMdTarget(link.target, rel, index)) {
          report.brokenMdLinks.push({ from: rel, target: link.target, line: link.line });
        }
        continue;
      }
      if (!link.target) continue; // [[#anchor]] self-link
      if (link.kind === "wiki") report.wikiLinks++;
      else report.embeds++;
      const res = resolveWikiTarget(link.target, rel, index);
      if (!res.resolved) {
        const entry = { from: rel, target: link.target, line: link.line };
        (link.kind === "embed" ? report.unresolvedEmbeds : report.dangling).push(entry);
        continue;
      }
      if (res.ambiguous) {
        report.ambiguousLinks.push({ from: rel, target: link.target, line: link.line, candidates: res.candidates });
      }
      if (link.anchor && res.path && res.path.endsWith(".md")) {
        const { headings, blocks } = anchorsFor(res.path);
        const a = link.anchor;
        const ok = a.startsWith("^") ? blocks.has(a.slice(1)) : headings.has(a.replace(/^#+/, "").trim());
        if (!ok && (headings.size || blocks.size)) {
          report.missingAnchors.push({ from: rel, target: link.target, anchor: a, line: link.line });
        }
      }
    }
  }
  return report;
}

function main() {
  const root = join(dirname(fileURLToPath(import.meta.url)), "..");
  const report = scanVault(root);
  if (process.argv.includes("--json")) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }
  console.log(`vault: ${report.mdFiles} markdown files (${report.files} total)`);
  console.log(`links: ${report.wikiLinks} wikilinks, ${report.embeds} embeds, ${report.mdLinks} relative md links`);
  console.log(`dangling note-links (intentional, informational): ${report.dangling.length}`);
  const section = (title, rows, fmt) => {
    console.log(`\n${title}: ${rows.length}`);
    for (const r of rows) console.log(`  ${fmt(r)}`);
  };
  section("unresolved ![[embeds]]", report.unresolvedEmbeds, (r) => `${r.target}  <- ${r.from}:${r.line}`);
  section("broken relative md links", report.brokenMdLinks, (r) => `${r.from}:${r.line} -> ${r.target}`);
  section("ambiguous-target links", report.ambiguousLinks, (r) => `${r.from}:${r.line} -> ${r.target} (${r.candidates.join(" | ")})`);
  section("links to missing #anchors", report.missingAnchors, (r) => `${r.from}:${r.line} -> ${r.target}#${r.anchor}`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main();
}
