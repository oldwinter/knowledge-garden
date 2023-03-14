---
date created: 2022-08-18
date modified: 2023-03-14
title: 安卓使用terminal并使用git和github - termux
---

[[Guide] Using Git to sync your Obsidian vault on Android devices - Share & showcase - Obsidian Forum](https://forum.obsidian.md/t/guide-using-git-to-sync-your-obsidian-vault-on-android-devices/41887)

google play安装。

安装后，换源：

```bash
# 找到安卓非root的目录，获取安卓存储权限
cd /storage/emulated/0 # 华为手机的根目录
termux-setup-storage #其实这个命令执行完后的storage就是上面这个目录，所以好像不需要在上面的目录执行这个命令。

# 换源，用图形界面
termux-change-repo

# 删除2个没用的源再update，否则出错
pkg remove game-repo  
pkg remove science-repo  
pkg update

# 安装git 和github命令工具
pkg install git
pkg install gh

# 安装图形界面操作就能成功登陆
gh auth login

# clone github仓库
gh repo clone oldwinter/knowledge-garden

# 后面自动执行git同步命令我觉得没必要，自己手动搞一下算了，手机只进行阅读，不写东西，就负责pull即可。

```

## termux-setup-storage的补充说明

如果您的设备运行的是 Android 6 或更高版本，则需要运行以下命令

```
termux-setup-storage
```

从 Termux 内部，然后接受写入存储的请求，以便 Termux 能够执行目录和文件创建。

该`termux-setup-storage`命令在您的`$HOME`或`~/`名为 的目录中创建一个新目录`storage`。这个新目录包含`/storage/emulated/0`以下列出的一些符号链接：

```
dcim -> /storage/emulated/0/DCIM
downloads -> /storage/emulated/0/Download
external-1 -> /storage/external_sd/Android/data/com.termux/files
movies -> /storage/emulated/0/Movies
music -> /storage/emulated/0/Music
pictures -> /storage/emulated/0/Pictures
shared -> /storage/emulated/0
```

因此，您现在可以运行以下命令来创建`/storage/emulated/0/Directory`上述内容，而现在只需少输入一点：

```
cd ~/storage/shared
mkdir Directory
```
