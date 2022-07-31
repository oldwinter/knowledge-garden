---
url: https://imageslr.com/2020/03/19/mac-initialization.html
title: 
date: 2022-07-31 02:07:26
tag: 
summary: Mac 是大多数程序员的主力机器。如今各个互联网公司都会给员工配备 Mac 电脑，而拿到新电脑不免要鼓捣一番，安装各种环境、插件、软件等，以让自己用着更顺手。
---
Mac 是大多数程序员的主力机器。如今各个互联网公司都会给员工配备 Mac 电脑，而拿到新电脑不免要鼓捣一番，安装各种环境、插件、软件等，以让自己用着更顺手。

本文记录了我从零开始配置一台新 Mac 的过程，基于我日常的开发习惯。尽管具有一定的主观性，但依然有相当的参考价值，读者可以按需选用。

建议首先完成[系统设置](#system-config)和[科学上网](#terminal-fq)，再进行其他步骤。前者完成 Mac 的一些初步设置，后者提高终端命令如 `brew`、`git clone` 的下载速度。

本文部分内容参考了 [Github - bestswifter/macbootstrap](https://github.com/bestswifter/macbootstrap)。

## 系统设置

### 触控板设置

**开启轻点点按**：“系统偏好设置 - 触控板 - 光标与点按 - 轻点来点按”，打开该选项。这样无需按下触控板即可点击。

**开启三指拖动**：“系统偏好设置 - 辅助功能 - 指针控制 - 触控板选项 - 启动拖移”，打开该选项，并选择 “三指拖移”。这样在移动窗口、拖动选择大片文字等时不需要按下触控板，只需要三指在触控板上拖动即可。

_默认情况下，“左右切换全屏幕窗口”、“显示调度中心” 三指 / 四指均可。开启三指拖动后，这两个操作自动换为四指。_

### 打开 iCloud 同步

在系统偏好设置中登录 Apple ID，打开 iCloud。作用：

1.  在多台设备间共享文件，比如桌面和文稿数据（需要在 “iCoud 云盘 - 选项” 中单独打开）
2.  利用 Handoff 在多台设备之间无缝切换，比如我们在旧 Mac 上复制一段文本，可以直接粘贴在新 Mac 里。这在配置新 Mac 环境的时候尤其有用：我们可以在旧 Mac 中查看网页 / 笔记，复制某一条命令，然后直接粘贴到新 Mac 的终端中执行
3.  下文的许多软件（如 SnippetsLab、Paste、MWeb 等）都可以使用 iCloud 同步。在新 Mac 中下载软件后，可以直接恢复旧 Mac 的数据

### 关闭文件验证、App 验证

跳过打开 DMG 文件时的验证过程：

```
defaults write com.apple.frameworks.diskimages skip-verify -bool true
defaults write com.apple.frameworks.diskimages skip-verify-locked -bool true
defaults write com.apple.frameworks.diskimages skip-verify-remote -bool true 
```

默认情况下系统禁止安装第三方 App，通过以下代码绕过限制：

```
sudo spctl 
defaults write com.apple.LaunchServices LSQuarantine -bool false 
```

### 禁用文字自动更正

随便打开一个文本编辑框，如 “信息”，尝试以下输入会发现：

1.  `'` / `"` 被替换为了 `‘` / `“`
2.  `sdgs` 被替换为了 `Sdgs`，首字母自动大写
3.  `---` 被替换为了 `—`

通过以下命令禁用：

```
defaults write -g NSAutomaticQuoteSubstitutionEnabled -bool false
defaults write -g NSAutomaticDashSubstitutionEnabled -bool false
defaults write -g NSAutomaticSpellingCorrectionEnabled -bool false 
```

也可以在 “系统设置 - 键盘 - 文本” 中设置。

### 打开全键盘控制

系统经常会出现如下图所示的 Confirm 框，包含 “确定”、“取消” 两个选项：

![](https://imageslr.com/media/15846066678989.jpg)

![](https://imageslr.com/media/15846132021180.jpg)

默认情况下，我们只能通过「回车」选择 “确定”，如果想选择 “取消”，必须通过鼠标点击。打开全键盘控制后，通过 `Tab` 键切换选项，聚焦到 “取消” 上，然后按下「空格」，就可以选择“取消”。

在 “系统偏好设置 - 键盘 - 快捷键” 页面下方，打开全键盘控制：

![](https://imageslr.com/media/15846068903987.jpg)

注意：无论焦点聚焦于哪个选项，按下「回车」都相当于是选择 “确定”。

当然，如果有 Touch Bar，可以直接在 Touch Bar 上完成操作。

### 显示电量百分比

点击状态栏电源图标，选择 “显示百分比”。

### 加速 Zoom 动画

双击应用标题栏时，会自动调整窗口大小。下面的代码可以加速调整动画：

```
defaults write NSGlobalDomain NSWindowResizeTime -float 0.001 
```

下文提到的插件 Moom 也可以快速调整窗口大小。

### 关闭触控板前进后退

在浏览网页时，可以在触控板两指水平轻扫，控制页面的前进后退。

![](https://imageslr.com/media/image-20210905113805315.png)

图：在 Chrome 中两指右扫，会出现页面后退提示符

但实际场景下，这个功能基本没用，且误触频率很高 (和页面的水平滚动条冲突)。建议关闭：`系统设置 - 触控板 - 更多手势 - 在页面之间轻扫`，取消勾选。

## 开发环境

### Homebrew

Homebrew 是 Mac 下的软件包管理工具，既可以用来安装开发环境，也可以用来[安装 App Store 应用](https://sspai.com/post/42924)。

安装 Homebrew：

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)" 
```

如果报错 `Failed to connect to raw.githubusercontent.com port 443: Connection refused`，重开一个终端窗口就可以了。

如果 Homebrew 速度很慢，需要配置[终端科学上网](#terminal-fq)。

### iTerm2

**安装：**

**快捷键：**

*   光标移动：
    *   `⌃+A/E`：光标移动到开头 / 结尾
    *   `⌃+W/U`：删除光标前一个单词 / 所有内容
    *   `⌥+←/→`：光标左 / 右移动一个单词（需要配置，见下文）
*   Tab 切换：
    *   `⌘+T`：新建 Tab
    *   `⌘+数字`：选择某一 Tab
    *   `⌘+←/→`：左 / 右切换 Tab
    *   这些快捷键在 Chrome 下也适用
*   Pane 相关：
    *   `⌘+D` / `⌘+⇧+D`：新建 Pane
    *   `⌘+⌥+方向键`：切换 Pane
    *   `⌘+⌃+方向键`：调整 Pane 大小
*   文本选择：
    *   iTerm2 默认选中即复制，不需要 “先选中，再复制”
    *   双击选择单词，三击选择整行，按下 `⌘+⌥` 矩形选择

**如果命令写错怎么办？**

*   简单的方法：`↑`，重新编辑上一条命令
*   `^{old}^{new}`：这个命令可以将上一条命令的 `{old}` 部分替换为 `{new}` 重新执行，比如 `vim a.txt` 不小心写成 `vom a.txt`，可以执行 `^vom^vim`
*   [thefuck](https://github.com/nvbn/thefuck)：输错一个命令时，直接输入一个 `fuck`，错误自动纠正，瞬间神清气爽
*   对于特别长的命令，可以使用 zsh 提供的快捷键 `Ctrl-x + Ctrl-e` 进入 vim 编辑

**配置 “光标左 / 右移动一个单词”**：“Preferences-Profiles-Keys”，找到快捷键 `⌥←`，双击，弹出如下的对话框，Action 选择 “Send Escape Sequence”，`Esc+b` 表示向前移动。双击 `⌥→`，`Esc+` 后面填 `f` 表示向后移动。

![](https://imageslr.com/media/15846289981455.jpg)

### vim 语法高亮

首先执行 `cp /usr/share/vim/vimrc ~/.vimrc` 复制 vim 配置文件，然后执行 `vim ~/.vimrc`，添加以下内容：

### zsh 插件

Mac 自带了 zsh，执行 `zsh --version` 检查是否安装了 zsh。

**安装 oh-my-zsh：**

```
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)" 
```

当 oh-my-zsh 安装成功后，我们会看到终端的文本不再是单调的白色，而是有了不同的颜色。这是因为 oh-my-zsh 提供了很多主题，可以通过编辑 `~/.zshrc` 中的 `ZSH_THEME` 字段修改，默认是 `robbyrussell`。服务端我使用 `jonathan`。

oh-my-zsh 提供了一个 `~/.zshrc` 模板，安装后会替换默认的 `~/.zshrc`。下面以安装 oh-my-zsh 后的 `~/.zshrc` 为准。

安装完成后，oh-my-zsh 会自动设置为默认 shell 工具。如果设置失败，手动执行：

```
sudo chsh -s $(which zsh) $(whoami) 
```

此时再重新登录 shell，就可以看到效果了！

**安装 zsh-autosuggestion 与 autojump：**

```
 git clone git://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions


git clone git://github.com/wting/autojump.git
cd autojump
./install.py 
```

zsh-autosuggestion 可以根据当前输入的内容，自动提示之前执行过的命令。补全命令的快捷键是 `→`，如果觉得方向键离键盘热区较远，也可以使用 `End`（Mac 下是 `Fn + End`）。

autojump 可以快速跳转到某个目录，比如当我们执行过 `cd ~/some-file` 后，执行 `j some`、`j so`、`j sf` 都可以跳转到 `~/some-file` 目录下。

**安装 zsh-syntax-highlighting：**

```
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git $ZSH_CUSTOM/plugins/zsh-syntax-highlighting 
```

输入命令后，如果命令正确，则高亮为绿色，反之高亮为红色。

安装完后，还需要在 `~/.zshrc` 中加载这些插件，才能生效。执行 `vim ~/.zshrc`，找到 `plugins=...`，其内容如下所示：

```
# Add wisely, as too many plugins slow down shell startup.
plugins=(git)

source $ZSH/oh-my-zsh.sh 
```

改成这样：

```
# Add wisely, as too many plugins slow down shell startup.
plugins=(git zsh-autosuggestions autojump zsh-syntax-highlighting)

[[ -s /home/zsh/.autojump/etc/profile.d/autojump.sh ]] && source /home/zsh/.autojump/etc/profile.d/autojump.sh
autoload -U compinit && compinit -u

source $ZSH/oh-my-zsh.sh 
```

然后 `source ~/.zshrc` 使插件生效。执行以下命令，验证插件是否安装成功：

1.  验证 autojump：首先执行 `cd ~/Downloads` 跳转到目录 `~/Downloads`，然后只需要输入目录的若干个字符：`j dow`，就可以自动跳转到 `~/Downloads`
2.  验证 zsh-autosuggestions：输入之前执行过的命令的前几个字符，就会自动提示完整命令，按 `→` 可补全

![](https://imageslr.com/media/15846317408700.jpg)

**同步 bash 配置：** 在 `~/.zshrc` 的开头加入这两行（有的文件可能不存在，自行删除对应行）：

```
source ~/.bash_profile
source /etc/profile 
```

### Git 配置

`git commit` 要求设置用户名和邮箱，通过以下命令设置，省略 `--global` 只对当前仓库设置：

```
git config --global user.email "you@example.com"
git config --global user.name "Your Name" 
```

为常用 git 命令设置更短的别名（`~/.gitconfig`）：

```
[alias]
        last = log -1
        lg = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow) %d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
        co = checkout
        ci = commit
        st = status
        br = branch
        cp = cherry-pick 
```

## 高效插件

iStat Menus 可以在状态栏显示网速，有利于判断网络情况：

![](https://imageslr.com/media/15846130800829.jpg)

### 扩展预览程序：QuickLookPlugins

Mac 的预览程序十分方便，按下空格可以快速预览几乎所有文件，安装插件可以扩展其功能。[Github - sindresorhus/quick-look-plugins](https://github.com/sindresorhus/quick-look-plugins) 提供了一系列可供选用的插件，以及每个插件的介绍、截图、源码。

我选择通过 Homebrew 安装自己需要的几个插件：

```
brew cask install qlcolorcode qlstephen qlmarkdown quicklook-json qlimagesize 
```

每个插件的功能：

*   `qlcolorcode`：增加代码高亮
*   `qlstephen`：预览没有后缀名的纯文本文件，如 `README`
*   `qlmarkdown`：预览 Markdown 文件，自动渲染
*   `quicklook-json`：预览 JSON 文件
*   `qlimagesize`：预览图片时，显示图片大小与分辨率

其他插件请在 [Github - sindresorhus/quick-look-plugins](https://github.com/sindresorhus/quick-look-plugins) 自行选用，Catalina 系统的安装方法见 [README](https://github.com/sindresorhus/quick-look-plugins)。

### 快速调整窗口大小：Rectangle

Moom 是一款收费软件。推荐功能类似的免费软件：[Rectangle](https://imageslr.com/2020/03/19/(https://rectangleapp.com/)

Moom 是 Mac 的一款窗口布局工具，可以快速缩放应用 / 移动位置，比如将应用布局成以下状态，只需分别点击三下，如果此时将桌面布局保存为一个快照，之后就可以一键恢复布局。

![](https://imageslr.com/media/15846201525933.jpg)

默认情况下需要通过鼠标操作，配置全局快捷键后，只用键盘就可以完成全部操作，效率更高：

![](https://imageslr.com/media/15846215057421.jpg)

我设置的全局快捷键是 `⌘+⇧+M`，`M` 取自 `Moom` 的首字母，方便记忆。

打开 “Show cheat sheet” 选项，这样在按下快捷键后会显示速查表，功能包括：

1.  `Tab`：居中
2.  `方向键`：贴合屏幕边缘
3.  `⌘+方向键`：调整为屏幕的一半大小，并贴合到屏幕边缘
4.  `空格`：最大化
5.  `回车`：恢复原始大小和位置
6.  `数字键`：自定义布局，在 `Preferences-Custom` 中配置

![](https://imageslr.com/media/15846215818236.jpg)

💡 Mac 系统也自带了简易的窗口布局功能：将鼠标悬浮到应用程序红绿灯的 “绿灯” 按钮上，然后按下 `Alt` 键，可以快速将应用程序调整至左、右半个屏幕。

### 效率神器：Alfred

💡 推荐阅读 [⚙️ 效率提升方法论 - 工具使用篇 - alfred](https://imageslr.com/2022/efficiency-workflow.html#alfred)

Mac 效率神器，不多作介绍。快捷键：

1.  `⌥ Alt` + `Space` 打开 Alfred（我改成了双击 `⌥ Alt`）
2.  `↑`、`↓` 切换高亮项
3.  `⇧ Shift` 使用「预览程序」预览当前高亮项
4.  `↩︎ Enter` 选择当前高亮项
5.  `⌘ Command` + `数字` 快速选择某一项
6.  `⌥ Alt` + `↩︎ Enter`、`⌘ Command` + `↩︎ Enter` 会对当前高亮项执行特殊操作，按下 `⌥` / `⌘` 就会显示功能提示

#### 命令

*   `quit`：退出某个应用程序

#### 文件搜索

*   `open` + 文件名：按 `↩︎ Enter` 打开文件，按下 `⌘ Command` 再按 `↩︎ Enter` 会打开文件所在的文件夹
*   `空格` + 文件名：同上
*   `find` + 文件名：打开文件所在的文件夹
*   `in` + 字符串：搜索包含指定字符串的文件

文件搜索功能可以和很多 App 配合使用，比如可以通过题目搜索 Papers 中的论文。

#### 目录导航

*   `/`：进入根目录
*   `~`：进入用户目录
*   `*`：在当前目录下模糊搜索，如 `*top` 可以搜到 `Desktop`

#### 常见使用场景

*   Google 搜索：`google {query}`，或者直接输入 `{query}`
*   计算器
*   有道翻译：[Github - wensonsmith/YoudaoTranslate](https://github.com/wensonsmith/YoudaoTranslate)
*   MWeb 文档搜索：[Github - tianhao/alfred-mweb-workflow](https://github.com/tianhao/alfred-mweb-workflow)
*   颜色代码转换：[Github](https://github.com/g1eny0ung/Alfred-Colors-workflow)，16 进制 / RGB/HSL 互转，对于前端开发者比较有用

#### 自定义网页搜索

Alfred 内置了许多搜索网站，如百度、Google 等。使用 Alfred 搜索的正确姿势：

1.  快捷键激活 Alfred
2.  输入要搜索的内容
3.  按下 `Command + 1`、`Command + 2` 等快捷键，选择一个搜索网站

![](https://imageslr.com/media/image-20210824101522940.png)

这会直接打开搜索结果页。相比于「打开浏览器 - 打开网站 - 聚焦到输入框 - 输入关键字 - 搜索」的过程，使用 Alfred 搜索效率更高。

工作场景下，我会将公司内网搜索配置到 Alfred。配置方法：进入 Alfred 的 Preference 页面，按照下图 1、2、3、4 的步骤设置。

![](https://imageslr.com/media/image-20210824103424554.png)

其中，第 4 步是公司内网搜索结果页的 URL，形如：

`{query}` 是一个占位符，表示你输入的搜索内容。

如何获取这个 URL？只需要打开内网搜索页，搜索任意内容，查看结果页的 URL。比如我在百度搜索 “测试”，会得到这样一个 URL：

那么百度搜索的 Search URL 就是：

同理，Google 的 Search URL 是：

```
https://www.google.com/search?q={query} 
```

### 代码片段：SnippetsLab

SnippetsLab 可以用来分类整理各个代码片段，在写代码时随时取用。

SnippetsLab 支持 iCloud 同步，这意味着当我们切换到新 Mac 后，可以在 1 秒内立刻恢复所有的代码片段：

![](https://imageslr.com/media/15846156352773.jpg)

此外，通过 Alfred 插件，可以非常方便地搜索某个代码片段：

![](https://imageslr.com/media/15846151958103.jpg)

点击查看 [Alfred 插件配置说明 / 使用方法 / 下载链接](https://www.renfei.org/snippets-lab/manual/mac/tips-and-tricks/alfred-integration.html)。使用方法：

1.  `⌥ Alt` + `Space` 打开 Alfred
2.  输入 `snippet {query}` 查询
3.  快捷键：
    1.  `↑`、`↓` 切换选择
    2.  `↩︎ Enter` 将当前选择的代码片段复制到剪切板
    3.  `⌘ Command` + `数字` 快速选择某一代码片段
    4.  `⌥ Alt` + `↩︎ Enter` 在 SnippetsLab 中打开当前选择的代码片段
    5.  `⌘ Command` + `↩︎ Enter` 将当前选择的代码片段粘贴到屏幕最前方的应用中

### 记录剪切板历史：Alfred / Paste

推荐使用 Alfred，性能更好，更轻量。设置路径：“Preference - Features - Clipboard History”，勾选 “Keep Plain Text”、“Keep Images”、“Keep File Lists”。快捷键推荐设置为 `⌘ Command` + `⇧ Shift` + `V`。

Paste 也可以记录剪切板历史，支持 iCloud 同步。快捷键：`⌘ Command` + `⇧ Shift` + `V` 打开 Paste，`⌘ Command` + `数字` 快速复制某一条记录。

![](https://imageslr.com/media/15846159741374.jpg)

### 科学上网

在终端安装 Homebrew、或者执行 `git clone` 时，一般情况下很慢（~100KB/s），需要安装科学上网工具，然后在终端科学上网。

一般互联网公司的 VPN 都自带科学上网功能。如果公司不提供 VPN，可以参考[这篇文章](https://portal.shadowsocks.nz/knowledgebase/182/Windows-or-macOSClash-for-Windows-%E8%AE%BE%E7%BD%AE%E6%96%B9%E6%B3%95.html)。

### 录屏软件

可以使用 [Kap](https://getkap.co/) 或系统自带的 QuickTime Player。

### 录制系统声音：SoundFlower

录制屏幕的时候只能录制自己说话的声音，录不了系统声音。安装 SoundFlower 可以录制系统声音。参考这里安装：

*   [macOS 下怎么录屏，能同时保留声音？有哪些较好的解决方案？ - 殊哥的回答 - 知乎](https://www.zhihu.com/question/20251726/answer/94938941)
*   [如何用 QuickTime 对 Mac 屏幕录制，而且录上声音？ - 夯七的回答 - 知乎](https://www.zhihu.com/question/26032781/answer/170489532)

### 视频下载：Downie

简单高效的老牌视频下载软件，可以下载 Youtube、Bilibili、爱奇艺等主流网站的任意视频。只需要复制网页链接，在应用窗口中粘贴，就可以自动下载。下载速度取决于网速，不限速。还可以自动识别 Youtube 的播放列表，批量下载多个视频。

## 其他软件

### 记笔记：MWeb

[MWeb](https://zh.mweb.im/) 是一款非常优秀的 Markdown 笔记软件。在尝试过印象笔记、Typora、Bear、Ulysses 等多款软件后，个人认为没有一款软件可以替代 MWeb，后者对 Markdown 与 LaTex 的支持相当完善，同时保持了良好的使用体验。此外，MWeb 也有 iOS 应用，在不内购的情况下可以阅读、编辑笔记，无法新建笔记，足以满足日常需求。

![](https://imageslr.com/media/15846229381899.jpg)

对我而言， MWeb 更重要的角色是**个人知识库**。MWeb 的笔记管理功能相当强大，支持任意层级的文件夹、标签等功能。日常使用中，我会配合 [mweb alfred workflow](https://github.com/tianhao/alfred-mweb-workflow) 插件，根据关键字，快速检索文档。

MWeb 是一个_开放的_ 笔记软件，这意味着我可以直接编辑其中的 `.md` 文件。因此在需要输出长文的情况下，我会优先使用 [Typora](https://typoraio.cn/)，以获得所见即所得的体验。

MWeb 可以通过 iCloud 同步，只需要将文档库保存在 iCloud 云盘下。

![](https://imageslr.com/media/15846233668366.jpg)

我制作的 MWeb、Typora 主题：

*   [https://github.com/imageslr/mweb-themes](https://github.com/imageslr/mweb-themes)：MWeb 主题
*   [https://github.com/imageslr/typora-theme-bear](https://github.com/imageslr/typora-theme-bear)：30 余款 Bear 风格的主题
*   [https://github.com/imageslr/typora-theme-lark](https://github.com/imageslr/typora-theme-lark)：飞书云文档主题

### 待办事项管理：OmniFocus

OmniFocus 是一个 GTD 工具，我使用它来安排我的待办事项。OmniFocus 支持多端同步，数据存储在 OmniFocus 服务器中，或者个人 [WebDAV 服务器](https://sspai.com/post/60540)。

### 每日计划：OmniOutliner

OmniOutliner 是一款简洁、专注的大纲制作软件，我使用它来安排我的每日计划。将 OmniOutliner 文件存储在 iCloud 云盘中，可以实现多端同步。

![](https://imageslr.com/media/15846254446005.jpg)

### 浏览器：Chrome

“系统偏好设置 - 通用 - 默认网页浏览器”，选择 “Google Chrome”

### PDF 阅读：PDF Expert

PDF 阅读工具

### 代码编辑：VS Code

下载地址: [官网](https://code.visualstudio.com/download)。

下载完成后，打开 VS Code，按下 `⌘ Command` + `⇧ Shift` + `P`，输入 `command`，选择 `Shell Command: Install 'code' command in PATH`。这样就可以在 iTerm2 中，直接打开某个文件夹：

```
code . // 在 VS Code 中打开当前目录
code ~/my-blog // 在 VS Code 中打开 my-blog 目录
code ~/.zshrc // 在  VS Code 中打开 .zshrc 文件，类似于 vim ~/.zshrc 
```

### 视频播放：IINA

[官网下载](https://iina.io/)

### 单词翻译：Bob

[Github 下载](https://github.com/ripperhe/Bob)。快捷键十分好用，支持截图翻译。有了它以后，就不需要在 Chrome 里安装划词翻译插件了。

### 单词学习：欧路词典

如果你希望**随手记录**自己遇到的生词，并**定期复习**，那么可以使用[欧路词典](https://www.eudic.net/v4/en/app/eudic)。功能：

*   全局鼠标划词翻译，一键加入单词本，还可以记笔记。
*   全平台同步。工作时在电脑上取词，通勤时在手机上复习。
*   支持 FlashCard 形式的单词复习，搭配艾宾浩斯记忆法，自动设置学习计划。

### 其他

*   绘图工具：[draw.io desktop](https://github.com/jgraph/drawio-desktop/releases)
*   截图工具：[Xnip](https://zh.xnipapp.com/)
*   窗口布局工具：[Rectangle](https://rectangleapp.com/)
*   切换应用时显示缩略图：[AltTab](https://alt-tab-macos.netlify.app/)
*   键盘清理工具：[KeyboardCleanTool](https://sspai.com/post/45406)，可以在清理键盘的时候锁定键盘。
*   番茄钟：[Stretchly](https://hovancik.net/stretchly/downloads/)，既能充当番茄钟，还能用弹窗提醒你起来活动活动，对程序员来说很有用，[介绍文章](https://www.appinn.com/stretchly/)。类似的工具还有 [Just Focus](https://getjustfocus.com/mac.html)。
    *   Stretchly 的弹窗提醒会随机展示一句舒展身体的 idea，[我翻译的中文版](https://gist.github.com/imageslr/8f22b699c6a769d971a098fd5d614994)
*   屏幕取色：[Sip](https://xclient.info/s/sip.html)，或者 [uTools](https://u.tools/) 自带的取色工具，前端开发经常用到。(Mac 自带的数码取色器可以显示为十六进制，但不能复制到剪贴板)
*   状态栏管理：Bartender 4，可以自定义隐藏状态栏的图标，或者更新时显示 15s 再隐藏，按住 Command 可以自由拖动排列顺序；另一个应用是 Hidden Bar，App Store 免费下载，同样好用，我用来和 Bartender 配合，隐藏一些不受后者控制的图标。
*   壁纸应用：[pap.er](http://paper.meiyuan.in/?utm_source=zh)，专为 Mac 设计的壁纸应用，简洁易用，图片质量也很高。
*   ~触控板增强：BetterTouchTool（[介绍视频](https://www.bilibili.com/video/BV1a7411W7s3)），[论坛](https://community.folivora.ai/c/setup-preset-sharing/5/l/top)里提供了很多预设，可以直接导入使用。我个人认为按住 Command 显示 Dock 栏程序图标是比较有用的，但功能太复杂，所以放弃了，喜欢配置的话可以尝试一下。~
*   快速连接 AirPods：~ToothFairy。~直接通过菜单栏的蓝牙图标连接。
*   Finder 增强：[Default Folder X](https://stclairsoft.com/DefaultFolderX/)，快速选择文件夹、记录近期访问的文件。

## 附件

[百度云](https://pan.baidu.com/s/1J9ytW_efBmusut7QiG0mYw)，提取码: 6641

如果安装时提示 “已损坏”，在终端执行：

```
 sudo spctl --master-disable

sudo xattr -r -d com.apple.quarantine <把应用程序拖到终端> 
```