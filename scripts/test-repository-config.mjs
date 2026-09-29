import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

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
