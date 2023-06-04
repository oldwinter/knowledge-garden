---
title: OpenAI - chatGPT -超强AI聊天机器人注册使用
date created: 2022-12-06
date modified: 2023-03-14
---

[[chatGPT的使用经验]]

手把手视频：[1块钱注册火爆全网的ChatGPT机器人-帮你发邮件写代码_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1GW4y1g7sV/?spm_id_from=444.41.list.card_archive.click&vd_source=c16ee9cfb2023d2af8428dbfe604b72f)

[https://chat.openai.com/auth/login](https://chat.openai.com/chat)

[[2023-02-11]]更新：openai用的人太多，升级了验证策略，在验证手机号码之前，会看是否属于可用国家或地区，中国显然不在。因此需要先翻墙，但翻墙后，又会报access reject错误，所以需要将地区改成美国，方法如[OpenAI‘s services are not available in your country 完美解决方案 - 腾讯云开发者社区-腾讯云 (tencent.com)](https://cloud.tencent.com/developer/article/2190198)

核心就是，浏览器地址栏输入后回车，注意前面的JavaScript字符要手动输入：

```
javascript:window.localStorage.removeItem(Object.keys(window.localStorage).find(i=>i.startsWith('@@auth0spajs')))
```

网站注册需要绑定手机号，且不支持大陆、香港和台湾的手机号码。找了网上免费的验证码接收网站，试了好几个都不行，要么是虚拟号，要么已经被别人注册过了。看到别人推荐[在线接受短信的虚拟号码 - SMS-Activate](https://sms-activate.org/cn)，一个印度号码只需要1.2元RMB左右，而且可以支付宝支付，成功绑定。

![](https://img.oldwinter.top/20221206203232.png)

![](https://img.oldwinter.top/20221206203202.png)

chat网址后面还可能面临问题，就是如果不翻墙，会显式：OpenAI's services are not available in your country. (error=unsupported_country)。而翻墙，像我用的是日本的vpn，则显式：access denied。所以如果换成一个美国的vpn，估计就ok了。  
像我早期注册的，就没有这个问题，我不翻墙就能正常使用。

登上节点后，执行下面，可以判定ip是否已经被openai封禁了。

```shell
bash <(curl -Ls https://cpp.li/openai)
```

了解到，有一项[[cloudflare warp]]技术，可以让节点被[[cloudflare]]识别为可靠优质节点，也能通过openai检测。

- 用这个封装好的warp docker:[Neilpang/wgcf-docker: CloudFlare warp in docker (github.com)](https://github.com/Neilpang/wgcf-docker)

```

sudo docker run --rm  -it \
    -d \
    -p 443:443 \
    --name wgcf \
    --sysctl net.ipv6.conf.all.disable_ipv6=0 \
    --privileged --cap-add net_admin \
    -v /lib/modules:/lib/modules \
    -v $(pwd)/wgcf:/wgcf \
    neilpang/wgcf-docker

```

要多加一行-p 443:443，然后原来的v2ray容器要去掉这一部分，并加上，让其走这个wgcf-docker网络。

```
sudo docker run -d --restart=always -v /home/ubuntu/v2ray-config/config.json:/etc/v2ray/config.json --network container:wgcf       v2fly/v2fly-core run -c /etc/v2ray/config.json
```

大功告成~chatgpt不再有access denied了，并且走warp以后，各种网站访问速度也快了好多，原理待探索。

但是目前这个方案，不支持机器重启后自动开通，需要重新手动运行上面2条命令，第一条命令不允许加 --restart 参数，后面再看怎么解决。