import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const guideRel = "🍀 花园导览/🧰 本库指南/🧰 本库使用指南.md";
const guide = readFileSync(join(root, guideRel), "utf8");

function section(heading, nextHeading) {
  const start = guide.indexOf(heading);
  assert.notEqual(start, -1, `missing ${heading}`);
  const rest = guide.slice(start + heading.length);
  const end = rest.indexOf(nextHeading);
  return end === -1 ? rest : rest.slice(0, end);
}

test("usage guide starts with Open folder as vault", () => {
  const firstOpen = section("## 第一次打开", "## Obsidian：使用篇");
  const later = section("## Obsidian：使用篇", "## 第二大脑：理论篇");

  assert.ok(
    guide.indexOf("## 第一次打开") < guide.indexOf("## Obsidian：使用篇"),
    "第一次打开 must come before the plugin essays",
  );
  assert.match(firstOpen, /Open folder as vault/);
  assert.match(firstOpen, /README\.md/);
  assert.match(firstOpen, /\.obsidian\//);
  assert.match(firstOpen, /Restricted Mode/);
  assert.match(firstOpen, /Open file/);
  assert.match(firstOpen, /Use this template|git clone|Download ZIP/);
  assert.match(firstOpen, /\[\[🍀 花园导览\]\]/);
  assert.doesNotMatch(firstOpen, /publish_by_frontmatter\.py/);

  assert.ok(
    later.includes("安全模式"),
    "later config section still mentions 安全模式",
  );
  assert.ok(existsSync(join(root, "README.md")));
  assert.ok(existsSync(join(root, ".obsidian")));
  assert.ok(existsSync(join(root, "🍀 花园导览/🍀 花园导览.md")));
});
