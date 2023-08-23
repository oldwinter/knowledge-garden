---
date created: 2022-06-09
date modified: 2023-03-14
title: markdown与html和css联用
---

markdown 的理念和 [[json与yaml]] 类似。yaml 之所以有存在价值，也在于其阅读和编辑起来更方便。markdown 相比于 html，用更少的标记符号就能实现同样的效果，对内容的侵入性低，进一步降低输入摩擦力。

HTML 的全称是 hypertext markup language，注意里面的 markup，刚好和 markdown 相反。所以 Markdown 的意思应该是反标记，因为 markup 是标记。markup 是内容以上的处理，关注形式，样式，格式等等；而 markdown 关注内容。所以，他的主要用户也是作者，编辑和文档撰写者。

## 利用 html 标签扩充 markdown 排版功能

总有 5% 的场景，markdown 的现有语法，满足不了排版需求。比如多列显示，比如文本居中，比如彩色字体。此时需要引入 html 标签，一般网上支持 markdown 的编辑器，都天然支持这些语法。markdown 有的语法，优先使用 markdown 语法。

一些常用的补充 markdown 不足的语法：

```html
居中：
<center>诶嘿</center>

左对齐：
<p align="left">诶嘿</p>

右对齐：
<p align="right">诶嘿</p>

上标和下标：
<sup>X2</sup>
<sub>H2O</sub>

通过#，点击链接，页面内跳转到对应位置：
<p id="name"></p>	被链接	
hello world

<a href="#name" target="_blank" rel="external nofollow" ></a>	超链接	hello world
```

## 当 html 标签也无法满足，则需要引入 css

尽量不要走到这一步，丧失了使用 markdown 的初心。

> 此外，单独拎出来的 style 标签，obsidian 的阅读模式不支持，所以直接将样式写在 style 里面，或者在 [[frontmatter]] 里面用 cssclass 标签引入自定义 css 样式

我们来测试以下内联样式吧：（去掉代码块前后缀，并切换到阅读模式而非源码模式）

```
<div style="color: red; font-size: 1.5em;">
世界的奇妙程度远远超越我们的想象，爱因斯坦的理论为我们解开了探索宇宙的新篇章。
<div/>
```
