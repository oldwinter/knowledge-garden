---
date created: 2022-06-09
date modified: 2023-03-14
title: mac启动台相关配置
---

## Mac 设置 应用程序启动台行数列数

```
defaults write com.apple.dock springboard-columns -int 12
defaults write com.apple.dock springboard-rows -int 8
defaults write com.apple.dock ResetLaunchPad -bool true;
killall Dock
```

## 如果想要恢复到系统默认，复制命令粘贴敲回车即可：

```
defaults write com.apple.dock springboard-rows Default
defaults write com.apple.dock springboard-columns Default
killall Dock
```

## 重置 Launchpad 设置

出现以上问题只需要重置 Launchpad 设置：

1.**重置 Dock 图标数据库：**在 Finder 中进入 `~/Library/Application Support/Dock/` 目录，删除该目录下的 `desktoppicture.db` 文件。  
2. 或者在 Terminal 中键入 `rm ~/Library/Application\ Support/Dock/*.db && killall Dock` 后回车。  
3.**重置 Launchpad 图标数据库：**在 Terminal 中键入 `defaults write com.apple.dock ResetLaunchPad -bool true && killall Dock` 后回车。

完成以上操作后，Launchpad 图标布局已经恢复默认设置，苹果官方提供的 App 都被重新排列到 Launchpad 第一屏幕中，然后根据自己的需要来进行重新排列 App 即可。

## dock 栏完全隐藏

1.！设置里还要同时设置勾选『自动隐藏和显示程序坞』。  
2. 然后执行下列代码，就相当于dock栏完全隐藏了。

```applescript
# defaults write com.apple.dock autohide-delay -int 0      ##（时间设为最短）
# defaults write com.apple.dock autohide-delay -int 0.5    ##（时间设为 0.5s）
defaults write com.apple.dock autohide-delay -int 10     ##（时间设为 10s）
#使设置生效
killall Dock
```
