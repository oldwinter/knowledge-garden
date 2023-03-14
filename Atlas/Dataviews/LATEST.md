---
date created: 2022-06-09
date modified: 2023-03-14
tags:
  - dataview
title: LATEST
---

### 最近的 30 条编辑笔记

```dataview
table WITHOUT ID file.link AS "File",file.mtime as "修改时间"
from !"templates" and !"assets"
sort file.mtime desc
limit 30
```

### 三天内创建的笔记

```dataview
table file.ctime as 创建时间
from ""
where date(today) - file.ctime <=dur(3 days)
sort file.ctime desc
limit 999
```

### TODO

```dataview
table file.mtime as 修改时间, tags
from ""
where contains(file.tags,"todo")
sort tags desc
limit 20
```

### 回顾记忆

```dataview
table file.mtime as 修改时间, tags
from ""
where contains(file.tags,"review") OR contains(file.tags,"cards") 
sort tags desc
limit 999
```
