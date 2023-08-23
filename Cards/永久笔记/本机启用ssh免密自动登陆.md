---
aliases:
  - vscode中启用ssh自动登陆
date created: 2022-05-11
date modified: 2023-03-14
title: 本机启用ssh自动登陆
---

1. 本地生成 RSA 密钥, 参考:[https://www.jianshu.com/p/09b81c07e03f](https://www.jianshu.com/p/09b81c07e03f)
2. 输入 (多个用户登录输入多次，将本机的证书公钥拷贝至远程机器):

```shell
ssh-copy-id -i ~/.ssh/id_rsa.pub username@192.168.2.22
```

成功后则会提示:

```bash
/usr/bin/ssh-copy-id: INFO: Source of key(s) to be installed: "/Users/username/.ssh/id_rsa.pub"
/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
/usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
username@192.168.2.22's password: 

Number of key(s) added:        1

Now try logging into the machine, with:   "ssh 'username@192.168.2.22'"
and check to make sure that only the key(s) you wanted were added.
```

3. 然后你登录服务器就会自动登录了

```bash
ssh username@192.168.2.22
```



如果本地之前已经配置好[[ssh config 文件]]，则这边好像不用配了，vscode也能直接连上ssh

4. 这时候在 vscode 中安装好 `Remote-SSH` 插件, 点击 vscode 左下角绿色箭头打开远程连接, 选择 `open configuration file`, 输入:

```bash
Host 2.22_username
  HostName 192.168.2.22
  User username
  PreferredAuthentications publickey
  IdentityFile "/Users/username/.ssh/id_rsa"

Host 2.22_username2
  HostName 192.168.2.22
  User username2
  PreferredAuthentications publickey
  IdentityFile "/Users/username/.ssh/id_rsa"
```

保存后, 再次用 vscode 登录即可
