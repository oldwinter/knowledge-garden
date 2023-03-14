---
aliases:
  - frontdata
date created: 2022-06-09
date modified: 2023-03-14
title: frontmatter
---

x:: [[inline fields]], [[metadata]]

## 定义

```
---
title: tags
date: 2019-08-13 09:39:50
type: tags
layout: tag
---
```

如上，markdown文件最开头的内容。它相当于是md文件的[[metadata]]，是该文档的一种属性。

## 作用

博客，github等各种支持markdown的系统，都支持frontmatter，可以在这里设置md文件的创建日期，修改日期等更偏向于该文件的属性的内容。或者不需要用户第一时间注意到的内容。obsidian和logseq中，还可以用它进行各种数据筛选。

若文件的某些属性想显性地让用户知道，例如该md文档的父文档或子文档，或标签，或相关文档等，则可以用[[inline fields]]。在obsidian被[[Dataview]]支持，在logseq中是其默认支持的属性值。一般习惯直接将[[inline fields]]放文档最前面。
