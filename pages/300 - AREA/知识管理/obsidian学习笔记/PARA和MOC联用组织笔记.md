## PARA

para不恰当的映射，中短期粒度而言：

- project
	- 紧急不重要
- area
	- 紧急重要
- resource
	- 不紧急重要
- archive
	- 不重要不紧急

## MOC

map of contents

## 其他笔记分类组织法

- [[杜威十进制分类法]]
- 文件夹+标签

## 为啥我要选 PARA + MOC 的方式

- 足够轻量，适合懒人
	- 我自己历年工作，也基本从来不整理文件、文件夹、书签这些
- 搜索 + 双链 找到一切
	- 如果还找不到，那就是彻底忘却了，或者睡眠不足，重新google后，放进来吧。做笔记的时候，多多双链，也能帮我把笔记连接起来，只要连接起来，就不容易被忘却。
- PARA相当于用很少的时间，做全局性的整理，笔记这东西，大致有个布局就够了。而且这4类笔记，可以根据新状态，新想法，随时轮转，轮转过程可以借鉴已有MOCs。我尽量只借用他的对我有价值的那部分方法论：
	- para，时间上看，从前往后，先有可执行的project，然后project需要运用到多个area的知识，倒逼我精通某些领域。或者是多个project可能都属于同一area的内容。当area逐渐成熟，它就变成了我的resource。以年为单位，很多东西都是要逐步archive的，也能解放当下的自己。archive不意味着放弃，还是能经常被搜索和连接的，只是大概不是近1，2年需要聚焦的目标了。anki回顾的高频领域应该是在area中。
- MOC相当于不费吹灰之力，做局部性的整理，聚合局部知识，相当于知识容器化，场景化，添加上下文context，用最小的时间代价，去做整理和规划。moc分落在para的各个文件夹里，起到聚合局部知识的作用，也能做为搜索和思考的线索。moc可以嵌套moc，最底层是原子化卡片。[[高内聚，低耦合]]


## 记笔记原则

- [[自上而下]]
	- 文件夹：极限3层，定期轻微整理，满足局部模块知识的高内聚即可
	- 标签：极限30个，用来表达状态或来源
- [[自下而上]]
	- 链接一切：以

## 方法和指导思想

- [[PARA和MOC联用组织笔记]]
- [[双链笔记]]，[[万物互联]]
- [[学习目标的分级]]

[[CONTENTS]]文件是logseq内置的目录。与indexl这种自动化的dataview区分开，contents进行手动的结构化的汇编。

相当于如果把这个库出一本书或者wiki，那么这里就是目录。但又不必完全索引库里面的全部内容，渐进式地搞就行。

## 进行中 - Project

- 不要强求自己去写东西，一定是项目驱动，兴趣驱动的方式去写。
- 不用在意写的完整性，挖坑不填即可。只给自己看。确实需要分享的时候，再去完善即可。
- 倒是需要考虑，如何用[[obsidian]]写那种给别人看的长文，引用卡片还是直接复制,目前看logseq的块引用很有用，但现在太卡了，而且块引用的语法也不兼容 ^d67e1d
- 项目和[[滴答清单]]配合使用。

```dataview
table tags
from "pages/200 - PROJECT"
where contains(file.tags,"MOC")
sort tags desc
limit 1000
```

## 短中期精进 - Area

知识管理

```dataview
table tags
from "pages/300 - AREA"
where contains(file.tags,"MOC")
sort tags desc
limit 1000
```

## 原子化 - Resource

```dataview
table tags
from "pages/400 - RESOURCE"
where contains(file.tags,"MOC")
sort tags desc
limit 1000
```

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
