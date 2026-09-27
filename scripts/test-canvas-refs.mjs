import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function listCanvases(dir) {
  const out = [];
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    const s = statSync(p);
    if (s.isDirectory()) {
      if (e !== ".git" && e !== ".agent") out.push(...listCanvases(p));
    } else if (e.endsWith(".canvas")) {
      out.push(p);
    }
  }
  return out;
}

const canvases = listCanvases(root).map((p) => ({
  path: p,
  rel: p.slice(root.length + 1),
}));

test("every .canvas file parses as JSON", () => {
  assert.ok(canvases.length > 0, "no .canvas files found");
  for (const c of canvases) {
    const j = JSON.parse(readFileSync(c.path, "utf8"));
    assert.ok(
      Array.isArray(j.nodes ?? []) && Array.isArray(j.edges ?? []),
      `${c.rel} must have nodes/edges arrays`,
    );
  }
});

test("canvas node ids are unique and contain no '-'", () => {
  for (const c of canvases) {
    const j = JSON.parse(readFileSync(c.path, "utf8"));
    const seen = new Set();
    for (const n of j.nodes ?? []) {
      assert.ok(n.id, `${c.rel} has a node without id`);
      assert.doesNotMatch(n.id, /-/, `${c.rel} node id ${n.id} contains '-'`);
      assert.ok(!seen.has(n.id), `${c.rel} duplicate id ${n.id}`);
      seen.add(n.id);
    }
    for (const e of j.edges ?? []) {
      assert.ok(e.id, `${c.rel} has an edge without id`);
      assert.doesNotMatch(e.id, /-/, `${c.rel} edge id ${e.id} contains '-'`);
      assert.ok(!seen.has(e.id), `${c.rel} duplicate id ${e.id}`);
      seen.add(e.id);
    }
  }
});

test("canvas edges only reference existing node ids", () => {
  for (const c of canvases) {
    const j = JSON.parse(readFileSync(c.path, "utf8"));
    const ids = new Set((j.nodes ?? []).map((n) => n.id));
    for (const e of j.edges ?? []) {
      assert.ok(ids.has(e.fromNode), `${c.rel} edge ${e.id} fromNode ${e.fromNode} is dangling`);
      assert.ok(ids.has(e.toNode), `${c.rel} edge ${e.id} toNode ${e.toNode} is dangling`);
    }
  }
});

test("canvas file nodes point at files that exist in the vault", () => {
  for (const c of canvases) {
    const j = JSON.parse(readFileSync(c.path, "utf8"));
    for (const n of j.nodes ?? []) {
      if (n.type !== "file") continue;
      assert.ok(n.file, `${c.rel} file node ${n.id} has no file`);
      assert.ok(
        existsSync(join(root, n.file)),
        `${c.rel} node ${n.id} targets missing file ${n.file}`,
      );
    }
  }
});
