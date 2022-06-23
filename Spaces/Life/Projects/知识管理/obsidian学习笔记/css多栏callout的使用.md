---
feed: show
content-type: notes
aliases: 
tags: 
cssClass: two-column-list
date: 2022-06-23
title: css多栏callout的使用
date created: 2022-06-09
---

[[Obs＃83] 多欄式Callouts! 華麗變身成N欄區塊～ - YouTube](https://www.youtube.com/watch?v=sEogbW4UGYo)

MCL Multi Column.css 是一個不到 8KB 大小的 CSS 檔，只要存入儲存庫**.obsidian/snippets**資料夾並在外觀裡啟用此 CSS 片段，就能以下列方法呈現更多變化：

1. 多欄式呈現筆記的 Callouts 內容
2. 指定 Callouts 的顯示大小與浮動位置 (浮動位置在閱讀模式生效)
3. 將無序列表變成多欄顯示 (在閱讀模式生效，Callouts 裡也會生效)

> [!info] MCL?  
> MCL 是「Modular CSS Layout」的縮寫

### [1. 多欄式Callouts](http://jdev.tw/blog/7080#top "Back to top")

> [!tip] Callouts 類型  
> 1. 顯示標題列：> [!multi-column]  
> 2. 隱藏標題列：> [!blank-container]
>
> [!tip] 使用方法  
> 1. 欄位間用一個 > 分隔  
> 2. 每個 Callout 區塊多增加一個 >  
> 3. 欄位數由 2 到 N，只要螢幕寬度足夠，會自動分配欄寬  
> 4. **可使用 Style Settings 外掛設定**

![01](https://raw.githubusercontent.com/emisjerry/upgit/master/2022/04/upgit-20220423_1650685342.png)

#### 1.1. 兩欄

> [!multi-column]
>
>> [!note]+ 待辦事項
>> your notes or lists here. using markdown formatting
>
>> [!warning|right-small]+ 進行中事項
>> your notes or lists here. using markdown formatting

### [1.2. 三欄](http://jdev.tw/blog/7080#top "Back to top")

> [!multi-column]
>
>> [!note]+ 待辦事項
>> your notes or lists here. using markdown formatting
>
>> [!warning]+ 進行中事項
>> your notes or lists here. using markdown formatting
>
>> [!success]+ 已完成事項
>> your notes or lists here. using markdown formatting

#### 1.3. 三欄

![01|700](https://raw.githubusercontent.com/emisjerry/upgit/master/2022/04/upgit-20220423_1650685415.png)

> [!multi-column]
>
>> [!note]+ 待辦事項
>> * Item 1
>>    * Item 1-1
>>    * Item 1-2
>>    * Item 1-3
>>
>>> [!EXAMPLE] 範例
>>> ```
>>> String msg = "Hello, world!";
>>> ```
>
>> [!warning]+ 進行中事項
>> 使用圖片：
>> ![[Obs＃83 多欄式Callouts! 直接套用CSS片段變身N欄～ image 1.png]]
>
>> [!success]+ 已完成事項
>> 使用影片：
>>
>> [用Obsidian學會Markdown|embded](https://youtu.be/lnsQsFCYhNc)

#### 1.4. 四欄

![01|700](https://raw.githubusercontent.com/emisjerry/upgit/master/2022/04/upgit-20220423_1650685499.png)

> [!multi-column]
>
>> [!note]+ 待辦事項
>> your notes or lists here. using markdown formatting
>
>> [!warning]+ 進行中事項
>> your notes or lists here. using markdown formatting
>
>> [!success]+ 已完成事項
>> your notes or lists here. using markdown formatting
>
>> [!info]+ 說明
>> your notes or lists here. using markdown formatting

#### 1.5. 五欄

> [!multi-column]
>
>> [!note]+ 待辦事項
>> your notes or lists here. using markdown formatting
>
>> [!warning]+ 進行中事項
>> your notes or lists here. using markdown formatting
>
>> [!success]+ 已完成事項
>> your notes or lists here. using markdown formatting
>
>> [!info]+ 說明
>> your notes or lists here. using markdown formatting
>
>> [!quote]+ 引用
>> your notes or lists here. using markdown formatting

#### 1.6. 六欄

> [!multi-column]
>
>> [!note]+ 待辦事項
>> your notes or lists here. using markdown formatting
>
>> [!warning]+ 進行中事項
>> your notes or lists here. using markdown formatting
>
>> [!success]+ 已完成事項
>> your notes or lists here. using markdown formatting
>
>> [!info]+ 說明
>> your notes or lists here. using markdown formatting
>
>> [!quote]+ 引用
>> your notes or lists here. using markdown formatting
>
>> [!error]+ Expired!
>> your notes or lists here. using markdown formatting

#### 1.7. 隱藏標題列

> [!multi-column]
>
>> [!blank-container]+ 待辦事項
>> * Item 1
>>    * Item 1-1
>>    * Item 1-2
>>    * Item 1-3
>> * Item 2
>>> [!EXAMPLE] 範例
>>> ```
>>> String msg = "Hello, world!";
>>> ```
>
>> [!blank-container]+ 進行中事項
>> 使用圖片：
>> ![[Obs＃83 多欄式Callouts! 直接套用CSS片段變身N欄～ image 1.png]]
>
>> [!blank-container]+ 已完成事項
>> 使用影片：
>>
>> [用Obsidian學會Markdown](https://youtu.be/lnsQsFCYhNc)

### [2. 指定Callouts大小與浮動位置](http://jdev.tw/blog/7080#top "Back to top")

> [!error|right-small] 浮動到右側
> 小視窗，靠右

擴充 Callouts 的語法，在 Callout 類型後加上 Pipe，再輸入下列設定：

> [!tip] 語法
>
> > [!Callout 類型|left/right-small/medium/large]  
> > [!blank-container|left/right-small/medium/large]

### [3. 多欄式列表](http://jdev.tw/blog/7080#top "Back to top")

> [!tip] 使用說明  
> 1. YAML 區加入 `cssClasses: 多欄CSS` 即會自動顯示成指定的欄數  
> 2. 多欄 CSS 有下列幾種：
>
> > 1.  two-column-list: 垂直填充
> > 2.  three-column-list: 垂直填充
> > 3.  two-column-grid-list: 水平填充
> > 4.  three-column-grid-list: 水平填充

### [4. 相關鏈接](http://jdev.tw/blog/7080#top "Back to top")

- [efemkay/obsidian-modular-css-layout: CSS Layout hack for Obsidian.md](https://github.com/efemkay/obsidian-modular-css-layout)
- [MCL Multi Column.css](https://github.com/efemkay/obsidian-modular-css-layout/blob/main/MCL%20Multi%20Column.css)
