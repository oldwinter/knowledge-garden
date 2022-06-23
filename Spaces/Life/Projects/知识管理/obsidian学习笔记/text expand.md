---
feed: show
content-type: notes
date: 2022-06-23
title: text expand
date created: 2022-06-09
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
^|Filename|Content|
^|---|---|
|[[$filename]]|$size|
>⬆⬆⬆
```
⬇⬇⬇
|Filename|Content|
|---|---|
|[[2022-06-23]]|1128|
|[[+ About Calendar]]|526|
|[[快速启动一个简易的静态httpserver]]|162|
|[[2022-三月]]|2807|
|[[2022-06-21]]|1107|
|[[2022-06-01]]|210|
|[[2022-06-02]]|259|
|[[2022-06-03]]|273|
|[[2022-06-04]]|666|
|[[2022-06-05]]|579|
|[[2022-06-06]]|765|
|[[2022-06-07]]|249|
|[[2022-06-08]]|196|
|[[2022-06-09]]|236|
⬆⬆⬆
<-->
