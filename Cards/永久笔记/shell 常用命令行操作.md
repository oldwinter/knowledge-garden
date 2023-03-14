---
date created: 2022-06-22
date modified: 2023-03-14
title: shell 常用命令行操作
---

遍历文件夹，复制/移动文件至根目录

```
# mac生效，linux下只能生效第一层
cp  knowledge-garden/**/**.md tmo/

# 用这个新方法。
find content/ -name "*.md" | xargs -I file  mv file content
```
