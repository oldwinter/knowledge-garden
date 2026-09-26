import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const obsidian = (...parts) => join(root, ".obsidian", ...parts);

const appearance = JSON.parse(readFileSync(obsidian("appearance.json"), "utf8"));
const bookmarks = JSON.parse(readFileSync(obsidian("bookmarks.json"), "utf8"));

test("every enabled css snippet exists in .obsidian/snippets/", () => {
  const missing = appearance.enabledCssSnippets.filter(
    (name) => !existsSync(obsidian("snippets", `${name}.css`)),
  );
  assert.deepEqual(missing, []);
});

test("every file/folder bookmark path exists in the vault", () => {
  const missing = [];
  const walk = (items) => {
    for (const item of items) {
      if (
        (item.type === "file" || item.type === "folder") &&
        !existsSync(join(root, item.path))
      ) {
        missing.push(item.path);
      }
      walk(item.items ?? []);
    }
  };
  walk(bookmarks.items);
  assert.deepEqual(missing, []);
});
