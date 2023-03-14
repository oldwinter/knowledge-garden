---
date created: 2022-06-22
date modified: 2023-03-14
tags:
  - dataview
title: Index for Sources
---

up:: [[ACCESS 笔记组织法]]

```dataviewjs
// 获取当前文件所在的文件夹
const currentFolder = dv.current().file.folder
// 通过文件夹分组，检索文件夹下全部文件的标签、修改时间等相关信息
const groups =  dv.pages(`"${currentFolder}"`).groupBy(p => p.file.folder)
for (let group of groups) {
	dv.header(4, group.key);
	dv.table(["Name","标签","入链", "创建日期", "修改日期"],
		group.rows
			.sort(k => k.file.name, 'asc')
			.map(k => [k.file.link,k.file.tags,k.file.inlinks, k.file.cday, k.file.mday]))
}
```
