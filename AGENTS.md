---
publish: true
---

# AGENTS.md

This repository is oldwinter's public Obsidian digital garden: Markdown notes with YAML frontmatter, organized with Zettelkasten, MOCs, and PARA. Directory conventions and methodology live in [🧰 本库使用指南](🍀%20花园导览/🧰%20本库指南/🧰%20本库使用指南.md).

## Structure

- `🍀 花园导览/`: reader-facing navigation, MOCs, and the library guides.
- `📥 Inbox/`: capture. `Cards/`: permanent atomic notes. `Calendar/`: daily, weekly, monthly, and yearly notes.
- `Atlas/`: Bases, Canvas, Dataviews, and drawings (see `Atlas/_ Atlas Readme.md`). `Sources/`: clippings and external material. `Spaces/`: PARA workspaces. `Extras/`: config, templates, scripts.

## Writing notes

- Chinese prose with English technical terms, headings `#` → `####`, short paragraphs, a space between Chinese and English.
- Inside notes, link with `[[双链]]` or relative Markdown links; keep machine-specific absolute paths out of notes.
- A note created from scratch by AI gets frontmatter `分类: "[[AI生成 - fileclass]]"` and `date created: YYYY-MM-DD`, with no `tags`.
- `.base` and `.canvas` files have their own rules in `.cursor/rules/bases-files.mdc` and `.cursor/rules/obsidian-canvas.mdc`; read the matching one before editing those files.

## Publishing

Publishing is opt-in per note through the `publish: true` frontmatter flag. Obsidian Quartz Syncer's `publication center` copies flagged notes into the dg3 repository, and Netlify serves https://garden.oldwinter.top. The full procedure is [🌏 本库发布指南](🍀%20花园导览/🧰%20本库指南/🌏%20本库发布指南.md). There is no `publish_by_frontmatter.py` at the repo root; Quartz Syncer is the only publish path.

Before flagging a note, check it for private data, draft status, and broken links (Obsidian “检查失效链接”).

## Verify

`node --test scripts/*.mjs`
