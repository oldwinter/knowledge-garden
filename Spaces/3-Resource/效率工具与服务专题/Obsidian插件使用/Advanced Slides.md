---
date created: 2022-06-09
date modified: 2023-03-14
title: Advanced Slides
当前使用频率: 3
当前是否还在使用: yes
---
xxx:: [[两仪.md|两仪]]

[[advanced-slides-templates模板1]]

用上其template的能力，才能发挥它的高效作用。否则还是直接用图形化工具更方便。

```slide
{
	slide: [[advanced-slides-templates模板1]],
	page: 3
}
```

```slide
{
	slide: [[advanced-slides-templates模板2]],
	page: 4
}
```

![[advanced-slides_image_1.svg]]

---

<canvas data-chart="line" >
<!--
{
 "data": {
  "labels":["January"," February"," March"," April"," May"," June"," July"],
  "datasets":[
   {
	"data":[65,59,80,81,56,55,40],
	"label":"My first dataset","backgroundColor":"rgba(20,220,220,.8)"
   },
   {
	"data":[28,48,40,19,86,27,90],
	"label":"My second dataset","backgroundColor":"rgba(220,120,120,.8)"
   }
]
 }
}
-->
</canvas>

---

--- %% fold %%

aliases: markdown 格式的 ppt, slides 学习笔记教程, reveal.js 教程

tags:

theme: white  

width: 960

---

## 为啥用 markdown 方式的 ppt

双向引用，直接 ppt 还有个好处，就是双向同步，不会改了这忘了那

还有 [[slidev]]正在开发中，等成熟了和[[revealjs]] 综合对比看看。^4f22e2

## 奇技淫巧

[[advanced slides奇技淫巧]]

## 插件简介 %% fold %%

