---
feed: show
content-type: notes
date: 2022-06-23
title: + Index for Cards
date created: 2022-06-22
tags: index索引
---

up:: [[ACCESS 笔记组织法]]

## 全部文件夹

```dataview
TABLE dates
FROM "Cards" and -#index索引
GROUP BY file.folder
```

## 全部卡片
```dataview
TABLE file.folder AS 文件夹, tags AS 标签, file.inlinks AS 入链, file.cday AS 创建日期,file.mday AS 修改日期
FROM "Cards" and -#index索引 and -#readme说明
SORT file.folder asc
```
