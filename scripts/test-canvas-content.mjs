import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const load = (rel) => JSON.parse(readFileSync(join(root, rel), "utf8"));

const WIN = "Atlas/Canvas/软件天梯榜/2025年我的Windows软件天梯榜.canvas";
const MAC = "Atlas/Canvas/软件天梯榜/2025年我的macOS软件天梯榜.canvas";
const FLOW = "Atlas/Canvas/工作流/信息收集工作流.canvas";
const EMBED = "Atlas/Canvas/canvas 嵌入高级视图使用示例.canvas";

// A node "carries" a name via its text label or its file basename, so the
// check holds whether an entry is an icon file node or a text placeholder.
const carries = (n, name) =>
  (n.text ?? "").toLowerCase().includes(name.toLowerCase()) ||
  (n.file ?? "").split("/").pop().toLowerCase().includes(name.toLowerCase());

// Tier rows are marked by "# God"/"# S"/"# A"/"# B"/"# C"/"# D" label nodes;
// an entry belongs to a tier when its vertical center sits inside the band.
function findInTier(j, label, name) {
  const band = j.nodes.find((n) => (n.text ?? "").trim() === `# ${label}`);
  assert.ok(band, `tier label "${label}" missing`);
  return j.nodes.find(
    (n) =>
      carries(n, name) &&
      n.y + n.height / 2 >= band.y &&
      n.y + n.height / 2 <= band.y + band.height,
  );
}

const ranking = [
  [WIN, "God", "cursor"],
  [WIN, "S", "Obsidian"],
  [WIN, "S", "GoogleDrive"],
  [WIN, "A", "Chrome"],
  [WIN, "B", "Telegram"],
  [WIN, "C", "Anki"],
  [WIN, "D", "VSCode"],
  [MAC, "God", "cursor"],
  [MAC, "S", "Obsidian"],
  [MAC, "S", "GoogleDrive"],
  [MAC, "A", "Chrome"],
  [MAC, "B", "阿里云盘"],
  [MAC, "C", "OBSStudio"],
  [MAC, "D", "Apifox"],
];

test("software ranking canvases keep every tier populated", () => {
  for (const rel of [WIN, MAC]) {
    const j = load(rel);
    for (const label of ["God", "S", "A", "B", "C", "D"]) {
      const band = j.nodes.find((n) => (n.text ?? "").trim() === `# ${label}`);
      assert.ok(band, `${rel}: tier label "${label}" missing`);
      const entries = j.nodes.filter(
        (n) =>
          n !== band &&
          n.type !== "group" &&
          n.y + n.height / 2 > band.y &&
          n.y + n.height / 2 < band.y + band.height,
      );
      assert.ok(entries.length > 0, `${rel}: tier "${label}" is empty`);
    }
  }
});

test("representative app/tier assignments survive in both ranking canvases", () => {
  const cache = {};
  for (const [rel, tier, name] of ranking) {
    cache[rel] ??= load(rel);
    assert.ok(
      findInTier(cache[rel], tier, name),
      `${rel}: no node carrying "${name}" inside "${tier}" tier`,
    );
  }
});

test("信息收集工作流 keeps its capture-route nodes and labeled edges", () => {
  const j = load(FLOW);
  const nodes = new Map(j.nodes.map((n) => [n.id, n]));
  for (const [id, name] of [
    ["9c94b69632d2e3e1", "iqoo13"],
    ["537c9bb7dee1dd28", "MacBook"],
    ["c76ead9123d7a50e", "语音闪念收集工作流"],
    ["278b5875823e68be", "Folo"],
    ["ae7b9643517c1b65", "Arc浏览器"],
  ]) {
    assert.ok(nodes.has(id), `${FLOW}: node ${id} missing`);
    assert.ok(carries(nodes.get(id), name), `${FLOW}: node ${id} lost its "${name}" label`);
  }
  const edges = new Map(j.edges.map((e) => [e.id, e]));
  for (const [id, label] of [
    ["9ea6858f12b11cfb", "语音闪念"],
    ["6234d9c61993639e", "浏览器中打开阅读"],
    ["c62f7f8de7a2bedc", "app中分享链接至统一inbox"],
    ["aeeb2d95a9233b45", "个人任务备忘"],
    ["9b1a47a4b590f22a", null],
    ["b0fdb287611ab91d", null],
  ]) {
    assert.ok(edges.has(id), `${FLOW}: edge ${id} missing`);
    const e = edges.get(id);
    if (label) assert.ok((e.label ?? "").includes(label), `${FLOW}: edge ${id} lost label "${label}"`);
    assert.ok(nodes.has(e.fromNode), `${FLOW}: edge ${id} fromNode dangling`);
    assert.ok(nodes.has(e.toNode), `${FLOW}: edge ${id} toNode dangling`);
  }
});

test("canvas embed example keeps its demo targets and links", () => {
  const j = load(EMBED);
  const nodes = new Map(j.nodes.map((n) => [n.id, n]));
  for (const [id, name] of [
    ["b8da9f6e2aabaf9a", "键盘快捷键映射图"],
    ["e8750232afa4a6ab", "KANBAN"],
    ["2f1ff5ec2c527912", "花园导览"],
    ["a79ee5b1f117d3b0", "Wiki Home"],
  ]) {
    assert.ok(nodes.has(id), `${EMBED}: node ${id} missing`);
    assert.ok(carries(nodes.get(id), name), `${EMBED}: node ${id} lost its "${name}" label`);
  }
  const edgeIds = new Set(j.edges.map((e) => e.id));
  for (const id of ["828f8a371489816c", "a5bb5fba41027309", "d23de9f990c47108", "b940e8bed92f4440"]) {
    assert.ok(edgeIds.has(id), `${EMBED}: edge ${id} missing`);
  }
});
