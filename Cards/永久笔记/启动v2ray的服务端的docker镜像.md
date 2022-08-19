---
date created: 2022-06-09
date modified: 2022-08-20
title: 启动v2ray的服务端的docker镜像
---

```bash

```

[Site Unreachable](https://www.v2ray.com/chapter_00/start.html)

- 远端 server 的本地新建 config.json 文件，并配置如下

```json
{
  "inbounds": [{
    "port": 8899, // 服务器监听端口，必须和上面的一样
    "protocol": "vmess",
    "settings": {
      "clients": [{ "id": "b831381d-6324-4d53-ad4f-8cda48b30822" }]
    }
  }],
  "outbounds": [{
    "protocol": "freedom",
    "settings": {}
  }]
}
```

- 假定 config 文件是/home/cdd/v2ray-config/config.json，执行，将服务端口设置为 8899 。

```bash
sudo docker run -d --restart=always -v /home/cdd/v2ray-config/config.json:/etc/v2ray/config.json -p 8899:8899  v2fly/v2fly-core
```

docker 内部，相关配置文件

- /etc/v2ray/config.json: 配置文件
- /usr/bin/v2ray/v2ray: V2Ray 主程序
- /usr/bin/v2ray/v2ctl: V2Ray 辅助工具
- /usr/bin/v2ray/geoip.dat: IP 数据文件
- /usr/bin/v2ray/geosite.dat: 域名数据文件
