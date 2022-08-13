---
cssclass: sidebarDataview
date created: 2022-08-04
date modified: 2022-08-13
tags: MOC, todo/持续迭代
---

## Spaces

%%非固定文件夹，随着聚焦的项目和领域的变动而变动，所以用dataview来动态索引%%

```dataviewjs
// 获取指定文件夹下的指定标签的文件
const filter = '"Spaces" and #MOC'
// 通过文件夹分组，检索文件夹下全部文件的标签、修改时间等相关信息
const groups =  dv.pages(`${filter}`).groupBy(p => p.file.folder)
for (let group of groups) {
	dv.header(4, group.key);
	dv.table(["Name"],
		group.rows
			.sort(k => k.file.name, 'asc')
			.map(k => [k.file.link]))
}
```
