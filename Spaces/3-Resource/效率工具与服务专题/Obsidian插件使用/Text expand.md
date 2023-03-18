---
date created: 2022-06-09
date modified: 2023-03-14
title: Text expand
---

## 这个插件对我真的有用吗？

[mrjackphil/obsidian-text-expand: A simple text expand plugin for Obsidian.md (github.com)](https://github.com/mrjackphil/obsidian-text-expand)

相比 dataview，

- 这个是搜索的结果保存，而 dataview 是检索 metadata
- 这个是新建代码块的表格保存，被动触发，而 dataview 是就地替换，自动刷新。
- 基于这 2 点，应该还是有些更需要静态数据的场景有用，能作为 dataview 的一个能力延伸，先保留。
	- 比如某天问题单导出

## demo

用 cmd p ,expand 命令后，才会重新刷新内容。

```expander
path:"Calendar"
^⬇⬇⬇
^ 
^|Filename|Content|
^



|---|---|
|[[$filename]]|$size|


>⬆⬆⬆
```

⬇⬇⬇

⬆⬆⬆

<-->

```expander
file:2022-0
^⬇⬇⬇
^ 
^|Filename|Content|
^|---|---|
|[[$filename]]|$size|
>⬆⬆⬆
```

⬇⬇⬇

⬆⬆⬆

<-->
