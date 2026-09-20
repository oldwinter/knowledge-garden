import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const readme = readFileSync(join(root, "README.md"), "utf8");

const startGuides = [
  { label: "🍀 花园导览", file: "🍀 花园导览/🍀 花园导览.md" },
  { label: "🧰 本库使用指南", file: "🍀 花园导览/🧰 本库指南/🧰 本库使用指南.md" },
  { label: "🌏 本库发布指南", file: "🍀 花园导览/🧰 本库指南/🌏 本库发布指南.md" },
  { label: "为什么要开源笔记", file: "🍀 花园导览/🧰 本库指南/Tutorials/为什么要开源笔记.md" },
  { label: "ACCESS 笔记组织法", file: "Spaces/2-Area/知识管理/ACCESS 笔记组织法.md" },
];

function section(heading, nextHeading) {
  const start = readme.indexOf(heading);
  assert.notEqual(start, -1, `missing ${heading}`);
  const rest = readme.slice(start + heading.length);
  const end = rest.indexOf(nextHeading);
  return end === -1 ? rest : rest.slice(0, end);
}

function markdownHref(label, markdown) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = markdown.match(new RegExp(`\\[${escaped}\\]\\(([^)]+)\\)`));
  assert.ok(match, `${label} must be a Markdown link`);
  return decodeURIComponent(match[1]);
}

test("GitHub start guides are Markdown links to real files", () => {
  const quickStart = section("## 快速开始", "## 目录结构");
  const catalog = section("## 目录结构和本开箱即用库截图", "## 贡献与交流");
  const surface = `${quickStart}\n${catalog}`;

  for (const { label, file } of startGuides) {
    assert.doesNotMatch(surface, new RegExp(`\\[\\[${label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\]\\]`));
    const href = markdownHref(label, surface);
    assert.equal(href.replace(/^\.\//, ""), file);
    assert.ok(existsSync(join(root, file)), `missing ${file}`);
  }
});

test("concept wiki links stay for the garden", () => {
  assert.match(readme, /\[\[Obsidian\]\]/);
  assert.match(readme, /\[\[常青笔记\]\]/);
  assert.match(readme, /\[\[双链笔记\]\]/);
});
