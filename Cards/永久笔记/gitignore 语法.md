---
date created: 2022-08-15
date modified: 2023-03-14
title: gitignore 语法
---

我的常用：  
忽略目录下全部文件：`/dir/**`

## ignore规则不生效

在项目开发过程中个，一般都会添加 .gitignore 文件，规则很简单，但有时会发现，规则不生效。  
原因是 .gitignore 只能忽略那些原来没有被track的文件，如果某些文件已经被纳入了版本管理中，则修改.gitignore是无效的。  
那么解决方法就是先把本地缓存删除（改变成未track状态），然后再提交。

```
git rm -r --cached .

git add .

git commit -m 'update .gitignore'
```
