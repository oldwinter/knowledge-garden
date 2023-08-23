---
title: obsidian canvas当前的致命缺陷
date created: 2023-02-27
date modified: 2023-03-14
---
- canvas中引用的卡片，打开后，其反向链接面板无数据。
- canvas中嵌套引用其他canvas，打开后，其反向链接面板无数据。
- 以上，canvas中引用的md和canvas文件，甚至用全局搜索都搜不到，估计因为json格式存储，没被纳入搜索范围。但新版本1.1.15，已经能搜索canvas中的卡片了。所以看他们啥时候能解决。
- 同上，heading和block，也是搜不到的。
	- 一个意外之喜是，[[Omnisearch]]插件可以搜索到，因为它直接检索canvas文件的json元数据了。
