---
date created: 2022-08-21
date modified: 2022-08-21
title: quartz
---

要使用vercel或page不能用netlify，因为netlify会自动将url小写，带来bug。

核心2个点：
- frontmatter需要有title，且value值加双引号。
- 目前已支持[[wikilink]]，但依旧需要指定绝对引用路径，所以我将md文件批量移动至根目录，减少改文件链接的麻烦。
