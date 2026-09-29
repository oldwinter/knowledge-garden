import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const tracked = execFileSync("git", ["ls-files", "-z"], {
  cwd: root,
  encoding: "utf8",
})
  .split("\0")
  .filter(Boolean);
const basenameCounts = new Map();
for (const file of tracked) {
  const name = basename(file).toLowerCase();
  basenameCounts.set(name, (basenameCounts.get(name) ?? 0) + 1);
}

function assertWikilinksResolve(relativePath) {
  const fence = String.fromCharCode(96).repeat(3);
  let inFence = false;
  const text = readFileSync(join(root, relativePath), "utf8")
    .split("\n")
    .map((line) => {
      const trimmed = line.trimStart();
      if (trimmed.startsWith(fence) || trimmed.startsWith("~~~")) {
        inFence = !inFence;
        return "";
      }
      return inFence ? "" : line;
    })
    .join("\n");
  for (const match of text.matchAll(/!?\[\[([^\]\n]+)\]\]/g)) {
    const target = match[1].split("|")[0].split("#")[0].trim();
    if (!target) continue;
    const candidates = [join(root, target), join(root, dirname(relativePath), target)];
    const hasKnownExtension = /\.(?:md|canvas|base|mdc)$/i.test(target);
    if (!hasKnownExtension) {
      for (const candidate of [...candidates]) {
        candidates.push(`${candidate}.md`, `${candidate}.canvas`, `${candidate}.base`);
      }
    }
    const names = [basename(target)];
    if (!hasKnownExtension) names.push(`${basename(target)}.md`, `${basename(target)}.canvas`, `${basename(target)}.base`);
    const uniqueBasename = names.some((name) => basenameCounts.get(name.toLowerCase()) === 1);
    assert.ok(
      candidates.some((candidate) => existsSync(candidate)) || uniqueBasename,
      `${relativePath} links to missing ${target}`,
    );
  }
}

test("Cursor ignore rules live at the repository root", () => {
  const canonical = join(root, ".cursorignore");
  assert.ok(existsSync(canonical), "missing root .cursorignore");
  assert.equal(
    existsSync(join(root, ".cursor/rules/.cursorignore")),
    false,
    "misplaced .cursor/rules/.cursorignore still exists",
  );
  const rules = readFileSync(canonical, "utf8");
  assert.match(rules, /node_modules/);
  assert.match(rules, /\*\.pdf/);
});

test("plugin-backed mobile pull action has an enabled loadable provider", () => {
  const app = JSON.parse(readFileSync(join(root, ".obsidian/app.json"), "utf8"));
  const enabled = JSON.parse(
    readFileSync(join(root, ".obsidian/community-plugins.json"), "utf8"),
  );
  const provider = app.mobilePullAction.split(":")[0];
  assert.ok(enabled.includes(provider), `${provider} is not enabled`);
  assert.ok(existsSync(join(root, ".obsidian/plugins", provider, "manifest.json")));
  assert.ok(existsSync(join(root, ".obsidian/plugins", provider, "main.js")));
});

test("non-empty hotkey chords are unique", () => {
  const hotkeys = JSON.parse(readFileSync(join(root, ".obsidian/hotkeys.json"), "utf8"));
  const owners = new Map();
  const duplicates = [];
  for (const [command, bindings] of Object.entries(hotkeys)) {
    for (const binding of bindings) {
      const chord = [...(binding.modifiers ?? [])].sort().join("+") + "+" + binding.key;
      if (owners.has(chord)) duplicates.push([chord, owners.get(chord), command]);
      else owners.set(chord, command);
    }
  }
  assert.deepEqual(duplicates, []);
});

test("Daily Notes paths exist when configured", () => {
  const config = JSON.parse(
    readFileSync(join(root, ".obsidian/daily-notes.json"), "utf8"),
  );
  assert.ok(existsSync(join(root, config.folder)), `missing Daily Notes folder ${config.folder}`);
  if (config.template) {
    const template = join(root, config.template);
    assert.ok(
      existsSync(template) || existsSync(`${template}.md`),
      `missing Daily Notes template ${config.template}`,
    );
  }
});

test("committed workspace is public-safe and references repository files", () => {
  const workspacePath = join(root, ".obsidian/.workspace.json");
  const text = readFileSync(workspacePath, "utf8");
  assert.doesNotMatch(text, /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i);
  assert.doesNotMatch(text, /(?:[A-Za-z]:[\\/]|\/Users\/|\/home\/)/);
  const workspace = JSON.parse(text);
  const missing = [];
  const walk = (value) => {
    if (Array.isArray(value)) {
      value.forEach(walk);
      return;
    }
    if (!value || typeof value !== "object") return;
    for (const [key, child] of Object.entries(value)) {
      if (
        (key === "file" || key === "path") &&
        typeof child === "string" &&
        !/^[a-z]+:/i.test(child) &&
        !existsSync(join(root, child))
      ) {
        missing.push(child);
      }
      walk(child);
    }
  };
  walk(workspace);
  for (const recent of workspace.lastOpenFiles ?? []) {
    if (!existsSync(join(root, recent))) missing.push(recent);
  }
  assert.deepEqual(missing, []);
  const attributes = readFileSync(join(root, ".gitattributes"), "utf8");
  assert.match(attributes, /^\.obsidian\/\.workspace\.json binary$/m);
});

test("published Bases index only links to committed files", () => {
  assertWikilinksResolve("Atlas/Bases/∑ BASE.md");
});

test("published ACCESS entry page only links to committed files", () => {
  assertWikilinksResolve(
    "🍀 花园导览/🧰 本库指南/Tutorials/∑ 本库 ACCESS 的文件夹入口汇总.md",
  );
});

test("published Canvas Cursor guide only links to maintained local sources", () => {
  const guide =
    "🍀 花园导览/🧰 本库指南/Obsidian/obsidian相关笔记/Obsidian canvas 使用 cursor生成.md";
  assertWikilinksResolve(guide);
  const text = readFileSync(join(root, guide), "utf8");
  assert.doesNotMatch(text, /my-obsidian-rules\.mdc/);
  assert.doesNotMatch(text, /\[\[Obsidian advanced canvas 规范\]\]/);
});
