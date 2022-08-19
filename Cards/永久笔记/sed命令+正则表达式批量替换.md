---
date created: 2022-08-20
date modified: 2022-08-20
title: sed命令+正则表达式批量替换
---

[macOS grep + sed 批量替换多个文件的内容 - Dvel's Blog](https://dvel.me/posts/macos-replace-contents-multiple-files/)  

`grep -lr --null 'title' * | xargs -0 sed -i -r 's/title: (.*)/title: \"\1\"/g'`
