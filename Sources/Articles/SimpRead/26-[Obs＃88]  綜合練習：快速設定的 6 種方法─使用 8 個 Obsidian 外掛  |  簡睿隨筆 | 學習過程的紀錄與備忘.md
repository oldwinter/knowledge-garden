---
url: http://jdev.tw/blog/7114
title: [Obs＃88]  綜合練習：快速設定的 6 種方法─使用 8 個 Obsidian 外掛  |  簡睿隨筆 | 學習過程的紀錄與備忘
date: 2022-08-09 16:43:28
tag: 
summary: 1. 前言 Obsidian 的設定視窗內含多個設定：外觀、快捷鍵、核心外掛、第三方外掛與其他選項設定，每次為了…
---
Obsidian 的設定視窗內含多個設定：外觀、快捷鍵、核心外掛、第三方外掛與其他選項設定，每次為了某種設定都必須點擊數次，才能到達要設定的位置，今天分享一個小技巧，使用 Advanced URI 外掛來快速設定，展示以 Buttons 的按鍵、側邊欄筆記、側邊欄命令按鈕與斜線命令等途徑，以**最少**的點擊而達成**快速**的設定。

快速開啟特定設定視窗的關鍵方法是使用 Advanced URI 外掛，以下列語法指定好要操作的儲存庫與 ID，再開啟此網址即可。

[!REF] 語法  
obsidian://advanced-uri?vault = 儲存庫名稱 & settingid = 設定的 ID

有四類設定 ID 可供使用。

###### 1. Obsidian 設定

<table><thead><tr><th>設定 ID</th><th>設定項目</th></tr></thead><tbody><tr><td>editor</td><td>編輯器</td></tr><tr><td>file</td><td>檔案與鏈接</td></tr><tr><td>appearance</td><td>外觀</td></tr><tr><td>hotkeys</td><td>快捷鍵</td></tr><tr><td>about</td><td>關於</td></tr><tr><td>account</td><td>帳戶</td></tr><tr><td>core-plugins</td><td>核心外掛</td></tr><tr><td>community-plugins</td><td>第三方外掛</td></tr></tbody></table>

###### 2. Obsidian 第三方瀏覽

<table><thead><tr><th>設定 ID</th><th>設定項目</th></tr></thead><tbody><tr><td>theme-browser</td><td>主題瀏覽</td></tr><tr><td>plugin-browser</td><td>外掛瀏覽</td></tr></tbody></table>

###### 3. Obsidian 核心外掛選項

<table><thead><tr><th>設定 ID</th><th>設定項目</th></tr></thead><tbody><tr><td>note-composer</td><td>筆記編排器</td></tr><tr><td>backlink</td><td>反向鏈接</td></tr><tr><td>switcher</td><td>快速切換</td></tr><tr><td>command-palette</td><td>命令面板</td></tr><tr><td>daily-notes</td><td>每日筆記</td></tr><tr><td>file-recovery</td><td>檔案還原</td></tr><tr><td>page-preview</td><td>頁面預覽</td></tr></tbody></table>

###### 3.4. 第三方外掛選項

到**儲存庫 /.obsidian/plugins / 外掛 / manifest.json** 找到外掛的 id，例如 Dataview 的內容如下；偷懶點的話，外掛的資料夾名稱通常就是它的 id。

```
{
  "id": "dataview",
  "name": "Dataview",
  "version": "0.4.26",
  "minAppVersion": "0.13.11",
  "description": "Complex data views for the data-obsessed.",
  "author": "Michael Brenan <blacksmithgu@gmail.com>",
  "authorUrl": "https://github.com/blacksmithgu",
  "isDesktopOnly": false
}

```

用 Buttons 外掛製作鏈接式按鈕。用 Various Complements 存放 button 的常用語法以方便輸入。

```
btn-link=>```button\nname $END$\ntype link\naction obsidian://advanced-uri?vault=儲存庫名&settingid=\n```\n^button-\n 
```

[!INFO] 題外話…  
Various Completements 新版本的自訂字典增加了 JSON 格式，上列寫法改寫如下：

```
{ "displayed": "btn-link", 
"value": "```button\nname $END$\ntype link\naction obsidian://advanced-uri?vault=儲存庫名&settingid=\n```\n^button-\n" }, 
``` 

![[!Buttons-settings]]

```
```button
name 開啟快捷鍵
type link
color red
action obsidian://advanced-uri?vault=儲存庫名&settingid=hotkeys
```
^button-settings-hotkeys

```button
name 開啟主題
type link
color green
action obsidian://advanced-uri?vault=儲存庫名&settingid=theme-browser
```
^button-settings-appearnce

```button
name 開啟Shell Command選項
type link
color purple
action obsidian://advanced-uri?vault=儲存庫名&settingid=obsidian-shellcommands
```
^button-settings-shellcmd

