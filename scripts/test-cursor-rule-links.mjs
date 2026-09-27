import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const rulesDir = join(root, ".cursor", "rules");

const ruleFiles = readdirSync(rulesDir)
  .filter((name) => name.endsWith(".mdc"))
  .map((name) => ({ name, text: readFileSync(join(rulesDir, name), "utf8") }));

test("every mdc: link in .cursor/rules resolves to a real file", () => {
  let count = 0;
  for (const { name, text } of ruleFiles) {
    for (const match of text.matchAll(/\]\(mdc:([^)]+)\)/g)) {
      count += 1;
      const target = match[1];
      assert.ok(existsSync(join(root, target)), `${name} links to missing ${target}`);
    }
  }
  assert.ok(count > 0, "no mdc: links found in .cursor/rules");
});

test("rules point to real scripts, not missing ones", () => {
  for (const { name, text } of ruleFiles) {
    assert.doesNotMatch(text, /replace_canvas_ids\.py/, `${name} still lists the missing script`);
  }
});
