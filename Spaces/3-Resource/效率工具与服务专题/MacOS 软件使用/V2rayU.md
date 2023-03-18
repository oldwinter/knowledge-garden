---
tags:
  - macOS软件
作用: 翻墙 主力
评价: 5
设置同步: 手动
是否已备份: y
是否已重装:
title: V2rayU
date created: 2023-02-28
date modified: 2023-03-14
---

账号网址：

1 年 200 元 100MB 带宽不限流量。2 年 360.

[SecureService -登录](https://vpnsoso.com/account/)

当前这个服务商的有些域名服务器，比如美国和英国的，必须得用这个旧版本：v2.3.1

我的 pac 文件备份

```
! Put user rules line by line in this file.
! See https://adblockplus.org/en/filter-cheatsheet
||yt1s.com
||githubusercontent.com
||mcr.microsoft.com
||1drv.ms
|https://istio.io
||msauth.net
|https://tampermonkey
204.79.197.219

! ### MacWk.com Start

! BetterTouchTool
@@||folivora.ai
@@||www.folivora.ai
@@||updates.boastr.net
@@||updates.folivora.ai

! Keyboard Maestro
@@||www.keyboardmaestro.com

! ### MacWk.com End
```

使用 geoip 和 geosite，格式和手机客户端不一样，需要去掉逗号，每个地址用空行分割。这2个文件，和routing配置相关。

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

客户端配置 example，即config.json文件：

```json
{
  "log": {
    "error": "",
    "loglevel": "info",
    "access": ""
  },
  "inbounds": [
    {
      "sniffing": {
        "enabled": true,
        "destOverride": [
          "tls",
          "http"
        ]
      },
      "listen": "127.0.0.1",
      "protocol": "socks",
      "settings": {
        "udp": true,
        "auth": "noauth"
      },
      "port": "1080"
    },
    {
      "sniffing": {
        "enabled": true,
        "destOverride": [
          "tls",
          "http"
        ]
      },
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
        "enabled": true,
        "concurrency": 8
      },
      "protocol": "vmess",
      "streamSettings": {
        "network": "ws",
        "wsSettings": {
          "path": "",
          "headers": {
            "host": ""
          }
        },
        "security": "none"
      },
      "tag": "proxy",
      "settings": {
        "vnext": [
          {
            "address": "35.77.211.36",
            "users": [
              {
                "id": "b831381d-6324-4d53-ad4f-8cda48b30823",
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
      "domainStrategy": "IPIfNonMatch",
      "rules": [
        {
          "type": "field",
          "outboundTag": "proxy",
          "domain": [
            "geosite:google",
            "geosite:github",
            "geosite:netflix",
            "geosite:steam",
            "geosite:telegram",
            "geosite:tumblr",
            "geosite:speedtest",
            "geosite:bbc",
            "geosite:tiktok",
            "geosite:gfw",
            "geosite:greatfire"
          ]
        },
        {
          "type": "field",
          "ip": [
            "geoip:us",
            "geoip:ca",
            "geoip:telegram"
          ],
          "outboundTag": "proxy"
        },
        {
          "type": "field",
          "outboundTag": "direct",
          "domain": [
            "geosite:cn",
            "geosite:private",
            "geosite:apple-cn",
            "geosite:google-cn",
            "geosite:tld-cn",
            "geosite:category-games@cn",
            "localhost",
            "geosite:cn"
          ]
        },
        {
          "type": "field",
          "ip": [
            "geoip:cn",
            "geoip:private"
          ],
          "outboundTag": "direct"
        },
        {
          "type": "field",
          "outboundTag": "block",
          "domain": [
            "geosite:category-ads-all"
          ]
        }
      ]
    }
  },
  "transport": {}
}
```

## 代理模式

- 全局代理
	- 有别于 vpn,只是将代理信息更新到系统代理 http,https,socks,若需要真正全局模式, 推荐搭配使用 Proxifier。
	- [[routing模式和配置]]
	- geoip.dat 和 geosite.dat 作为基础配置文件，可供 routing 列表用一行话就能快速调用。其加强版[GitHub - Loyalsoldier/v2ray-rules-dat: 🦄 🎃 👻 V2Ray 路由规则文件加强版，可代替 V2Ray 官方 geoip.dat 和 geosite.dat，兼容 Shadowsocks-windows、Xray-core、Trojan-Go 和 leaf。Enhanced edition of V2Ray rules dat files, compatible with Xray-core, Shadowsocks-windows, Trojan-Go and leaf.](https://github.com/Loyalsoldier/v2ray-rules-dat)
- pac 代理
	- [[pac模式和配置]]
	- 目前越来越多的 app，都推荐用全局代理的 routing 模式，甚至直接删了 pac 模式，课件其应该没有 routing 好用，只要 routing 列表更新地更合理，比[[GFW list]]更可靠的话。
- 手动代理
	- 不配置系统级代理。可以自行使用浏览器插件或其他软件配置需要的代理模式。浏览器推荐搭配使用 Proxy SwitchyOmega。
	- 但是这个模式个人使用几乎没有用处和场景。

## DNS 配置

不配置也可，基本主流网站不会被服务商 dns 污染。但配上以后，会更顺畅。

```
{
  "hosts": {
    "dns.google": "8.8.8.8",
    "dns.pub": "119.29.29.29",
    "dns.alidns.com": "223.5.5.5",
    "geosite:category-ads-all": "127.0.0.1"
  },
  "servers": [
    {
      "address": "https://1.1.1.1/dns-query",
      "domains": ["geosite:geolocation-!cn"],
      "expectIPs": ["geoip:!cn"]
    },
    "8.8.8.8",
    {
      "address": "114.114.114.114",
      "port": 53,
      "domains": ["geosite:cn", "geosite:category-games@cn"],
      "expectIPs": ["geoip:cn"],
      "skipFallback": true
    },
    {
      "address": "localhost",
      "skipFallback": true
    }
  ]
}
```
