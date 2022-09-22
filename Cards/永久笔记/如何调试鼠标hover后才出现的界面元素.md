---
sr-due: 2022-09-17
sr-interval: 27
sr-ease: 290
date created: 2022-07-25
date modified: 2022-08-20
tags: 复习回顾
title: 如何调试鼠标hover后才出现的界面元素
---

[如何调试CSS Hover事件 - 董川民](https://www.dongchuanmin.com/xhtml/1642.html)

由于鼠标移上去，界面才浮现出来，所以需要想办法将其定住。技巧就是利用js的单线程执行模型，在hover的时候，进入js断点，界面就能固定不动，从而可以调试了。

在console输入

```JavaScript
setTimeout(() => {debugger;}, 3000)
```