这个插件就是魔改的 [reveal.js](https://revealjs.com/)，和 obsidian 进行了更好地融合。  
官方文档 [Advanced Slides Documentation (mszturc.github.io)](https://mszturc.github.io/obsidian-advanced-slides/getting-start/)

> We follow the philosophy of `convention over configuration`, which means that in most cases it is sufficient to simply write a Slide in**Obsidian Markdown syntax**.

%% 我用的目的，应该就是基于现有的结构化的文档，进行分钟级的低时间成本改造，立马就可以达到 ppt 效果。%%

---

## 基本使用 %% fold %%

--

### Links %% fold %%

- 默认的两个中括号，它不识别，如果需要呈现跳转链接，需要用回传统的 markdown 的中括号加小括号的方式。[Link to note](obsidian://open?path=D:%2Fpath%2Fto%2Ffile.md)
  --

### 表格 %% fold %%

| a | b | c |
| ------ | -------- | --- |
| d | e | f |
| 大一点 | 自动缩放 | 会不会 |

--

### 代码支持 %% fold %%

```shell
git clone https://
```

按点击顺序依次高亮代码

```javascript [1-2|4]
let a=0
let b=1
let c=3
var d=5
```

[[advanced slides奇技淫巧]]

---

## 高级使用

--

### 垂直分页 %% fold %%

刚才已经用到，用 2 个 - 分割开就行

--

### 引入单元素的 css %% fold %%

text with border <!-- element class="with-border" -->

text with background <!-- element style="background:blue" -->

text with attribute <!-- element data-toggle="modal" -->

--

### 单页 ppt 的 css 全局样式控制 %% fold %%

<!-- .slide: style="background-color: coral;" -->

这一页的主题被控制

--

### 单页 ppt 划分成 block，进行细粒度 css 样式控制 %% fold %%

:::

块 1

	:::

	块 2

	:::

:::

:::

块 3

块 3

可见生效方式要有前和尾形成闭合

:::

--

### 单页内的元素出现和消失的控制 %% fold %%

Fade in <!-- element class="fragment" -->

Fade out <!-- element class="fragment fade-out" -->

Highlight red <!-- element class="fragment highlight-red" -->

Fade in, then out <!-- element class="fragment fade-in-then-out" -->

Slide up while fading in <!-- element class="fragment fade-up" -->

--

点击按顺序出现

- Appear Fourth <!-- element class="fragment" data-fragment-index="4" -->
- Appear Third <!-- element class="fragment" data-fragment-index="3" -->
- Appear Second <!-- element class="fragment" data-fragment-index="2" -->
- Appear First <!-- element class="fragment" data-fragment-index="1" -->

  --

### 单页内的元素用 css 的 style 语法控制样式 %% fold %%

<style>
	.with-border{

border: 1px solid red;

	}
</style>

styled text <!-- element class="with-border" -->

--

也可以引入 css 文件，但我应该用不到，没必要搞这么复杂的样式。

```md
前后要加---，相当于放在metadata里面
css: [css/layout.css,css/customFonts.css]
```

--

### 单页的背景控制，这很有用 %% fold %%

<!-- .slide: data-background="#ff0000" -->

### Slide with hex based background %% fold %%

--

<!-- slide bg="https://picsum.photos/seed/picsum/800/600" -->
- ### Slide with image background

  --

### 演讲者视图 %% fold %%

浏览器打开后，按 s，

note:

note 之后，就是演讲者自己的笔记和注释

--

### 最简单的控制元素进场顺序 %% fold %%

用 + 号和）号。实时阅览模式，➕会被自动变成圆，这里得换成编辑模式

- aaa %% fold %%
  - bbb
  - ccc

  --

### 打开 excalidraw 导出开关，这边用 svg 或 png %% fold %%

![[advanced-slides_image_1.svg|500]]

--

### 各种 icon 和动画 %% fold %%

要引入 html 和 css，过于麻烦，以后有需要再说：

[Advaced Slides Documentation (mszturc.github.io)](https://mszturc.github.io/obsidian-advanced-slides/extend-syntax/fontawesome/)

---

## 版面和布局 - 分割元素

--

<split even>

![](https://img2.oldwinter.top/advanced-slides_image_2.jpg)

![](https://img2.oldwinter.top/advanced-slides_image_3.jpg)

![](https://img2.oldwinter.top/advanced-slides_image_4.jpg)

</split>

--

<split even gap="3">

**Lorem Ipsum**is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s

when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap

into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem

</split>

--

<split left="2" right="1" gap="2">

**Lorem Ipsum**is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s

when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap

into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem

</split>

--

<split wrap="4">

![](https://img2.oldwinter.top/advanced-slides_image_3.jpg)

![](https://img2.oldwinter.top/Extras/Media/250-4.jpg)

![](https://img2.oldwinter.top/Extras/Media/250.jpg)

![](https://img2.oldwinter.top/advanced-slides_image_2.jpg)

![](https://img2.oldwinter.top/advanced-slides_image_3.jpg)

![](https://img2.oldwinter.top/Extras/Media/250-2.jpg)

</split>

--

<split no-margin>

![](https://img2.oldwinter.top/Extras/Media/250-2.jpg)

![](https://img2.oldwinter.top/advanced-slides_image_2.jpg)

![](https://img2.oldwinter.top/Extras/Media/250-8.jpg)

![](https://img2.oldwinter.top/Extras/Media/250-5.jpg)

![](https://img2.oldwinter.top/advanced-slides_image_2.jpg)

![](https://img2.oldwinter.top/Extras/Media/250-6.jpg)

![](https://img2.oldwinter.top/advanced-slides_image_2.jpg)

![](https://img2.oldwinter.top/advanced-slides_image_2.jpg)

</split>
--

有很多高级的格式和技巧，需要用到的时候再学习。

[Advaced Slides Documentation (mszturc.github.io)](https://mszturc.github.io/obsidian-advanced-slides/extend-syntax/slides/)

---

## 版面和布局 - 网格分布 %% fold %%

--

<grid drag="60 55" drop="5 10" bg="red">

60 x 55

</grid>

<grid drag="25 55" drop="-5 10" style=bg="green">
25 x 55
</grid>

<grid drag="90 20" drop="5 -10" bg="gray">
90 x 20
</grid>

--

<grid drag="40 30" drop="topleft" bg="red">

Top Left

</grid>

<grid drop="right" bg="green">

Right with default size

</grid>

<grid drag="80 30" drop="bottom" bg="coral">

Bottom

</grid>

--

<grid drag="40 100" drop="center" bg="coral" flow="col">

Heading

![[Image.jpg]]

**Lorem Ipsum**is simply dummy text

</grid>

--

<grid drag="100 40" drop="center" bg="coral" flow="row">

Left

![[Image.jpg]]

**Lorem Ipsum**is simply dummy text

</grid>

--

<grid drag="55 50" drop="topleft" bg="orange">

### Make

</grid>

### Noise <!-- element drag="55 50" drop="bottomright" bg="rgb(0,0,0)"--> %% fold %%

<grid drag="25 20" drop="center" bg="green" rotate="-15">

### some

</grid>

--

<grid drag="30 25" drop="left" border="thick dotted blue">

thick dotted blue

</grid>

<grid drag="30 25" drop="center" border="4px solid white">
20px solid white
</grid>

thick dotted blue <!-- element drag="30 25" drop="right" border="medium dashed red"-->

--

<grid drag="50 50" drop="-12 -25" bg="white" filter="grayscale()">

![[Image.jpg]]

</grid>

Text is too blurry <!-- element drag="30 25" drop="5 15" bg="#B565A7" filter="sepia(10px)" -->

--

有需要用到再学，这块儿还是要花点时间，有很多参数可以配置

---

## 主题和配置 %% fold %%

--

在 metadata 里面加 theme:

```
-   black (default)
-   white
-   league
-   beige
-   sky
-   night
-   serif
-   simple
-   solarized
-   blood
-   moon
-   css/mattropolis.css
```

--

metadata 有各种参数可以控制主题
