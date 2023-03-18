---
title: Various Complements插件各项配置探索
date created: 2023-03-05
date modified: 2023-03-14
---

官方文档：[Home - Various Complements (tadashi-aikawa.github.io)](https://tadashi-aikawa.github.io/docs-obsidian-various-complements-plugin/)

## 当前发现的一个bug

中文输入法直接上屏英文，则不会自动出匹配结果，比如直接输入python按回车后，没有匹配项。补救措施就是再敲一个空格，再删除，就有匹配结果了。

## Main

- 经测试，“Match strategy”选项的partial更有用，性能也没有低很多，推荐结果都是秒出的。
- fuzzy match对中文场景应该无效，可以匹配英文，比如jakk，能匹配出jackkk。
- ⚙️Max number of words as a phrase，意思是是否将一个词组进行匹配，比如 i love you，正好3个词，就默认3就挺好了。
- "Disable suggestions during lME on"选项要开，因为中文输入法。
- "Insert space after completion"选项要关闭，因为中文都是连字的。

## key customization

- ⚙Disable the up/down keys for cycle through suggestions keys，要打开，不然上下移动光标很不方便，会被影响。但这样配置之后，就需要配置如何选词了。
- Additional cycle through suggestions keys，选择tab。

当前配置，需要习惯一段时间。  
![[Pasted image 20230305120820.png]]

## current file complement

由于中文的特殊性，如果每个字都去索引当前文件的话，每输入一个字都可能有索引，所以将索引阈值从0设置为3，中文一般3个字开始，就有其内涵了。

经测试，这里的characters，如果设置为3，就是指的中文字数为3。

或者干脆不要中文索引，只让其索引英文。

## current vault complement

扫描整个库给出的匹配。目前用下来，感觉Chinese策略默认的2个字符有很多干扰项，调成3个可以减少很多干扰项，但是总体感觉干扰项还是不少，我考虑关闭这个功能。

## custom dictionary complement

自带的英文词典感觉没必要，不如直接用输入法自带的英文词库，所以我删除了，但备份一下：

```
https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english-no-swears.txt
```

其次自定义一个[[Callout|Callout]]满足日常使用即可。然后用co-字符唤出callout。

## Internal link complement

## front matter complement

由于我自动往[[frontmatter]]里面加入了titile，所以这边会有几万个选项，用起来并不方便。

更多的时候，是想快如插入tags，那么可以前面输入#来触发选词，接着[[Linter]]插件会帮我们自动去掉#。
