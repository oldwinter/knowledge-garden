---
title: git分支管理策略
date created: 2022-12-11
date modified: 2023-03-14
---

[Git 分支管理策略汇总 - 掘金](https://juejin.cn/post/7164740289922334727)


在merge操作时，选择squash and merge，则会使得pr的所有commit 合并成一个commit，然后merge到master里面，这样会使得pr中的commit历史记录丢失，但能够让master的记录更整洁。

[如何基于 Git 设计合理的多人开发模式？ - 模型巴巴](https://modelbaba.com/version-control/git/2316.html)

原来在华为使用的是forking工作流。

forking工作流，开源用得比较多，但其实开源项目中，也有混着用，有直接在主仓库的特性分支上进行merge请求的。

fork模式，可以让fork出来的仓库和主仓库做权限隔离，方便管控。

[About forks - GitHub Docs](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/about-forks)