---
dg-publish: true
date created: 2022-08-25
date modified: 2023-03-14
title: 本库如何自动每日同步至github
---

[[本库如何指定笔记同步至github]]

为什么不使用[[obsidian git]]插件？  
因为它执行gti同步命令的时候，会让obsidian变得非常卡。而且本身我只需要用git定期备份只github，其他的git版本回退等功能，我都是使用[[VSCode]]打开本库执行的，功能更全面，用起来也更得心应手。所以就采用了操作系统级的自动执行git命令的方案，而非obsidian内置git执行的方案。

如何配置操作系统级的自动git命令？  
随便找一个自动化运行的工具，设置为定时触发以下命令即可：

```zsh
cd /Users/cdd/Works/knowledge-garden
git pull
git add .
git commit -m "auto by keyboard"
git push
```

mac上常见的工具有：[[Keyboard Maestro]]、[[hazel]]等，我使用的前者。配置截图如下：  
![](https://img2.oldwinter.top/202208250919001.png)
