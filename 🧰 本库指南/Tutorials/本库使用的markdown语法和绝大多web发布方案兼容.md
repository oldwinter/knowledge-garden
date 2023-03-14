---
dg-publish: true
date created: 2022-08-24
date modified: 2023-03-14
title: 本库使用的markdown语法和绝大多web发布方案兼容
---

[[obsidian 让我爱不释手的功能和细节]]中提到，obsidian对markdown的定制化改动是最少的，相比于其他笔记软件。所以你也许在很多地方也看到类似的结论，众多笔记软件中，obsidian用于写长文或博客是最佳的，正是这个原因。

obsidian官方的markdown语法说明书：[格式化你的笔记 - Obsidian 中文帮助 - Obsidian Publish](https://publish.obsidian.md/help-zh/%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97/%E6%A0%BC%E5%BC%8F%E5%8C%96%E4%BD%A0%E7%9A%84%E7%AC%94%E8%AE%B0)  
为了能兼容传统博客或各大支持markdown语法的平台，我对obsidian的markdown语法使用，也是非常克制。总结而言，如非必要，坚决不引入html标签或css语法做排版增强，一共只用到了这些markdown通用的纯粹语法：

- `[[]]`双链语法，目前非markdown标准
- head标题2-4级
- 高亮和加粗
- 无序列表和有序列表
- 图片和文件插入语法`[]()`
- 引用和callout语法
- 代码块
- 表格
- footnote
- 注释
