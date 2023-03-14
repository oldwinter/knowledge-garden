---
dg-publish: true
date created: 2022-09-03
date modified: 2023-03-14
title: 本库如何指定笔记同步至github
---

按2个维度去讨论场景：

- github仓库是private还是public。
- 笔记上传范围指定，采用白名单机制还是黑名单机制。

本库，或者说我自己，采用的是public公开库，因为要分享给你。其次，我想分享出来的笔记远多余我不想分享出来的笔记，所以是黑名单机制：默认情况下，笔记全部上传分享，指定某个别涉及个人隐私的笔记不上传。

方法很简单，使用.gitignore文件即可，可直接用vscode打开本库，根目录就有.gitignore文件。语法参见：[[gitignore 语法]]

若你想要采用白名单机制：最直观简单的想法就是，只将这些笔记进行git add，commit和push操作即可。
