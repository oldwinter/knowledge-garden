---
date created: 2022-06-09
date modified: 2023-03-14
title: z命令
---
z 是一个相当实用的 cd 命令增强脚本，目前支持 bash

和 zsh。使用 z，我们能够在 Linux 命令行实现更加快速的导航。

安装

要将 z 安装到你的系统中，可以敲入下列指令：

```
mkdir ~/.z_jump
cd ~/.z_jump
git clone https://github.com/rupa/z.git
echo 'source ~/.z_jump/z/z.sh' >> ~/.zshrc
source ~/.zshrc
```

注意，使用 bash 的朋友需将上面的 .zshrc 替换成 .bashrc。

这样，就可以正常使用 z 了。

用法

z 会将你每次 cd 过的目录存起来放到 ~/.z 文件中。一旦

有了记录，就可以直接使用 z 来导航目录了，例如：

z co

将转到 ~/code 目录。z 通过正则匹配，并带你到使用频率

最高的目录。

此外，你也可以通过指定不同的选项来选择不同的导航行为：

-r：导航到排名最高的目录  
-t：导航到最近访问的目录  
-l：按使用频率列出目录

值得一提的是，z 还支持 Tab 补全，想必会为你省时不少吧。>)

[Linux z 命令 command not found z 未找到命令 z 命令详解 z 命令未找到 z 命令安装 - CommandNotFound ⚡️ 坑否](https://commandnotfound.cn/linux/1/589/z-%E5%91%BD%E4%BB%A4)
