---
date created: 2025-07-07
date modified: 2026-11-01
rating: 6
publish: true
一句话理由: 数字花园快捷发布工具箱
aliases:
  - quartz-syncer
  - Quartz Syncer
分类:
  - "[[obsidian插件 - fileclass]]"
---

本库当前唯一的公开花园发布入口。给笔记加上 `publish: true`，执行命令 `Open publication center`，插件把文件复制到 [oldwinter/dg3](https://github.com/oldwinter/dg3) 的 `content/`，再由 [[Netlify]] 发布到 https://garden.oldwinter.top 。

插件配置（含 GitHub token）在 `.obsidian/plugins/quartz-syncer/data.json`，该文件已被 `.gitignore` 屏蔽，不进本库。

流程见[[🌏 本库发布指南]]。