```button
name 開啟Shell Command選項
type link
color blue
action obsidian://advanced-uri?vault=儲存庫名&settingid=cmenu-plugin
```
^button-settings-cmenu


```

再將內含 Buttons 按鈕的筆記拖到側邊欄工具列，即可透過此筆記快速開啟特定設定。

將網址設定成 Shell Commands，命令新增後會形成 Obsidian 命令，再用快捷鍵設定其熱鍵。

##### 5.1. 設定命令

開啟設定→第三方外掛→Shell Commands→點擊 New Command 並輸入網址如下：

```
start obsidian://advanced-uri?vault=儲存庫名^&settingid=hotkeys

```

![](https://raw.githubusercontent.com/emisjerry/upgit/master/2022/05/upgit-20220511_1652281789.png)

[!WARNING] 注意

![](https://s.w.org/images/core/emoji/11.2.0/svg/2757.svg)

  
Windows 用 start 執行網址，因為網址裡的`&`符號是 cmd.exe 的命令分隔字元，因此必須在其前面加上跳脫字元`^`(Escape character)  
最終內容：start obsidian://advanced-uri?vault = 儲存庫名 ^&settingid=hotkeys  
加上雙引號後的寫法：start “exec” “obsidian://advanced-uri?vault = 儲存庫名 & settingid=hotkeys”

[!INFO] 資訊  
macOS 的寫法：`open "obsidian://advanced-uri?vault=儲存庫名&settingid=hotkeys"`

[!WARNING] 注意  
網址開頭與結尾的雙引號不能省略

Linux 的寫法：`xdg-open "obsidian://advanced-uri?vault=儲存庫名&settingid=hotkeys"`

##### 5.2. 綁定熱鍵

設定好新命令後，在快捷鍵裡輸入 shell 就能找到命令，指定好熱鍵即可按鍵操作。

在前一個方法使用 Shell Commands 新增好的命令，可以透過 Customizable Sidebar 外掛將之添加到左側邊欄，並且指定圖示以顯示成命令按鈕。

輸入 / 以彈出斜線命令選單，輸入 shell 或 execute 即可過濾出命令，按 Enter 即可執行。  
或者用 Command Alias 外掛賦予縮寫假名以快速調用。

添加新命令到 cMenu 的按鈕。

添加新命令到 Key Sequence Shortcut 的設定檔 kssrc 後，再重新載入。

透過 QuickAdd 調用 Advanced URI 網址。[未實作]

##### 10.1. advanced_uui.js

```
module.exports = advanced_uri;

