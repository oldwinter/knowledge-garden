---
aliases:
  - speedtest
date created: 2022-06-09
date modified: 2023-03-14
title: linux命令行测速 - speedtest
---

Speedtest 是一个旧宠。它用 Python 实现，并打包在 Apt 中，也可用 pip 安装。你可以将它作为命令行工具或在 Python 脚本中使用。

使用以下命令安装：

```
sudo apt install speedtest-cli
或者
sudo pip3 install speedtest-cli
```

然后使用命令 speedtest 运行它：

```
$ speedtest
Retrieving speedtest.net configuration...
Testing from CenturyLink (65.128.194.58)...
Retrieving speedtest.net server list...
Selecting best server based on ping...
Hosted by CenturyLink (Cambridge, UK) [20.49 km]: 31.566 ms
Testing download speed................................................................................
Download: 68.62 Mbit/s
Testing upload speed......................................................................................................
Upload: 10.93 Mbit/s
```

它给你提供了互联网上传和下载的网速。它快速而且可脚本调用，因此你可以定期运行它，并将输出保存到文件或数据库中，以记录一段时间内的网络速度。
