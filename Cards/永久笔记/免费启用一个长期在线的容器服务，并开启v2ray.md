---
title: 免费启用一个长期在线的容器服务，并开启v2ray
date created: 2023-03-12
date modified: 2023-03-27
---

另一个白嫖的服务： https://replit.com/

[[2023-03-29]]：新增[[back4app]]

号称永久在线、永久免费。

[Doprax搭建免费的v2ray - 梅塔沃克 - 专注跨境](https://iweec.com/705.html)

踩到一个坑，就是给的域名，可能国内dns不通，所以需要直接换成ip，填在客户端配置里。

是德国的ip，ping延时大概500ms，部署完后发现速度很拉胯，100kb每秒。

开始尝试利用[[cloudflare pages]]服务，进行反向代理。

尝试后发现还是直接使用[[Cloudflare Worker]]即可，将vpn2.oldwinter.top的请求全部转发至上面那个被jin的域名，然后客户端的地址记得也改成vpn2.oldwinter.top

客户端配置：  
![[Pasted image 20230312131834.png]]
