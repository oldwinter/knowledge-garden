---
date created: 2022-06-09
date modified: 2023-03-14
title: Callout
---

## obsidian自带 callout

[Use callouts - Obsidian Help](https://help.obsidian.md/How+to/Use+callouts)

用 co- 前缀，通过 [[Various Complements]] 变量自动补全插件自动触发。配置文件：[[dict]]。

### 提示框类型

>[!note]  
> Here's a callout block.  
> It supports**markdown**and [[Internal link|wikilinks]].

>[!abstract]

>[!todo]

>[!info]

>[!tip]

>[!success]

>[!question]

>[!warning]

>[!failure]

>[!danger]

>[!bug]

>[!example]

>[!quote]

除了info 类型还支持以下类型

- note
- abstract, summary, tldr
- info, todo
- tip, hint, important
- success, check, done
- question, help, faq
- warning, caution, attention
- failure, fail, missing
- danger, error
- bug
- example
- quote, cite

### 提示框的各种用法

1. 可以没有内容直接显示标题

>[!TIP]Callouts can have custom titles, which also supports**markdown**!

2. 折叠提示框

>[!FAQ]- Are callouts foldable?  
> Yes! In a foldable callout, the contents are hidden until it is expanded.

3. 自定义提示框  
可以通过css设置my-callout-type 的样式

```css
.callout[data-callout="my-callout-type"] {
    --callout-color: 0, 0, 0;
    --callout-icon: icon-id;
    --callout-icon: '<svg>...custom svg...</svg>';
}
```

## shimmering主题自带的callout

### Custom Callouts

#### [](https://chrisgrieser.github.io/shimmering-focus/css-classes/#special-callouts)SPECIAL CALLOUTS

The Sidenote Callout width (宽度) and outdention is customizable (定制) in the Style Settings.

>[!SIDENOTE]  
> aaa

#### STANDARD CALLOUTS

>[!LINK]

>[!URL]

>[!MAIL]

>[!EMAIL]

>[!FILE]

>

>[!ATTACHMENT]

>[!PHONE]

>[!GOAL]
