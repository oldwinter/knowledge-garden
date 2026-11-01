import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const guideRel = "🍀 花园导览/🧰 本库指南/🌏 本库发布指南.md";
const dailyRel = "🍀 花园导览/🧰 本库指南/Tutorials/本库如何自动每日发布至web.md";
const usageRel = "🍀 花园导览/🧰 本库指南/🧰 本库使用指南.md";
const roadmapRel = "🍀 花园导览/🧰 本库指南/🏗 本库Roadmap.md";
const quartzSyncerRel = "Cards/quartz syncer.md";
const quartzSchemeRel = "Cards/obsidian quartz发布方案.md";
const jekyllSchemeRel = "Cards/obsidian jekyll发布方案.md";
const quartzThemesRel = "Cards/quartz-themes.md";
const officialPublishRel =
  "🍀 花园导览/🧰 本库指南/Obsidian/obsidian相关笔记/obsidian publish 发布.md";

const agentDocs = [{ name: "AGENTS.md", text: readFileSync(join(root, "AGENTS.md"), "utf8") }];
const guide = readFileSync(join(root, guideRel), "utf8");
const daily = readFileSync(join(root, dailyRel), "utf8");
const usage = readFileSync(join(root, usageRel), "utf8");
const roadmap = readFileSync(join(root, roadmapRel), "utf8");
const officialPublish = readFileSync(join(root, officialPublishRel), "utf8");

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
    assert.match(text, /garden\.oldwinter\.top/);
    assert.match(text, /dg3/);
    assert.match(text, /Netlify/);
  }
  assert.ok(existsSync(join(root, guideRel)), `missing ${guideRel}`);
});

test("digital-garden-ai is an archived predecessor, not this publish path", () => {
  for (const { name, text } of agentDocs) {
    assert.match(text, /digital-garden-ai/);
    assert.match(text, /archived predecessor/);
    assert.match(text, /not coupled to this vault's publish path/);
    assert.doesNotMatch(
      text,
      /digital-garden-ai[^\n]{0,80}copies flagged notes into the dg3/,
      `${name} must not treat digital-garden-ai as the Quartz Syncer publisher`,
    );
  }
  assert.match(guide, /digital-garden-ai/);
  assert.match(guide, /已归档的前代/);
  assert.match(guide, /没有耦合/);
  assert.doesNotMatch(
    guide,
    /digital-garden-ai[^\n]{0,80}复制到 dg3/,
    "publish guide must not treat digital-garden-ai as the dg3 publisher",
  );
});

test("CLAUDE.md and GEMINI.md import AGENTS.md instead of copying it", () => {
  for (const name of ["CLAUDE.md", "GEMINI.md"]) {
    assert.equal(readFileSync(join(root, name), "utf8").trim(), "@AGENTS.md", name);
  }
});

test("publish guide drops the dead root command and names the live path", () => {
  assert.doesNotMatch(guide, /执行根目录的\[\[publish_by_frontmatter\.py\]\]/);
  assert.match(guide, /quartz syncer/);
  assert.match(guide, /publication center/);
  assert.match(guide, /garden\.oldwinter\.top/);
  assert.match(guide, /github\.com\/oldwinter\/dg3/);
  assert.match(guide, /Netlify/);
  assert.match(guide, /当前公开花园发布路径/);
  assert.doesNotMatch(guide, /garden\.oldwiner\.top/);
});

test("daily web-publish tutorial no longer claims dg3 currently deploys on Vercel", () => {
  assert.match(daily, /quartz syncer/);
  assert.match(daily, /garden\.oldwinter\.top/);
  assert.match(daily, /Netlify/);
  assert.doesNotMatch(
    daily,
    /目前我的dg方案托管在，我的dg3方案托管在\[\[Vercel\]\]/,
  );
  assert.match(daily, /都是 \[\[Netlify\]\] 构建，不是 \[\[Vercel\]\]/);
});

test("contributor entry notes keep the live path and drop stale targets", () => {
  assert.match(usage, /garden\.oldwinter\.top/);
  assert.match(usage, /quartz syncer/);
  assert.doesNotMatch(roadmap, /garden\.oldwiner\.top/);
  assert.match(roadmap, /garden\.oldwinter\.top/);
  assert.doesNotMatch(officialPublish, /github\.com\/oldwinter\/digital-garden/);
  assert.match(officialPublish, /github\.com\/oldwinter\/dg3/);
});

test("quartz scheme notes exist and do not point at a missing token note", () => {
  for (const rel of [quartzSyncerRel, quartzSchemeRel, jekyllSchemeRel, quartzThemesRel]) {
    assert.ok(existsSync(join(root, rel)), `missing ${rel}`);
  }
  const quartzSyncer = readFileSync(join(root, quartzSyncerRel), "utf8");
  assert.doesNotMatch(quartzSyncer, /\[\[quartz syncer token\]\]/);
  assert.match(quartzSyncer, /publication center/);
  assert.match(quartzSyncer, /garden\.oldwinter\.top/);
});
