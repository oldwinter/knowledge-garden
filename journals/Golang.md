首次安装完以后，由于地址被屏蔽，且go 命令不走v2ray代理，所以需要更换GOPROXY

```
go env -w GOPROXY="https://goproxy.cn"
```

接着需要把GOPATH加入到bash或zsh的执行环境中，使得 go get的二进制命令可以直接被shell识别。
```shell
# Add the following 2 lines to your ~/.bash_profile
export GOPATH=/Users/$USER/go
export PATH=$GOPATH/bin:$PATH

# In your current terminal, to reload the session
source ~/.bash_profile
```