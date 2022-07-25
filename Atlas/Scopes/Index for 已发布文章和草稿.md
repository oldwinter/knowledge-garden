---
date created: 2022-06-09
date modified: 2022-07-20
tags: index索引
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

## 使用metadata menu插件管理frontdata

```dataviewjs
const {fieldWithMenu: _} = this.app.plugins.plugins["metadata-menu"].api // destruct metadata-menu api to use fieldWithMenu function and give an alias: "_"

dv.table(["file", "tags"], dv.pages('#article')
.limit(10)
.map(p => [
    p.file.link, 
    _(dv, p, "tags") // pass dv (dataview api instance), p (the page), and the field name to fieldWithMenu (: "-")
    ])
)
```