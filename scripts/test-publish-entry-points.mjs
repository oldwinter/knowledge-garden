import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const guideRel = "🍀 花园导览/🧰 本库指南/🌏 本库发布指南.md";

const agentDocs = ["AGENTS.md", "CLAUDE.md", "GEMINI.md"].map((name) => ({
  name,
  text: readFileSync(join(root, name), "utf8"),
}));
const guide = readFileSync(join(root, guideRel), "utf8");
const publishFlow = readFileSync(join(root, ".cursor/rules/publish-flow.mdc"), "utf8");
const workspace = readFileSync(join(root, ".cursor/rules/workspace-structure.mdc"), "utf8");

test("root has no publish_by_frontmatter.py", () => {
  assert.equal(existsSync(join(root, "publish_by_frontmatter.py")), false);
});

test("agent docs point to Quartz Syncer, not the missing script", () => {
  for (const { name, text } of agentDocs) {
    assert.doesNotMatch(
      text,
      /Script: `publish_by_frontmatter\.py` at the repo root/,
      `${name} still lists the missing root script`,
    );
    assert.doesNotMatch(
      text,
      /Run publish: `python publish_by_frontmatter\.py`/,
      `${name} still runs the missing command`,
    );
    assert.match(text, /Quartz Syncer/);
    assert.match(text, /publication center/);
    assert.match(text, /本库发布指南/);
    assert.match(text, /There is no `publish_by_frontmatter\.py` at the repo root/);
  }
  assert.ok(existsSync(join(root, guideRel)), `missing ${guideRel}`);
});

test("publish guide and cursor rules drop the dead root command", () => {
  assert.doesNotMatch(guide, /执行根目录的\[\[publish_by_frontmatter\.py\]\]/);
  assert.match(guide, /quartz syncer/);
  assert.match(guide, /publication center/);
  assert.doesNotMatch(publishFlow, /mdc:publish_by_frontmatter\.py/);
  assert.doesNotMatch(workspace, /mdc:publish_by_frontmatter\.py/);
  assert.match(publishFlow, /Quartz Syncer|quartz syncer/);
  assert.match(workspace, /Quartz Syncer|quartz syncer/);
});
