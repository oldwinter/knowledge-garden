import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const rulesDir = join(root, ".cursor", "rules");
const mdcLink = /\(mdc:([^)]+)\)/g;

test("cursor rules directory contains only .mdc files", () => {
  const names = readdirSync(rulesDir);
  const extras = names.filter((name) => !name.endsWith(".mdc"));
  assert.deepEqual(extras, [], `unexpected files in .cursor/rules: ${extras.join(", ")}`);
});

test("mdc: links in cursor rules resolve to files", () => {
  const files = readdirSync(rulesDir).filter((name) => name.endsWith(".mdc"));
  assert.ok(files.length > 0, "expected .mdc rules");
  const missing = [];
  for (const name of files) {
    const text = readFileSync(join(rulesDir, name), "utf8");
    for (const match of text.matchAll(mdcLink)) {
      const target = match[1].trim();
      if (!existsSync(join(root, target))) {
        missing.push(`${name} -> ${target}`);
      }
    }
  }
  assert.deepEqual(missing, [], `broken mdc links:\n${missing.join("\n")}`);
});

test("cursor rules do not point at a missing replace_canvas_ids.py", () => {
  assert.equal(existsSync(join(root, "Extras/Scripts/replace_canvas_ids.py")), false);
  for (const name of readdirSync(rulesDir).filter((n) => n.endsWith(".mdc"))) {
    const text = readFileSync(join(rulesDir, name), "utf8");
    assert.doesNotMatch(
      text,
      /Extras\/Scripts\/replace_canvas_ids\.py/,
      `${name} still names the missing script as if it exists`,
    );
  }
});

test("repo-root .cursorignore exists", () => {
  assert.ok(existsSync(join(root, ".cursorignore")));
});
