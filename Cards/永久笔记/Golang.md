---
date created: 2022-06-09
date modified: 2023-03-14
title: Golang
---

首次安装完以后，由于地址被屏蔽，且 go 命令不走 v2ray 代理，所以需要更换 GOPROXY

```
go env -w GOPROXY="https://goproxy.cn"
```

接着需要把 GOPATH 加入到 bash 或 zsh 的执行环境中，使得 go get 的二进制命令可以直接被 shell 识别。

```shell
# Add the following 2 lines to your ~/.bash_profile
export GOPATH=/Users/$USER/go
export PATH=$GOPATH/bin:$PATH

# In your current terminal, to reload the session
source ~/.bash_profile
```
