import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function readJson(rel) {
  const path = join(root, rel);
  let raw;
  try {
    raw = readFileSync(path, "utf8");
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    throw new Error(`cannot read ${rel}: ${reason}`);
  }
  try {
    return JSON.parse(raw);
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    throw new Error(`invalid JSON in ${rel}: ${reason}`);
  }
}

test("enabled community plugins exist as directories", () => {
  const ids = readJson(".obsidian/community-plugins.json");
  assert.ok(Array.isArray(ids), "community-plugins.json must be an array of plugin ids");
  const missing = [];
  for (const id of ids) {
    assert.equal(typeof id, "string");
    assert.ok(id.length > 0, "plugin id must be non-empty");
    const dir = join(root, ".obsidian", "plugins", id);
    if (!existsSync(dir) || !statSync(dir).isDirectory()) {
      missing.push(id);
    }
  }
  assert.deepEqual(missing, [], `enabled plugins missing on disk: ${missing.join(", ")}`);
});

test("Atlas canvas files are valid JSON", () => {
  const canvasRoot = join(root, "Atlas", "Canvas");
  assert.ok(existsSync(canvasRoot), "Atlas/Canvas missing");

  function walk(dir, acc) {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name);
      if (statSync(path).isDirectory()) {
        walk(path, acc);
      } else if (name.endsWith(".canvas")) {
        acc.push(path);
      }
    }
    return acc;
  }

  const files = walk(canvasRoot, []);
  assert.ok(files.length > 0, "expected committed .canvas files");
  const bad = [];
  for (const path of files) {
    try {
      const doc = JSON.parse(readFileSync(path, "utf8"));
      assert.equal(typeof doc, "object");
      assert.ok(doc !== null);
    } catch (err) {
      const reason = err instanceof Error ? err.message : String(err);
      bad.push(`${path}: ${reason}`);
    }
  }
  assert.deepEqual(bad, [], `invalid canvas JSON:\n${bad.join("\n")}`);
});

test("gitignore has no duplicate ignore lines", () => {
  const lines = readFileSync(join(root, ".gitignore"), "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
  const seen = new Map();
  const dupes = [];
  for (const line of lines) {
    if (seen.has(line)) {
      dupes.push(line);
    }
    seen.set(line, true);
  }
  assert.deepEqual(dupes, [], `duplicate gitignore entries: ${dupes.join(", ")}`);
});
