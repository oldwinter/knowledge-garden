---
date created: 2022-08-22
date modified: 2023-03-14
tags:
  - 复习回顾
title: sed命令+正则表达式批量替换
sr-due: 2022-09-27
sr-interval: 29
sr-ease: 290
---

[macOS grep + sed 批量替换多个文件的内容 - Dvel's Blog](https://dvel.me/posts/macos-replace-contents-multiple-files/)  

`grep -lr --null 'title'*| xargs -0 sed -i -r 's/title: (.*)/title: \"\1\"/g'`

## mac上的sed命令有坑，和linux不完全一样，需要注意

### `sed: 1: "1.txt": invalid command code .`错误

解决方案：-i后面加一个备份文件后缀名。

```bash
sed -i "_bak" 's/string_old/string_new/g' grep -rl 'string_old' ./
```

### `extra characters after \ at the end of a command`

mac中的回车等不一样，需要文本上直接回车，例如第一行的`\`后面需要一个物理回车。

```
sed -i ".bak" '1a\
tags: review 
' {{file_path:absolute}}
```

或者替换成linux的sed命令。

```
brew install gnu-sed
alias sed=gsed
```
