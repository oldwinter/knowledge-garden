---
feed: show
content-type: notes
date: 2022-06-23
title: + Index for Spaces
tags: index索引
date created: 2022-06-23
---

up:: [[ACCESS 笔记组织法]]

## 文件夹
```dataview
TABLE date
FROM "Spaces" and -#index索引
GROUP BY file.folder
```

## 全部文件
```dataview
TABLE file.folder AS 文件夹, tags AS 标签, file.inlinks AS 入链, file.cday AS 创建日期,file.mday AS 修改日期
FROM "Spaces" and -#index索引 and -#readme说明
SORT file.folder asc
```
