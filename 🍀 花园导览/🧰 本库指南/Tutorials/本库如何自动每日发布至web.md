---
date created: 2022-08-25
date modified: 2026-11-01
title: 本库如何自动每日发布至web
publish: true
---

当前公开花园不走下面的 git submodule 日更脚本。主路径是：本库 md 打上 `publish: true` → [[quartz syncer]] 的 `publication center` 复制到 [oldwinter/dg3](https://github.com/oldwinter/dg3) 的 `content/` → [[Netlify]] 构建 → https://garden.oldwinter.top 。详见[[🌏 本库发布指南]]。

下面是 2022–2023 的历史流程，保留作对照。当时把 obsidian 笔记库以类似博客的方式发布至网络，用过 2 个第三方免费方案，详见[[obsidian 目前最完美的免费发布方案 - 渐进式教程]]。

在执行完[[本库如何自动每日同步至github]]的笔记库同步命令后，接着执行从笔记库拉取最新笔记，并自动同步至 git 仓库的命令。当时 2 个方案的仓库均采用了[[git submodule]]；dg3 后来改成直接往 `content/` 上传，不再依赖 submodule。

- [GitHub - oldwinter/dg: 数字花园的最完美免费方案](https://github.com/oldwinter/dg)（已归档的 Jekyll 方案，对应 https://notes.oldwinter.top ）
- [GitHub - oldwinter/dg3: 🌱 host your own second brain and digital garden for free](https://github.com/oldwinter/dg3)（当前 Quartz 方案，对应 https://garden.oldwinter.top ）

在自己电脑上第一次 git clone 后，还需要执行 `git submodule update --init --recursive`，以初始化 submodule，后续才能顺利执行以下命令。

命令如下：

```zsh
# dg jekyll方案（历史）
cd /Users/cdd/works/dg/_notes/
git checkout -q main
git pull 
cd /Users/cdd/works/dg
git add .
git commit -m "auto publish1 by keyboard"
git push

# dg3 quartz方案（历史 submodule 写法；当前改为 quartz syncer）
cd /Users/cdd/works/dg3/content/
git checkout -q main
git pull
cd /Users/cdd/works/dg3
git add .
git commit -m "auto publish3 by keyboard"
git push
```

当 push 至 GitHub 后，将会自动触发后续的构建和发布流程。dg（Jekyll）和 dg3（Quartz）目前都是 [[Netlify]] 构建，不是 [[Vercel]]。
