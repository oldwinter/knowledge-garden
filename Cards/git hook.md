---
feed: show
content-type: notes
date: 2022-06-17
title: git hook
---
配一下隐私保护 #todo/今天

git hook 配置在.git 文件夹里面，是本地个人使用的，不会同步到代码仓库，所以一般都是使用 [[husky]] 配置。

脚本配置文件夹为.huskyrc.json。执行的命令，用简单的 linux 组合成 bash 脚本达到效果即可。比如用 [[grep]] 命令，从指定目录搜索全部文件是否包含某字符串

```bash
grep -nr '陈冬' ./pages
grep -nr '136996' ./pages
grep -nr '18768' ./pages
```
