import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import {
  extractLinks,
  indexVault,
  resolveWikiTarget,
  scanVault,
} from "./vault-links.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// Known-broken vault embeds — a ratchet. Each entry is "<linking file>\t<target>".
// These ![[embed]] targets were deleted or never committed; they are real
// defects pending human triage (restore the file or drop the reference).
// The gate below fails on any NEW unresolved embed; shrink this list by
// fixing the embed and deleting its line.
const KNOWN_BROKEN_EMBEDS = new Set([
  "Calendar/Plan & Review/Weekly/2025-06-W27.md\t本周笔记.base",
  "Cards/HOMEPAGE.md\t本库的宏观统计数据",
  "Cards/PPV.md\tPPV人生管理系统.canvas",
  "Cards/gemini-cli.md\tcursor 1.0 有的全部tools",
  "Cards/nvm.md\t常见的编程语言环境管理工具",
  "Cards/快捷键、图标、命令行的对比与选择.md\t常用命令行工具包",
  "Extras/Prompts/Obsidian相关/lineage卡片生成prompt.md\t嵌入文件",
  "Extras/Prompts/Obsidian相关/lineage卡片生成prompt.md\t嵌入笔记",
  "Spaces/1-Project/2025下半年小红书探索/2025我的macOS软件天梯榜-文字版.md\t2025年macos软件天梯榜-文字版本.canvas",
  "Spaces/1-Project/2025下半年小红书探索/为什么我不顾一切，给Cursor评级God.md\tobsidian和cursor联用.canvas",
  "Spaces/1-Project/2025下半年小红书探索/给你最宠幸的应用，一键上桌的机会.md\tmacOS 全局快捷键 - Hyper 键.canvas",
  "Spaces/1-Project/2025下半年小红书探索/给你最宠幸的应用，一键上桌的机会.md\t键盘快捷键映射图 - Hyper - macOS.canvas",
  "Spaces/1-Project/2025下半年小红书探索/耗时15年，横跨3大平台，我从253款软件中选出的终极名单！.md\t_ 软件天梯榜 总览.canvas",
  "Spaces/2-Area/∑ 2-Area.md\t∑ 知识管理",
  "Spaces/2-Area/∑ 2-Area.md\t_ 云服务和部署",
  "Spaces/2-Area/∑ 2-Area.md\t_macos高效使用",
  "Spaces/2-Area/∑ 2-Area.md\t_ windows高效使用",
  "Spaces/2-Area/∑ 2-Area.md\t_ 数字花园建设与维护",
  "Spaces/2-Area/∑ 2-Area.md\t_ 思维工具与模块",
  "Spaces/2-Area/知识管理/PARA和MOC联用组织笔记.md\tProjects.base",
  "Spaces/2-Area/知识管理/PARA和MOC联用组织笔记.md\tAreas.base",
  "Spaces/2-Area/知识管理/PARA和MOC联用组织笔记.md\tResources.base",
  "Spaces/2-Area/知识管理/PARA和MOC联用组织笔记.md\tArchive.base",
  "Spaces/2-Area/运动健康/肌肉库/胸大肌.md\tUntitled.png",
  "Spaces/3-Resource/chrome插件/arc浏览器插件重装list.md\tchrome插件.base",
  "Spaces/3-Resource/chrome插件/沉浸式翻译.md\timmersive-translate-config-with-terms-2025-7-1_0-5-19.json",
  "Spaces/3-Resource/chrome插件/沉浸式翻译.md\timmersive-translate-config-2025-3-13_13-49-10.txt",
  "Spaces/3-Resource/chrome插件/沉浸式翻译.md\tgemini pro",
  "Spaces/3-Resource/∑ 3-Resource.md\tVSCode 插件",
  "Spaces/3-Resource/∑ 3-Resource.md\t账号与安全",
  "Spaces/3-Resource/∑ 3-Resource.md\t影音娱乐",
  "Spaces/3-Resource/软件梳理/windows软件/∑ windows必备软件.md\t软件捆绑包.ubundle",
  "Spaces/3-Resource/软件梳理/安卓软件/安卓手机必备软件.md\t∑ DB 安卓软件",
  "🍀 花园导览/🧰 本库指南/Obsidian/obsidian相关笔记/base 使用技巧.md\t使用filter tilte字段搜索过滤.base",
]);

// --- engine unit tests on a tiny fixture vault -----------------------------

function fixtureVault(files) {
  const dir = mkdtempSync(join(tmpdir(), "vault-links-"));
  for (const [rel, body] of Object.entries(files)) {
    const path = join(dir, rel);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, body);
  }
  return dir;
}

