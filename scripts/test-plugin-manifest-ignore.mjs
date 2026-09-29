import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
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

test("every enabled community plugin has a loadable manifest and bundle", () => {
  const enabled = JSON.parse(readFileSync(join(root, ".obsidian/community-plugins.json"), "utf8"));
  for (const id of enabled) {
    const pluginDir = join(root, ".obsidian/plugins", id);
    const manifestPath = join(pluginDir, "manifest.json");
    assert.ok(existsSync(manifestPath), `${id}/manifest.json is missing`);
    assert.ok(existsSync(join(pluginDir, "main.js")), `${id}/main.js is missing`);
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    assert.equal(manifest.id, id, `${id}/manifest.json declares id ${manifest.id}`);
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
