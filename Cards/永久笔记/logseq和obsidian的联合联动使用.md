---
date created: 2022-06-09
date modified: 2023-03-14
title: logseq和obsidian的联合联动使用
---

obsidian 的发布功能还没试过，但看了别人的发布效果，感觉也一般。

但 logseq 的发布效果还算不错。所以考虑联合使用 obsidian 和 logseq，并且网上已经有成熟的发布方案。

相比于 [[用语雀建设数字花园]]和[[用notion建设数字花园]]，logseq的花园很粗糙，别人可能看起来没有美的感受，但像[[andy的网络博客]] 一样，也不妨发布出来，让大家感受一下双链笔记的魅力。

## 存在的一些问题和解决方案

- logseq 自动生成的 bak 文件夹，会被 obsidian 扫描，里面大量无用信息。现在 logseq 也不给配置这个 bak 文件夹的生成规则。
	- 先通过[[Keyboard Maestro]]定时删除 log 文件夹，作为临时规避方案。
- 清单语法互相不兼容
	- obsidian 的清单语法，是原生的 markdown 语法，logseq 由于其大纲类型，和清单冲突，所以自己扩展了语法。
		- 先暂时只使用 ob 的语法，考虑到兼容性。logseq 就只看看就行。
- 块引用语法互相不兼容
	- obsidian 的块引用语法暂时有点鸡肋。但 logseq 的块引用性能有点差，现在就已经很卡了。
		- 暂时先不用块引用，尽量原子化卡片 page，只使用页引用。等 logseq 性能好起来了再说。
- 闪卡 flashcard 的不兼容
	- 2 者都不成熟，相比之下还是[[Spaced Repetition]]更成熟一些
		- 先用 obsidian
