---
date created: 2022-06-26
date modified: 2022-08-07
tags: index索引
---

```dataviewjs
let allFiles = dv.pages()

let ftMd = allFiles.file.sort(t => t.cday)[0]
let total = parseInt([new Date() - ftMd.ctime] / (60*60*24*1000))
dv.paragraph(`已使用==obsidian== ${total} 天`)

dv.paragraph(`总共有==文件== **${allFiles.length}** 个`)

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

let ankiFiles = dv.pages("#review")
let todoFiles = dv.pages("#todo")

dv.paragraph(`总共有==anki卡片== **${ankiFiles.length}** 个，==待办文件== **${todoFiles.length}** 个`)
```

#todo/某天 ： 统计还未创建出文件的正向链接有多少个。统计未与其他任何文件产生连接的文件有多少个。还未找到语法。如果需要看数据，先用[[Find orphaned files and broken links]]插件凑合。
