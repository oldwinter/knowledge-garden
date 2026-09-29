import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, extname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function assertWikilinksResolve(relativePath) {
  const text = readFileSync(join(root, relativePath), "utf8");
  for (const match of text.matchAll(/!?\[\[([^\]\n]+)\]\]/g)) {
    const target = match[1].split("|")[0].split("#")[0].trim();
    if (!target) continue;
    const candidates = [join(root, target), join(root, dirname(relativePath), target)];
    if (!extname(target)) {
      for (const candidate of [...candidates]) {
        candidates.push(`${candidate}.md`, `${candidate}.canvas`, `${candidate}.base`);
      }
    }
    assert.ok(
      candidates.some((candidate) => existsSync(candidate)),
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
});

test("published Bases index only links to committed files", () => {
  assertWikilinksResolve("Atlas/Bases/∑ BASE.md");
});
