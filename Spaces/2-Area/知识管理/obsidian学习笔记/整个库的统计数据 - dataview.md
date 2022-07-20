---
date created: 2022-06-26
date modified: 2022-07-14
---

```dataviewjs
let allFiles = dv.pages()

dv.paragraph(`总共有 **${allFiles.length}** 个文件`)

dv.span(`==标签== **${allFiles.file.tags.distinct().length}** 种`)
dv.span("; ")
dv.span(`==文件夹数== **${allFiles.file.folder.distinct().length}** 个`)
dv.span("; ")
dv.span(`==文件别名== **${allFiles.file.aliases.distinct().length}** 个`)


dv.paragraph("\n")
dv.span(`==正向链接== **${allFiles.file.outlinks.length}** 个`)
dv.span("; ")
dv.span(`==反向链接== **${allFiles.file.inlinks.length}** 个`)

let mocFiles = dv.pages("#MOC")
let tocFiles = dv.pages("#TOC")

dv.paragraph(`总共有==MOC文件== **${mocFiles.length}** 个，==TOC文件== **${tocFiles.length}** 个`)


```

todo： 统计还未创建出文件的正向链接有多少个。还未找到语法。
