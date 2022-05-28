## 记笔记原则

- [[自上而下]]
	- 文件夹：极限3层，定期轻微整理，满足局部模块知识的高内聚即可
	- 标签：极限30个，用来表达状态或来源
- [[自下而上]]
	- 链接一切：以
---

## 方法和指导思想

- [[PARA和MOC法分类笔记]]
- [[双链笔记]]，[[万物互联]]
---

## 进行中 - Project

- 不要强求自己去写东西，一定是项目驱动，兴趣驱动的方式去写。
- 不用在意写的完整性，挖坑不填即可。只给自己看。确实需要分享的时候，再去完善即可。
- ==倒是需要考虑，如何用[[obsidian]]写那种给别人看的长文，引用卡片还是直接复制,目前看logseq的块引用很有用，但现在太卡了，而且块引用的语法也不兼容== ^d67e1d
- 项目和[[滴答清单]]配合使用。

```dataview
table tags
from "pages/200 - PROJECT"
where contains(file.tags,"MOC")
sort tags desc
limit 1000
```

---

## 短中期跟进 - Area

知识管理

```dataview
table tags
from "pages/300 - AREA"
where contains(file.tags,"MOC")
sort tags desc
limit 1000
```

---

## 原子化 - Resource

```dataview
table tags
from "pages/400 - RESOURCE"
where contains(file.tags,"MOC")
sort tags desc
limit 1000
```

---

## 归档 - Archive

- 按需搜索为主，别去翻它，避免陷进去
- 由于目标是往[[obsidian]]放自己的思考和输出，所以量不大，可能这一生都没有归档的必要。看后面实际情况再决定

```dataview
table tags
from "pages/500 - ARCHIVE"
where contains(file.tags,"MOC")
sort tags desc
limit 1000
```

## 未完成tasks

```dataview
task from #projects/active
```

```dataviewjs
dv.taskList(dv.pages().file.tasks.where(t => !t.completed));
```

## 已完成tasks

```dataviewjs
dv.taskList(dv.pages('"/" and -"pages/500 - ARCHIVE"').file.tasks.where(t => t.completed));
```

## 最近事项

![[最近编辑、最近创建、最近任务、回顾记忆]]

[[contents]]文件是logseq内置的目录。与indexl这种自动化的dataview区分开，contents进行手动的结构化的汇编。

相当于如果把这个库出一本书或者wiki，那么这里就是目录。但又不必完全索引库里面的全部内容，渐进式地搞就行。
