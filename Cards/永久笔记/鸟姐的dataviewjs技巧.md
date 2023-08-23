---
date created: 2022-08-10
date modified: 2023-03-14
title: 鸟姐的dataviewjs技巧
---

## 代码描述

1. CTRL+SHIFT+I 是你的朋友：你可以使用 console.log(x) 和 object，然后查看它的内部结构，这样你就知道如何使用它了。
2. 遍历 YAML 元数据字段：我发现这些对象很难使用，最可靠的迭代方法是`for (let key of Object.keys(x)){ }或for (let[key, val]of Object.entries(x)){ }`
3. 输出和设置数据样式：除了文档dv.list()并dv.Table没有就如何实际输出数据提供很多指导。您可以使用`dv.el()`它来创建 HTML 元素，但与从 Obsidian API 中使用相比，它非常有限，`createEl()`因为此函数可以向元素添加类和 ID 等等。dataviewjs 创建了一个容器，您可以引用它`this.container`，例如`this.container.createEl('p',{text:"Hello", cls:["hello-box"]})`插入`<p class="hello-box">Hello</p>`它允许您使用 CSS 片段来设置该元素的样式。
4. 调用其他插件：您可以在 dataviewjs 脚本中调用其他插件。例如在 dataviewjs: 中调用 Templater 用户函数：`let tpl = this.app.plugins.plugins['templater-obsidian'].templater`;后跟`let output = await tpl.current_functions_object.user.myFunction({v1:val1,v2,val2});`将允许您将值传递给外部程序进行处理，然后在 Obsidian 中显示结果。能够调用任何程序打开了很多可能性，当我第一次尝试这个并看到它正确地从我的 Python 脚本中获取结果并显示它们时，我印象深刻的是它的运行如此无缝。使用提示 #1 来帮助找到您需要的功能。
5. 手动构建表：您可以创建一个数组数组rows并将其提供给`dv.table(["Col1", "Col2", "etc"], rows.map(v => v) );`并以这种方式将您想要的任何数据放入表中。（但你已经知道这个了=P）
