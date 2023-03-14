---
date created: 2022-06-09
date modified: 2023-03-14
title: 自己部署一个v2ray服务
---
- 买一个区域位于海外的 server，预装 linux
	- [[如何购买一台海外的服务器]]
	- 重要！进入 server 的网络配置，或者是安全组配置，或是防火墙配置，将 8899 端口打开。
- ssh 登录，执行后续
- [[安装docker服务]]
- [[启动v2ray的服务端的docker镜像]]
- [[启动v2ray的客户端，连接并测试连通性]]
- 可选
	- [[配置PAC - GFW list]]
	- [[配置Routing - 路由模式]]
		- [[替换v2ray官方的路由规则文件geoip.dat和geosite.dat]]
