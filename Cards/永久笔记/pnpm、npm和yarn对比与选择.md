---
date created: 2022-08-16
date modified: 2023-03-14
title: pnpm、npm和yarn对比与选择
---

[聊聊前端包管理器对比Npm、Yarn和Pnpm-51CTO.COM](https://www.51cto.com/article/702067.html)  
[为什么现在我更推荐 pnpm 而不是 npm/yarn? - 苍青浪 - 博客园](https://www.cnblogs.com/cangqinglang/p/14448329.html)

结论：

- pnpm的文件管理方式更科学，用软链接的方式解决了npm包管理的循环嵌套依赖导致的node_modules目录的文件大量重复和文件层级嵌套过深的问题。
- 如果是旧项目，也许会有些不兼容，得使用npm/yarn

[[npm]]
