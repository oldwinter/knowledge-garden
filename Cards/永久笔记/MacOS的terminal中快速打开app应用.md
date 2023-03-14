---
date created: 2022-08-08
date modified: 2023-03-14
title: MacOS的terminal中快速打开app应用
---

x:: [[Windows的terminal中快速打开app应用]]

MacOS用户如果有用命令行的话，大多数人应该知道open .会打开Finder。事实上它能打开所有的目录，比如:

```
$ open ~/Library/Preferences
$ open /etc
$ open ../..
```

你还能同时打开多个目录：

```
$ open ~/Documents ~/Desktop ~/Downloads
$ open ~/D*
```

然后它还能打开各种文件，比如：

```
$ open document.pdf
```

会使用默认的程序（通常是Preview）打开当前目录下的document.pdf，同样你也能一次性打开多个文件：

```
$ open ~/Desktop/Screen\ Shot\ *.png
```

你还能指定使用什么程序来打开文件，使用-a参数：

```
$ open -a Preview ~/Desktop/Screen\ Shot\ *.png
$ open -a TextEdit web.html
```

上面的指令会使用Preview来打开多个截屏的图片，使用TextEdit打开网页。

打开网络位置也是可以的，比如打开某个网页，访问远程的计算机等：

```
$ open https://scriptingosx.com   # default browser
$ open vnc://TestMac.local       # Screen Sharing
```

### 总有一个姿势会爽到你

我自己平时用得最多的就是打开文件，比如我跑程序，中间有生成文件，我就想打开看一眼，就不用去Finder里翻，直接命令行打开它。而且不单单是shell，比如我在R里做了某些分析，生成了某个文件，我也是直接就可以打开它，用system(“open the_file”)搞定。

再者我在命令行，我想打开某个文件，但不想窗口跳出来，因为我还想待在命令行里，还想要窗口聚焦在Terminal，可以用-g参数打开文件。

再比如你copy了个文件，你可以用pbpaste | open -f -a TextEditor打开，这些打开了TextEditor的同时，你copy的东西已经自动paste到里面了。-f参数就是从STDIN中读入，这有个好处是比如你用awk处理了一些文本文件，你可以通过管道直接就把结果贴在了文本编辑器里（没有文件生成）。
