坑：
- 容器启动后，其提供的cdn访问地址是不支持ws协议的。
	- 所以需要另辟蹊径，使用[[cloudflare argo]]。
- 每次重启后，地址会变，需要重新扫码导入配置
	- 所以尽量不要重启。



[oldwinter/argo-proxy (github.com)](https://github.com/oldwinter/argo-proxy)

部署后，延时1000ms，速度算快了，看youtube流畅不卡。