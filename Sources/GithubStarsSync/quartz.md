---
star_date: 2022-06-03 13:04:42
repo_name: jackyzha0/quartz
repo_url: https://github.com/jackyzha0/quartz
description: 🌱 a fast, batteries-included static-site generator that transforms Markdown
  content into fully functional websites
language: TypeScript
stars: 9317
forks: 2916
created_date: 2021-07-18
updated_date: 2025-06-19
pushed_date: 2025-06-18
is_fork: false
license: MIT License
topics:
- digital-garden
- networked-thought
- obsidian
- obsidian-md
- quartz-ssg
- static-site-generator
size_kb: 16233
issues: 178
date created: 2022-08-21
date modified: 2026-11-01
title: quartz
publish: true
分类:
- '[[github开源 - fileclass]]'
---

x:: [[quartz syncer]]

当前公开花园：[[obsidian quartz发布方案]]，站点 https://garden.oldwinter.top ，代码仓 [oldwinter/dg3](https://github.com/oldwinter/dg3)，部署在 [[Netlify]]（见 dg3 的 `netlify.toml`）。下面是历史适配记录；其中「不能用 netlify」已过时。

注意点:  
早期踩过 Netlify 把 URL 小写的坑，所以一度倾向 Vercel / GitHub Pages / Cloudflare Pages。当前 dg3 已用 Netlify 构建。

核心2个点，命令参考 dg3 仓库的构建配置（当前是 `netlify.toml`，不是 `deploy.yaml`）：

- frontmatter需要有title，且value值加双引号。我用linter实现自动生成title，但其不支持自动加双引号，目前我是自己用sed命令加上双引号，linter作者说下个版本将支持title的value也加双引号。
- 目前已支持[[wikilink]]，但依旧需要指定绝对引用路径，而我更习惯最短路径的引用方式，所以在构建时，我用mv命令将md文件批量移动至根目录，从而减少改文件链接的麻烦。

## ，新的v4版本适配

尽量少改动代码，这样能随时热更新同步作者发布的最新版本。

[GitHub - oldwinter/dg3: 开源免费的obsidian发布方案quartz](https://github.com/oldwinter/dg3)

官方推荐cloudflare和githubpage，这2个网内访问慢。所以我只能用netlify了，vercel对xxx.html文件，不影响xxx格式，必须要加上html才能访问，而quartz上面不知道怎么加html后缀，并且其实就算加上，也不够优雅。

## 2024-05-28 ，modified和created日期都不好用，换成使用publishDate字段

每一个待发布的笔记，frontmatter都新增如下字段。

publishDate: 2024-01-02

## 全局图谱太占内存了，已打开直接3gb没了。

如果是未打开全局图谱，只有200MB左右的内存占用，一打开，直接飙升到3gb以上。我的读者如果看到了，会不会骂死我，尤其是电脑内存比较紧张的。

而且似乎有内存泄露，现在这一会儿，已经占用5gb内存了。

![CleanShot 2025-07-29 at 20.26.49@2x.png](https://pub-pic.oldwinter.top/2025/07/514b26c42307a4f8dc99dc7fdadcd5b9.png)
