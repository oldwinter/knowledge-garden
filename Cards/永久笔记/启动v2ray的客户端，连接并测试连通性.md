---
date created: 2022-06-09
date modified: 2023-03-14
title: 启动v2ray的客户端，连接并测试连通性
---

mac 上以 [[V2rayU]] 为例：

和 [[启动v2ray的服务端的docker镜像]] 里的配置对应。

重点在 streamSettings和vnext 里面的配置。

- streamSettings配置流量类型，如tcp还是websocket
- vnext主要配置服务端的地址等信息，进行连接

```
{
  "log": {
    "error": "",
    "loglevel": "warning",
    "access": ""
  },
  "inbounds": [
    {
      "listen": "127.0.0.1",
      "protocol": "socks",
      "settings": {
        "udp": false,
        "auth": "noauth"
      },
      "port": "1080"
    },
    {
      "listen": "127.0.0.1",
      "protocol": "http",
      "settings": {
        "timeout": 360
      },
      "port": "1087"
    }
  ],
  "outbounds": [
    {
      "mux": {
        "enabled": false,
        "concurrency": 8
      },
      "protocol": "vmess",
      "streamSettings": {
        "network": "ws",
        "wsSettings": {
          "path": "",
          "headers": {
            "host": "vpn.oldwinter.top"
          }
        },
        "security": "none"
      },
      "tag": "proxy",
      "settings": {
        "vnext": [
          {
            "address": "20.222.33.43",
            "users": [
              {
                "id": "b831381d-6324-4d53-ad4f-8cda48b30822",
                "alterId": 0,
                "level": 0,
                "security": "auto"
              }
            ],
            "port": 443
          }
        ]
      }
    },
    {
      "tag": "direct",
      "protocol": "freedom",
      "settings": {
        "domainStrategy": "UseIP",
        "userLevel": 0
      }
    },
    {
      "tag": "block",
      "protocol": "blackhole",
      "settings": {
        "response": {
          "type": "none"
        }
      }
    }
  ],
  "dns": {},
  "routing": {
    "settings": {
      "domainStrategy": "AsIs",
      "rules": []
    }
  },
  "transport": {}
}
```
