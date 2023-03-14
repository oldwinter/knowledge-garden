---
title: Access Denied - 1020
date created: 2023-02-18
date modified: 2023-03-14
---

这次[[chatGPT]]的申请，就用上了这招，大部分ip，都被1020错误码拦截了。在很多网站，也能经常看到1020的界面提示。

其实原理是使用了[[cloudflare]]的服务，cloudflare可以让开发者设定自己的网站不被哪一些或者说哪一类IP访问。

破解之道就是用[[cloudflare warp]]，相当于让自己的流量走cloudflare过，将自己的IP加入白名单。
