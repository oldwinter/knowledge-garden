---
tags: MOC
---

## 记笔记原则

- 文件夹：极限3层
- 标签：极限10个，用来表达状态
---

## 方法和指导思想

- [[PARA和MOC法分类笔记]]
- [[双链笔记]]，[[万物互联]]
---


## 进行中 - Project

- 不要强求自己去写东西，一定是项目驱动，兴趣驱动的方式去写。
- 不用在意写的完整性，挖坑不填即可。只给自己看。确实需要分享的时候，再去完善即可。
- ==倒是需要考虑，如何用[[obsidian]]写那种给别人看的长文，引用卡片还是直接复制,目前看logseq的块引用很有用，但现在太卡了，而且块引用的语法也不兼容==
- 项目和[[滴答清单]]配合使用。

```dataview
table tags
from "pages/200 - PROJECT"
where contains(file.tags,"MOC")
sort tags desc
limit 1000
```

---

## 长期跟进 - Area

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
- [x] 啊 
- [ ] 啊 [completion:: 2022-05-08]
```dataview
task from #projects/active
```

```dataviewjs
dv.taskList(dv.pages().file.tasks.where(t => !t.completed));
dv.taskList(dv.pages().file.tasks.where(t => t.completed));
```

