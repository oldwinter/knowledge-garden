---
feed: show
content-type: notes
date: 2022-06-23
title: + Index for Atlases
date created: 2022-06-22
tags: index
---

```dataview
TABLE tags
FROM "Atlas" and -#x/index and -#x/readme
SORT file.name asc
```
