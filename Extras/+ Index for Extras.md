---
feed: show
content-type: notes
date: 2022-06-23
title: + Index for Extras
tags: index索引
---

up:: [[ACCESS 笔记组织法]]

```dataview
TABLE file.folder AS 文件夹, tags AS 标签, file.inlinks AS 入链, file.cday AS 创建日期,file.mday AS 修改日期
FROM "Extras" and -#index索引 and -#readme说明
SORT file.folder asc
```
