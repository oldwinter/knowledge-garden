---
title: 目前v2ray支持的传输协议
date created: 2023-01-06
date modified: 2023-03-14
---

[[VMess]]、Vless、[[Trojan]]、Socks和[[Shadowsocks]]协议，都算应用层，他们基于的传输层协议，主要有以下几种

- tcp，默认
- kcp，或叫mKCP
- ws，websocket
- h2，http2
- quic
- grpc

以上不同传输协议，支持不同的伪装类型（就是将请求赋予特定的请求头和返回头，让流量看起来像一个正常的服务或应用），比如

- tcp支持http伪装
- kcp支持微信视频协议伪装等
