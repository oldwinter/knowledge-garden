import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const files = execFileSync("git", ["ls-files", "-z", "--", "*.md"], {
  cwd: root,
  encoding: "utf8",
})
  .split("\0")
  .filter(Boolean);

// Remove fenced code blocks and inline code spans while keeping line numbers.
function stripCode(markdown) {
  let fenceChar = null;
  let fenceLen = 0;
  const lines = markdown.split("\n").map((line) => {
    const fence = line.match(/^\s{0,3}(`{3,}|~{3,})/);
    if (fence) {
      if (!fenceChar) {
        fenceChar = fence[1][0];
        fenceLen = fence[1].length;
      } else if (fence[1][0] === fenceChar && fence[1].length >= fenceLen) {
        fenceChar = null;
      }
      return "";
    }
    return fenceChar ? "" : line;
  });
  return lines.join("\n").replace(/(`+)[^\n]*?\1/g, (span) => " ".repeat(span.length));
}

// Inline link/image destination: <angle> form, or a non-space run allowing one
// level of balanced parens (e.g. "1.0%20(1.0).d.ts"). Stops before a "title".
const LINK_RE = /!?\[[^\]\n]*\]\(\s*(<[^>\n]*>|[^\s)\n]*(?:\([^)\n]*\)[^\s)\n]*)*)/g;

const SCHEME_RE = /^[a-zA-Z][a-zA-Z0-9+.-]*:/;

test("relative Markdown links resolve to existing files", () => {
  const dead = [];
  for (const file of files) {
    const text = stripCode(readFileSync(join(root, file), "utf8"));
    for (const match of text.matchAll(LINK_RE)) {
      let href = match[1];
      if (href.startsWith("<")) href = href.slice(1, -1);
      if (!href || href.startsWith("#") || href.startsWith("//") || SCHEME_RE.test(href)) continue;
      const target = href.split("#")[0].split("?")[0];
      if (!target) continue;
      let decoded;
      try {
        decoded = decodeURIComponent(target);
      } catch {
        decoded = target;
      }
      if (!existsSync(join(root, dirname(file), decoded))) {
        const line = text.slice(0, match.index).split("\n").length;
        dead.push(`${file}:${line} -> ${href}`);
      }
    }
  }
  assert.deepEqual(dead, [], "dead relative Markdown links");
});
