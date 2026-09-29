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

