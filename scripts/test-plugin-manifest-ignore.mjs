import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function isIgnored(relPath) {
  try {
    execFileSync("git", ["check-ignore", "-q", relPath], { cwd: root });
    return true;
  } catch (error) {
    if (error.status === 1) return false;
    throw error;
  }
}

test("plugin manifest.json files are not ignored", () => {
  assert.equal(
    isIgnored(".obsidian/plugins/omnisearch/manifest.json"),
    false,
    "manifest.json must survive the blanket *.json rule",
  );
});

test("every enabled community plugin can commit its manifest.json", () => {
  const enabled = JSON.parse(readFileSync(join(root, ".obsidian/community-plugins.json"), "utf8"));
  for (const id of enabled) {
    assert.equal(
      isIgnored(`.obsidian/plugins/${id}/manifest.json`),
      false,
      `${id}/manifest.json is ignored, so the plugin cannot load in a fresh clone`,
    );
  }
});

test("plugin data.json and private plugin dirs stay ignored", () => {
  for (const relPath of [
    ".obsidian/plugins/obsidian-weread-plugin/data.json",
    ".obsidian/plugins/omnisearch/searchIndex.json",
    ".obsidian/plugins/obsidian-content-protection/manifest.json",
  ]) {
    assert.equal(isIgnored(relPath), true, `${relPath} must stay ignored`);
  }
});