// 將advnace uri使用的settingid選取好後存入剪貼簿，供Shell Commands以 {{clipboard}}做參數
async function advanced_uri(params) {
  quickAddApi = params.quickAddApi;

  const aTexts =   [ &quot;Hotkeys&quot;, &quot;社群外掛&quot;, &quot;外掛瀏覽器&quot;, &quot;主題瀏覽器&quot;, &quot;Shell Commands&quot;, 
    &quot;QuickAdd&quot;, &quot;cMenu&quot; ];
  const aValues = [ &quot;hotkeys&quot;, &quot;community-plugins&quot;, &quot;plugin-browser&quot;, &quot;theme-browser&quot;, &quot;obsidian-shellcommands&quot;, 
    &quot;quickadd&quot;, &quot;cmenu-plugin&quot; ];
  let choice = await quickAddApi.suggester(aTexts, aValues);
  //console.log(&quot;choice&quot;, choice);

  this.quickAddApi.utility.setClipboard(choice);

  return choice;
} 
```

##### 10.2. 巨集設定

![](https://raw.githubusercontent.com/emisjerry/upgit/master/2022/05/upgit-20220521_1653064126.png)

*   [說明網頁]([Obsidian Advanced URI | Obsidian Advanced URI](https://vinzent03.github.io/obsidian-advanced-uri/))
    *   [Settings Navigation | Obsidian Advanced URI](https://vinzent03.github.io/obsidian-advanced-uri/actions/settings_navigation)
*   [Vinzent03/obsidian-advanced-uri: Advanced modes for Obsidian URI](https://github.com/Vinzent03/obsidian-advanced-uri)

<table><thead><tr><th>外掛名稱</th><th>功能簡述</th><th>安裝方法</th><th>YouTube 網址</th></tr></thead><tbody><tr><td>Advanced URI</td><td>進階 Obsidian 網址</td><td>第三方外掛</td><td><a target="_blank" href="https://youtu.be/I5rOIdQGRo8" rel="noopener noreferrer nofollow">鏈接</a></td></tr><tr><td>Buttons</td><td>功能按鈕</td><td>第三方外掛</td><td><a target="_blank" href="https://youtu.be/28lViQzpnc0" rel="noopener noreferrer nofollow">鏈接 1</a><br><a target="_blank" href="https://youtu.be/KWDaK9TyFfE" rel="noopener noreferrer nofollow">鏈接 2</a></td></tr><tr><td>Shell Commands</td><td>作業系統命令</td><td>第三方外掛</td><td><a target="_blank" href="https://youtu.be/I5rOIdQGRo8" rel="noopener noreferrer nofollow">鏈接</a></td></tr><tr><td>Customizable Sidebar</td><td>側邊欄設定</td><td>第三方外掛</td><td><a target="_blank" rel="noopener noreferrer"></a></td></tr><tr><td>Command Alias</td><td>命令別名</td><td>手動安裝 (或使用 BRAT)</td><td><a target="_blank" rel="noopener noreferrer"></a></td></tr><tr><td>cMenu</td><td>工具列</td><td>第三方外掛</td><td><a target="_blank" rel="noopener noreferrer"></a></td></tr><tr><td>Key Sequence Shortcut</td><td>自訂熱鍵視窗</td><td>第三方外掛</td><td><a target="_blank" href="https://youtu.be/kJg3agf4n2k" rel="noopener noreferrer">鏈接</a></td></tr><tr><td>Various Complements</td><td>自訂熱字串自動補全</td><td>第三方外掛</td><td><a target="_blank" href="https://youtu.be/wETtIAFFcfw" rel="noopener noreferrer nofollow">鏈接</a></td></tr></tbody></table>

＃＃

#### 您可能也會有興趣的類似文章

*   [[Obs＃35] Buttons 外掛開啟筆記自動化操作契機
    
    ![](https://s.w.org/images/core/emoji/11.2.0/svg/2049.svg)
    
    ](https://jdev.tw/blog/6641/obsidian-plugin-buttons-for-automation "2021/04/23")(0 則留言, 2021/04/23)
*   [[Obs＃58] 快速開啟常用筆記的方法](https://jdev.tw/blog/6908/open-obsidian-frequently-used-note-rapidly "2021/10/23") (0 則留言, 2021/10/23)
*   [[Obs＃42] Buttons 外掛 0.4.5 新功能](https://jdev.tw/blog/6677/obsidian-plugin-buttons-0-4-5 "2021/05/19") (0 則留言, 2021/05/19)
*   [[Obs＃86] 分享與編輯器相關的 21 個 Obsidian 外掛](https://jdev.tw/blog/7102/21-obsidian-plugins-for-editor "2022/05/08") (0 則留言, 2022/05/08)
*   [[Obs#15] 在筆記裡複製、使用 obsidian 網址與工作空間的使用](https://jdev.tw/blog/6454/copy-obsidian-url-and-workspace "2020/10/27") (0 則留言, 2020/10/27)
*   [[Obs＃56] 快速新增靈感／閃念筆記 (Fleeting Note) 的 3 種方法](https://jdev.tw/blog/6863/obsidian-add-fleeting-note-quickly "2021/10/10") (0 則留言, 2021/10/10)
*   [[Obs#17] Obsidian 表格操作技巧—使用 Advanced Tables 外掛](https://jdev.tw/blog/6466/obsidian-advanced-tables "2020/11/07") (2 則留言, 2020/11/07)
*   [[Obs＃51] QuickAdd 全攻略 (2)：腳本撰寫與巨集使用要點](https://jdev.tw/blog/6821/obsidian-quickadd-scripts-and-macros "2021/09/18") (0 則留言, 2021/09/18)
*   [[Obs＃78] 輔助 Markdown 初學者的利器：Markdown Shortcuts 與 cMenu](https://jdev.tw/blog/7048/markdown-shortcuts-and-cmenu "2022/03/27") (0 則留言, 2022/03/27)
*   [[Obs＃59] Obsidian 快速開啟常用筆記（2）：不使用外掛的簡單方法](https://jdev.tw/blog/6914/obsidian-create-hot-notes-rapidly "2021/10/27") (0 則留言, 2021/10/27)
*   [Obsidian(黑曜石) 高亮度顯示或變更文字顏色的 3 種方法](https://jdev.tw/blog/6329/obsidian-md-text-highlight "2020/07/01") (4 則留言, 2020/07/01)
*   [[Obs＃91] 用 Dashboard++ CSS 片段建立 Obsidian 儲存庫首頁](https://jdev.tw/blog/7173/dashboard-plus-plus-css-snippetgs "2022/06/18") (0 則留言, 2022/06/18)
*   [Obsidian (黑曜石) 筆記軟體的基本操作指引](https://jdev.tw/blog/6319/obsidian-users-guide "2020/06/23") (0 則留言, 2020/06/23)
*   [[Obs#7] Obsidian(黑曜石) 多重游標的操作與兩個 CSS 樣式](https://jdev.tw/blog/6350/obsidian-md-multiple-cursors "2020/07/13") (0 則留言, 2020/07/13)
*   [[Obs-74] 和外掛相關的外掛─BRAT: 搶先體驗未上架外掛；Settings Search: 加速搜尋外掛設定](https://jdev.tw/blog/7034/brat-and-settings-search "2022/03/05") (0 則留言, 2022/03/05)