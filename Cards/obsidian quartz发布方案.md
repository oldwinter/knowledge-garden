---
date created: 2025-07-09
date modified: 2026-11-01
title: obsidian quartz发布方案
publish: true
---

当前公开花园用的就是这一套：[[quartz|Quartz]] 静态站点，代码在 [oldwinter/dg3](https://github.com/oldwinter/dg3)，[[Netlify]] 构建，站点 https://garden.oldwinter.top 。

本库侧只做两件事：笔记 frontmatter 写 `publish: true`，再用 [[quartz syncer]] 的 `publication center` 把文件拷进 dg3 的 `content/`。完整步骤见[[🌏 本库发布指南]]。

相关：[[quartz]]、[[quartz-themes]]、[[quartz syncer]]。
