---
feed: show
content-type: notes
date: 2022-06-23
title: + Index for Cards
date created: 2022-06-22
tags: index
---

```dataview
TABLE dates
FROM "Cards" and -#index
GROUP BY file.folder

```

``` dataview
TABLE tags FROM "Cards" and -#x/index and -"People" and -#x/readme
SORT file.name ASC

```
