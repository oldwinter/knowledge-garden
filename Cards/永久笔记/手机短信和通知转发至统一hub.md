---
date created: 2022-06-09
date modified: 2023-03-14
title: 手机短信和通知转发至统一hub
tags:
  - 评论/少数派
---

为了全自动化，还是有点小麻烦啊。为了不需要解锁手机看验证码，谈谈我的半自动方案。是安卓加 mac 或 win 端的。

1，安卓用一个开源项目“[[短信转发器]]”，转发短信，来电或应用推送消息至 telegram bot

2，任意端查看 telegram bot 的信息，复制验证码即可。

其中转发内容，转发模板，以及转发至 bot 后续，都有进一步定制空间。

#评论/少数派

例如转发至 [[telegram bot]]

短信转发器：[文档预览 - Gitee.com](https://gitee.com/pp/SmsForwarder/wikis/pages?sort_id=4863779&doc_id=1821427)

但是有个场景就是获取验证码然后联网。。这就尬住了。我电脑还没网络，登陆不了 telegram，此时还是需要先用手机查看验证码。。
