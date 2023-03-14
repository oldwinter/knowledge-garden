---
title: macOS禁用SIP教程
date created: 2022-12-08
date modified: 2023-03-14
---

1、关闭SIP

关闭SIP需要进入恢复模式，重新启动Mac，然后同时按住“Command”+“R”不放，直到看到苹果的标志再松开，然后等待片刻进入macOS恢复模式。

进入恢复模式后，在顶部菜单点击“实用工具”→“终端”打开终端

输入命令 csrutil disable

粘贴进去按回车返回提示：“Successfully disabled System Integrity Protection.Please restart the machine for the changes to take effect.”即SIP关闭成功。

然后点击顶部菜单“”图标→“重新启动”即可。

注意：macOS 10.15及以上的版本在关闭SIP重启系统后还需要在终端运行命令：

sudo mount -uw /

才能获取完全权限。

2、重新打开SIP

SIP能有效保护系统文件被恶意程序修改和删除，所以正常情况下还是建议打开。打开SIP仍然需要先进入恢复模式，重新启动Mac，然后同时按住“Command”+“R”不放，直到看到苹果的标志再松开，然后等待片刻进入macOS恢复模式。

进入恢复模式后，在顶部菜单点击“实用工具”→“终端”打开终端

执行：csrutil enable

粘贴进去按回车，返回提示：“Successfully enabled System Integrity Protection.Please restart the machine for the changes to take effect.”即SIP开启成功。  
然后点击顶部菜单“”→“重新启动”即可。

原文链接：[https://www.kejixz.com/849.html](https://www.kejixz.com/849.html)
