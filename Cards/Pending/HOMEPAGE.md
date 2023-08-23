---
uid: fd5274ed-e3c2-4370-8849-a0855642e312
date created: 2022-06-09
date modified: 2023-03-14
title: HOMEPAGE
dg-publish: true
---

## 最近编辑的笔记

```dataview
table WITHOUT ID file.link AS "标题",file.mtime as "时间"
from ""
sort file.mtime desc
limit 10
```

## 七天内创建的笔记

```dataview
table file.ctime as 创建时间
from ""
where date(today) - file.ctime <=dur(7 days)
sort file.ctime desc
limit 10
```

![[∑ 本库 ACCESS 的文件夹入口汇总]]

![[本库涉及外部app调用的工作流]]

![[本库的宏观统计数据]]

>[!INFO]  
>  主页其实也是一种 [[模板与套路]]，当我大脑放空，不知道接下来需要做什么的时候，不妨打开这里，找寻一点思路。主页同时也是[[LYT 笔记框架|lyt kit]]认为的不可或缺的组成部分，和[[MOC]]组成一个导览整体。
