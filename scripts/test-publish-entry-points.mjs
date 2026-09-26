import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const guideRel = "🍀 花园导览/🧰 本库指南/🌏 本库发布指南.md";

const agentDocs = [{ name: "AGENTS.md", text: readFileSync(join(root, "AGENTS.md"), "utf8") }];
const guide = readFileSync(join(root, guideRel), "utf8");

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

test("CLAUDE.md and GEMINI.md import AGENTS.md instead of copying it", () => {
  for (const name of ["CLAUDE.md", "GEMINI.md"]) {
    assert.equal(readFileSync(join(root, name), "utf8").trim(), "@AGENTS.md", name);
  }
});

test("publish guide drops the dead root command", () => {
  assert.doesNotMatch(guide, /执行根目录的\[\[publish_by_frontmatter\.py\]\]/);
  assert.match(guide, /quartz syncer/);
  assert.match(guide, /publication center/);
});
