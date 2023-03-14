---
title: 临时file cooker使用的dataview表达式
date created: 2022-09-08
date modified: 2023-03-14
---

找到全部+开头的moc，进行替换

```dataview
list
from #MOC
where contains(file.name,"+")
```
