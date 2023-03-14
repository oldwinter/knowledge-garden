---
date created: 2022-08-21
date modified: 2023-03-14
title: quartz
---

注意点:  
要使用vercel或github pages或cloudflare pages，不能用netlify，因为netlify会自动将url小写，带来bug。

核心2个点，命令参考dg3仓库的deploy. yaml文件：

- frontmatter需要有title，且value值加双引号。我用linter实现自动生成title，但其不支持自动加双引号，目前我是自己用sed命令加上双引号，linter作者说下个版本将支持title的value也加双引号。
- 目前已支持[[wikilink]]，但依旧需要指定绝对引用路径，而我更习惯最短路径的引用方式，所以在构建时，我用mv命令将md文件批量移动至根目录，从而减少改文件链接的麻烦。
