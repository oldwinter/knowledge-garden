---
publish: true
---

# Repository Guidelines

This repository is an Obsidian-based digital garden. Notes are Markdown with YAML frontmatter, organized using Zettelkasten/PARA. Publishing is controlled by the `publish: true` flag and the Obsidian Quartz Syncer plugin. There is no `publish_by_frontmatter.py` at the repo root.

## Project Structure & Module Organization
- Notes: `🍀 花园导览/`, `📥 Inbox/`, `Atlas/`, `Cards/`, `Calendar/`, `Extras/`, `Sources/`, `Spaces/`.
- Publish: Obsidian Quartz Syncer `publication center` → dg3 → https://garden.oldwinter.top. See [🌏 本库发布指南](🍀%20花园导览/🧰%20本库指南/🌏%20本库发布指南.md).
- Metadata: YAML frontmatter per note; backlinks via `[[...]]`; tags via `#标签`.

## Build, Test, and Development Commands
- Publish: in Obsidian, set `publish: true` and run the Quartz Syncer `publication center` command. Do not run `python publish_by_frontmatter.py` — that file is gone.
- Link check: in Obsidian, use “检查失效链接” to validate backlinks before publishing.
- Link check (CLI): `node scripts/vault-links.mjs` reports unresolved embeds and broken relative links; `node --test scripts/` gates new breakage.
- Repo checks: `node --test scripts/` (also `.github/workflows/ci.yml`).

## Coding Style & Naming Conventions
- Markdown: Chinese prose; English for technical terms. Headings `#` → `####`. Use `[[双链]]`, `#标签`, atomic notes, and MOCs. Emoji prefixes are allowed (e.g., `🧰`, `📂`). Frontmatter fields include `publish`, `title`, `date created`, `date modified`, `tags`.
- Python: Follow PEP 8, 4-space indent, descriptive names. Keep configuration constants together and avoid hard-coding secrets.

## Testing Guidelines
- Publishing: (1) ensure `publish: true` is set, (2) publish via Quartz Syncer `publication center`, (3) confirm only intended notes appear on garden.oldwinter.top.
- Links: use Obsidian’s “检查失效链接”; spot-check external URLs in edited notes.

## Commit & Pull Request Guidelines
- Commits: imperative mood and focused scope. Examples: `Cards: add MOC for AI notes`, `docs: point publish to Quartz Syncer`.
- PRs: clear description, linked issues, before/after screenshots for MOCs/Canvas, and notes on any script or config changes.

## Security & Configuration Tips
- Keep personal data and keys out of notes; `.gitignore` should exclude sensitive artifacts.
- Review notes before publishing via Quartz Syncer. Do not add a git-push publisher at the repo root.