test("bare stems resolve vault-wide; explicit extensions pick the exact file", () => {
  const dir = fixtureVault({
    "a/note.md": "[[x]] [[x.md]] [[x.canvas]]",
    "b/x.md": "",
    "c/x.canvas": "{}",
  });
  const idx = indexVault(dir);
  const stem = resolveWikiTarget("x", "a/note.md", idx);
  assert.equal(stem.resolved, true);
  assert.equal(stem.ambiguous, true); // x.md and x.canvas share the stem
  const exact = resolveWikiTarget("x.canvas", "a/note.md", idx);
  assert.equal(exact.resolved, true);
  assert.equal(exact.ambiguous, false);
  assert.equal(exact.path, "c/x.canvas");
});

test("path targets resolve vault-relative, then relative to the linking file", () => {
  const dir = fixtureVault({
    "a/note.md": "[[sub/y]] [[../z]]",
    "a/sub/y.md": "",
    "z.md": "",
  });
  const idx = indexVault(dir);
  assert.equal(resolveWikiTarget("sub/y", "a/note.md", idx).path, "a/sub/y.md");
  assert.equal(resolveWikiTarget("../z", "a/note.md", idx).resolved, true);
  assert.equal(resolveWikiTarget("missing/deep", "a/note.md", idx).resolved, false);
});

test("links inside fenced code and inline code are ignored", () => {
  const links = extractLinks(
    "[[real]]\n```md\n[[fenced]]\n```\n`[[inline]]` and `![[pic.png]]`\n![[real-embed.png]]\n",
  );
  assert.deepEqual(
    links.map((l) => `${l.kind}:${l.target}`),
    ["wiki:real", "embed:real-embed.png"],
  );
});

test("aliases, headings, block refs, and .md suffixes are stripped for resolution", () => {
  const dir = fixtureVault({ "a.md": "", "n.md": "[[a|alias]] [[a#h]] [[a#^b]] [[a.md]]" });
  const links = extractLinks(readFileSync(join(dir, "n.md"), "utf8"));
  assert.deepEqual(
    links.map((l) => [l.target, l.anchor]),
    [
      ["a", ""],
      ["a", "h"],
      ["a", "^b"],
      ["a.md", ""],
    ],
  );
  const idx = indexVault(dir);
  for (const l of links) assert.equal(resolveWikiTarget(l.target, "n.md", idx).resolved, true);
});

test("unresolved targets split into dangling links vs broken embeds", () => {
  const dir = fixtureVault({
    "n.md": "[[later-note]] ![[gone.png]] ![[kept.png]]",
    "kept.png": "png",
  });
  const report = scanVault(dir);
  assert.deepEqual(
    report.dangling.map((e) => e.target),
    ["later-note"],
  );
  assert.deepEqual(
    report.unresolvedEmbeds.map((e) => e.target),
    ["gone.png"],
  );
});

test("md links skip URI schemes and anchors; broken relative paths are caught", () => {
  const dir = fixtureVault({
    "n.md": "[ok](other.md) [site](https://x.dev) [app](cubox://card?id=1) [self](#h) [bad](gone.md)",
    "other.md": "",
  });
  const report = scanVault(dir);
  assert.deepEqual(
    report.brokenMdLinks.map((e) => e.target),
    ["gone.md"],
  );
});

test("percent-encoded targets decode; literal % does not crash", () => {
  const dir = fixtureVault({
    "a b.md": "",
    "n.md": "[[a%20b]] [[100% legit]]",
  });
  const idx = indexVault(dir);
  const links = extractLinks(readFileSync(join(dir, "n.md"), "utf8"));
  assert.equal(links[0].target, "a b");
  assert.equal(resolveWikiTarget(links[0].target, "n.md", idx).resolved, true);
  assert.equal(links[1].target, "100% legit");
});

test("ratchet membership matches unresolved embeds", () => {
  const dir = fixtureVault({
    "n.md": "![[gone.png]]",
  });
  const report = scanVault(dir);
  const pair = `${report.unresolvedEmbeds[0].from}\t${report.unresolvedEmbeds[0].target}`;
  assert.equal(pair, "n.md\tgone.png");
});

// --- real-vault gates ------------------------------------------------------

test("no broken relative markdown links in the vault", () => {
  const report = scanVault(root);
  assert.deepEqual(report.brokenMdLinks, []);
});

test("no wikilink resolves to an ambiguous stem", () => {
  const report = scanVault(root);
  assert.deepEqual(report.ambiguousLinks, []);
});

test("no NEW unresolved embeds beyond the known-broken ratchet", () => {
  const report = scanVault(root);
  const fresh = report.unresolvedEmbeds.filter((e) => !KNOWN_BROKEN_EMBEDS.has(`${e.from}\t${e.target}`));
  assert.deepEqual(
    fresh,
    [],
    "new unresolved ![[embeds]] — restore the target, fix the reference, or (if intentionally absent) add to KNOWN_BROKEN_EMBEDS in test-vault-links.mjs",
  );
});

test("link summary stays sane (regression floor)", () => {
  const report = scanVault(root);
  assert.ok(report.mdFiles > 900, `expected ~960 markdown files, got ${report.mdFiles}`);
  assert.ok(report.wikiLinks > 4000, `expected ~4700 wikilinks, got ${report.wikiLinks}`);
});
