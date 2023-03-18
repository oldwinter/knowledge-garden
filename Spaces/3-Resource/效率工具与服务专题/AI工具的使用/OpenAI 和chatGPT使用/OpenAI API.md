---
title: OpenAI API
date created: 2023-02-28
date modified: 2023-03-14
---

若要达成连续对话，则需要每次将之前的全部内容，包括我们的问题和他的回答，都添加进去。因此，随着对话次数的增多，每次对话的token耗费成本都是递增的。

payload示例：  
![image.png](https://img.oldwinter.top/202303041954451.png)

目前看到使用了[[vercel edge function]]的话，响应速度极快，基本1秒内就能拿到结果。
