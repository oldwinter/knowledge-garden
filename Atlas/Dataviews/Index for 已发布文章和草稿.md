---
cssclass: sidebarDataview
date created: 2022-06-09
date modified: 2023-03-14
tags:
  - dataview
title: Index for 已发布文章和草稿
---

文章计划清单通过[[滴答清单]]管理。[打开滴答清单](ticktick://)

## 草稿

```dataview
table 
from #article/todo 
sort dates desc
limit 99
```

## 已发布文章

```dataview
table 
from #article/done
sort dates desc
limit 99
```
