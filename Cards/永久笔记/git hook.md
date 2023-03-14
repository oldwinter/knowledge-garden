---
date created: 2022-06-09
date modified: 2023-03-14
title: git hook
---

配一下隐私保护

git hook 配置在.git 文件夹里面，是本地个人使用的，不会同步到代码仓库，所以一般都是使用 [[husky]] 配置。

脚本配置文件夹为.huskyrc.json。执行的命令，用简单的 linux 组合成 bash 脚本达到效果即可。比如用 [[grep]] 命令，从指定目录搜索全部文件是否包含某字符串

```bash
grep -nr '陈冬' ./pages
grep -nr '136996' ./pages
grep -nr '18768' ./pages
```

[[2022-07-14]]，平时写的时候注意一下就行，应该用不到git hook，如果配置这个，会增加复杂度，让笔记库杂糅进太多东西，变得不纯粹。
