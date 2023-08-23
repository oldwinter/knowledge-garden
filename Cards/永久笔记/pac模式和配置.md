---
date created: 2022-06-15
date modified: 2023-03-14
title: pac模式和配置
---

PAC 全称 Proxy Auto Config，通常是一种代理脚本，包含一个 Javascript 形式的函数“FindProxyForURL(url,host)”，并用这个函数得到代理规则，然后用户利用这些代理规则设置代理服务器，进行可控制的代理访问，正如大多数梯子用 PAC 可以不经代理访问国内网站一样的设置。

pac 其实就是黑名单，告诉软件针对哪些域名和 ip 进行代理。灵活性强，有人整理好了 [[GFW list]]，可以直接使用。如果使用过程中，发现有些地址没有达到自己需要的代理状态，可以灵活自定义 pac 规则。

pac 模式如果不理想。可以改用全局模式 +[[routing模式和配置]]。
