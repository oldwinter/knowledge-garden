---
date created: 2025-07-25
date modified: 2026-11-01
title: obsidian publish 发布
tags:
  - todo/某天
publish: true
aliases:
  - obsidian publish
---

## 2022年6月新发现

有个5美元1个月的markbase服务，正在内测。关注。目前双链还不支持。#待办/某天

## 第三方发布服务

[[hugo和jekyll对比]]

obsidian 的第三方发布能力，目前 [[决赛圈]]2 个，但都有点不尽人意，等一段时间再说吧。

- [jackyzha0 (Jacky Zhao) · GitHub](https://github.com/jackyzha0)
- [GitHub - Jekyll-Garden/jekyll-garden.github.io: A Digital Garden Theme for Jekyll. Jekyll Garden lets you create a static HTML version of your markdown notes and publish via Github pages. Made for Obsidian users!](https://github.com/Jekyll-Garden/jekyll-garden.github.io)
- 前者对于未创建的词条支持不友好，尤其中文，会显示一大串 html 格式的编码。后者不支持中文搜索，二者都需要往 frontmatter 里面加 title 和 date 等数据，倒是可以用 linter 插件时间，但还是有点麻烦。
- 前者目前不支持 wikilink 的双括号结构，需要手动把格式转换成 markdown 绝对路径引用的格式，或者全移动至根目录。后者目前中文排版有点问题，反向引用界面溢出边缘了。

## 方案对比

欠缺：中文搜索。黑暗模式切换。手机适配右上角按钮。[[frontmatter]] 需要添加 feed，content-type，date，title 字段

当时尝试过的第三方仓 `oldwinter/digital-garden` 已不存在。后续 Jekyll 方案落在已归档的 [oldwinter/dg](https://github.com/oldwinter/dg)（https://notes.oldwinter.top），当前公开花园是 [oldwinter/dg3](https://github.com/oldwinter/dg3)（https://garden.oldwinter.top）。见[[🌏 本库发布指南]]。

## andy 滑窗方案主题的 liys

[GitHub - aravindballa/notes.aravindballa.com](https://github.com/aravindballa/notes.aravindballa.com)

[https://notes.aravindballa.com](https://notes.aravindballa.com/)

限制挺多，文本中的表格、裸露代码都会报错。但这个还不是关键，它的 build 速度太慢了，要几十分钟。

## 新发现的方案

[GitHub - maximevaillancourt/digital-garden-jekyll-template: Start your own digital garden using this Jekyll template 🌱](https://github.com/maximevaillancourt/digital-garden-jekyll-template)

也是基于 [[jekyll]]，主题样式有些不同。得看看有没有中文搜索 bug
