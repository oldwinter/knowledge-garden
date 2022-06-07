

账号网址：
1年200元100MB带宽不限流量。2年360.
[SecureService -Dashboard (link2022.com)](https://link2022.com/account/)

当前这个服务商的有些域名服务器，比如美国和英国的，必须得用这个旧版本：v2.3.1
我的 pac 文件备份

```
! Put user rules line by line in this file.
! See https://adblockplus.org/en/filter-cheatsheet
||yt1s.com
||githubusercontent.com
||mcr.microsoft.com
||madou.club
||1drv.ms
|https://istio.io
||msauth.net
|https://tampermonkey
204.79.197.219
```

使用 geoip 和 geosite，格式和手机客户端不一样，需要去掉逗号，每个地址用空行分割

## 备份配置文件夹

```
USER="cdd"
sudo cp -r ~/.V2rayU/ /Users/$USER/Documents/软件配置云同步/v2rayU/bak
sudo cp -r ~/Library/LaunchAgents/yanue.v2rayu.v2ray-core.plist /Users/$USER/Documents/软件配置云同步/v2rayU
sudo cp -r ~/Library/Preferences/net.yanue.V2rayU.plist /Users/$USER/Documents/软件配置云同步/v2rayU
```

## 自建服务器

服务端配置 example：

```
{
  "log" : {
    "access": "/var/log/v2ray/access.log",
    "error": "/var/log/v2ray/error.log",
    "loglevel": "warning"
  },
  "inbounds": [{
    "port": 8899,
    "protocol": "vmess",
    "settings": {
      "clients": [
        {
          "id": "60ca58e9-003e-4c01-98de-c2223ae49153",
          "level": 1,
          "alterId": 64
        }
      ]
    }
  }],
  "outbounds": [{
    "protocol": "freedom",
    "settings": {}
  }]
}
```

客户端配置 example：

```
{
  "log": {
    "error": "",
    "loglevel": "info",
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
        "network": "tcp",
        "tcpSettings": {
          "header": {
            "type": "none"
          }
        },
        "security": "none"
      },
      "tag": "proxy",
      "settings": {
        "vnext": [
          {
            "address": "vpn.oldwinter.top",
            "users": [
              {
                "id": "60ca58e9-003e-4c01-98de-c2223ae49153",
                "alterId": 64,
                "level": 1,
                "security": "none"
              }
            ],
            "port": 8899
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
