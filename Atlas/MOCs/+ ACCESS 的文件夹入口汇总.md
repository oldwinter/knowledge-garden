---
date created: 2022-08-04
date modified: 2022-08-05
tags: MOC, todo/持续迭代
---

up:: [[ACCESS 笔记组织法]]

x:: [[+ ACCESS 的工作流汇总]]

>使用原则：应能通过下面的链接，点击进入某文件，直接在该文件下进行相关新的资源文件的创建，这样可以最大程度确保不创建出孤立的文件，使得笔记间产生至少1次链接。

- [[混合笔记法]]
- Calendar
	- dailynote first，基于每日日志
	- 降低输入摩擦，提供基于日期回顾的线索
- Cards
	- content first，基于内容本身
	- link first，尽可能多建立连接
	- 如何组织与整理？
		- 自然降级，长时间不打开的卡片，就是无用卡片。随它而去即可。
		- 自然生长，高频打开的卡片，尽可能和其他页面多建立连接。必要时新建MOC进行聚合。
- Sources：
	- material first，基于学习材料的载体形式
	- topic first，基于话题和主题
	- architect first，结构优先，尊重原材料的结构。
	- 提供基于材料回顾的线索。和Spaces冲突或重合时，优先放此处
- spaces
	- action first，基于行动和目标
	- folder first，文件夹优先，做为工作台，指导行动和目标。
	- 提供基于项目和行动回顾的线索。

## Atlas

- [[MOCs]]
- [[TOCs]]

## Calendar

- [obsidian 每日笔记](obsidian://advanced-uri?daily=true&mode=append)
- #todo/今天 #todo/本周
- [Anki 回顾笔记](obsidian://advanced-uri?vault=knowledge-garden&commandid=obsidian-spaced-repetition%253Asrs-note-review-open-note)

## Cards

在回顾[[dailynote]]的过程中，将卡片批量拖动进来即可。

## Extras

- 将外部引用的pdf等源文件放到obsidian库里面，的确也可以实现双向链接的效果，但是会让库的体积急剧膨胀，不利于打包发给别人。不过还是先尝试放进来看看，后期再考虑调整。
- [[+ 模板文件创建入口]]
- [[+ excalidraw 白板创建入口]]
- [billfish图片和视频管理](billfish://)

## Sources

%%固定文件夹，非增长式，所以不用dataview%%

- [[+ 文章笔记]]
- [[+ 读书笔记]]
- [[+ 课程笔记]]
- [[+ 电影笔记]]
- [[+ 电视剧笔记]]
- [[+ 论文笔记]]
- [[+ 播客笔记]]
- [[+ 视频笔记]]

## Spaces

Spaces下全部PARA内的MOC文件

%%非固定文件夹，随着聚焦的项目和领域的变动而变动，所以用dataview来动态索引%%

```dataviewjs
// 获取指定文件夹下的指定标签的文件
const filter = '"Spaces" and #MOC'
// 通过文件夹分组，检索文件夹下全部文件的标签、修改时间等相关信息
const groups =  dv.pages(`${filter}`).groupBy(p => p.file.folder)
for (let group of groups) {
	dv.header(4, group.key);
	dv.table(["Name", "创建日期", "修改日期"],
		group.rows
			.sort(k => k.file.name, 'asc')
			.map(k => [k.file.link, k.file.cday, k.file.mday]))
}
```
