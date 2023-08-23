---
aliases:
  - Dataviewjs
date created: 2022-06-09
date modified: 2023-03-14
title: Dataview
当前是否还在使用: yes
当前使用频率: 5
---

## 本质

[[frontmatter]]本质就是表格的一列列属性。dataview的本质就是表格的filter筛选功能。

## 调试技巧

打开调试控制台，在dataviewjs里面可以直接console.log，以查看所有变量。目前还没找到比较好的智能提示代码的方法。先这样将就用。如下，打开调试控制台，可以看到，打印出了obsidian系统api自带的全部方法和变量。

```dataviewjs
const test = this.app;

console.log(test);

dv.el("b", "打开调试控制台看数据");
```

## 感悟

dataview 的牛逼之处，在于它让我们成为自己笔记库的大数据分析师。不管我们创建的数据有多么杂乱，往往根据自己的思维方式所创建出文件的『文件夹、标签、链接』出现一定的范式而变得有迹可循，再配合上创建时间修改时间等信息，从自己的笔记海洋中抓取自己想要的数据，变得简单。这也是 [[自下而上]]的方法必须要配套的[[工具和方法论]]。

官网：

[GitHub - blacksmithgu/obsidian-dataview: A high-performance data index and query language over Markdown files, for https://obsidian.md/.](https://github.com/blacksmithgu/obsidian-dataview)

## 简单的 dataview 语法

[Queries - Dataview](https://blacksmithgu.github.io/obsidian-dataview/query/queries/)

## 常用范例

[[dataviewjs常用使用示例范例]]

[[dataview常用使用示例范例]]

[[可能在ob会用一辈子的dataview代码]]

## dataviewjs 的参考资料

[[鸟姐的dataviewjs技巧]]  
[ObsidianDataview文档中文 - 知乎](https://www.zhihu.com/column/c_1504479637841866752)

[Obsidian 插件之 Dataview - 少数派 (sspai.com)](https://sspai.com/post/68183)

dataviewjs 可以实现更灵活的语法，比如表格插入一个自增长的变量，实现表格的 No 行号显示效果。

dataviewjs 社区有很多酷炫的玩法和现有代码，当要用的时候，先去找找看，别自己造轮子。

dataview 有种数据挖掘的感觉。通过不同角度分析和挖掘自己的大脑曾经的思考轨迹和路径。

## dataviewjs 的内置函数与变量

[[dataview的数据来源]]

不支持代码智能联想，只能手动记忆或查表。

[Codeblock Reference - Dataview](https://blacksmithgu.github.io/obsidian-dataview/api/code-reference/)

## Query

### 预备数据：

测试 dataviewjs 的查询效果，勿删

测试 outlinks[[test]]

### 代码

相当于获取 dataview 对象的内部数据，然后需要通过 Render 函数，类似 console.log 打印出来，才能看到。

目前看，只能根据 tag、文件夹、路径/文件名这几个属性 query 页面 pages

```dataviewjs
// ## Query

let a = dv.current()
dv.paragraph(a);
  
let b = dv.pages("#test")
dv.paragraph(b);
//每个pages的详情都会显示，所以打印出来会很卡，要保证查询范围足够窄
//dv.pages() => all pages in your vault

//dv.pages("#review") => all pages with tag 'books'

//dv.pages('"journals"') => all pages from folder "folder"

//dv.pages("#MOC or -#todo") => all pages with tag #yes, or which DON'T have tag #no

//dv.pages('"journals" or #MOC') => all pages with tag #tag, or from folder "folder"

//

//dv.pagePaths("#review") => the paths of pages with tag 'books'

//

//dv.page("最近编辑、最近创建、最近任务.md") => The page object for /Index

//dv.page("pages/contents.md") => The page object for /books/The Raisin.md

```

## Render

就是将数据打印 print 出来

```dataviewjs
// ## Render

dv.el("b", "This is some bold text");
dv.header(1, "Big!");
dv.header(6, "Tiny");
dv.paragraph("This is some text");
dv.span("This is some text");

```

## Dataviews

dataviews 和 notion 的 dataview 类似，打印展示 table、list、tasklist 等视图。

相当于是前面获取了 pages 以后，这里对 pages 进行 profile 处理，获取自己关心的一些属性，参照前面打印出来的属性值即可，比如 tags、etags、cdate

获取到的是 promise，render 函数相当于阻塞获取数据，以及 where 函数相当于是传入一个筛选功能的函数

taskList 起到了 render 函数同样的作用。

```dataviewjs
// ## Dataviews

let a = dv.list([1, 2, 3]) // => list of 1, 2, 3
dv.paragraph(a);

//dv.list(dv.pages().file.name) => list of all file names
//dv.list(dv.pages().file.link) => list of all file links
//dv.list(dv.pages("#book").where(p => p.rating > 7)) => list of all books with rating greater than 7
//
//// List all tasks from pages marked '#project'
//dv.taskList(dv.pages("#project").file.tasks)
//
//// List all *uncompleted* tasks from pages marked #project
let b = dv.taskList(dv.pages().file.tasks)
//.where(t => !t.completed));

//
//// List all tasks tagged with '#tag' from pages marked #project
//dv.taskList(dv.pages("#project").file.tasks
//    .where(t => t.text.includes("#tag")))
//
//

// Render a simple table of book info sorted by rating.
dv.table(["File", "mday", "cday", "tags"], dv.pages("#review")
    .sort(b => b.mday)
    .map(b => [b.file.name, b.file.mday, b.file["cday"], b.tags]))

```

## Utility

相当于提供了一些通用函数进行便捷 utils 处理。

```javascript
// ## Utility

dv.array([1, 2, 3]) => dataview data array [1, 2, 3]

dv.isArray(dv.array([1, 2, 3])) => true
dv.isArray([1, 2, 3]) => true
dv.isArray({ x: 1 }) => false

dv.date("2021-08-08") => DateTime for August 8th, 2021
dv.date(dv.fileLink("2021-08-07")) => dateTime for August 8th, 2021

dv.compare(1, 2) = -1
dv.compare("yes", "no") = 1
dv.compare({ what: 0 }, { what: 0 }) = 0
```

## File IO

必须阅读模式下才生效，实时阅览模式下会报错

```dataviewjs
// ## File I/O

//await dv.io.csv("hello.csv") => [{ column1: ..., column2: ...}, ...]

let a = await dv.io.load("pages/contents.md") // => "# File\nThis is an example file..."
dv.paragraph(a);
// dv.io.normalize("Test") => "dataview/test/Test.md", if inside "dataview/test"
// dv.io.normalize("Test", "dataview/test2/Index.md") => "dataview/test2/Test.md", irrespective of the current file
```

## Query Evaluation

貌似没啥用

```

// ## Query Evaluation

dv.tryEvaluate("2 + 2") // => 4
// dv.tryEvaluate("x + 2", {x: 3}) => 5
// dv.tryEvaluate("length(this.file.tasks)") => number of tasks in the current file

// dv.evaluate("2 + 2") => Successful { value: 4 }
// dv.evaluate("2 +") => Failure { error: "Failed to parse ... " }


```

## example

```dataviewjs
for (let group of dv.pages("#todo").groupBy(p => p.genre)) {
    let a = 1;
    dv.header(3, group.key);
    dv.table(["Name", "Time Read", "Rating","No"],
        group.rows
            .sort(k => k.rating, 'desc')
            .map(k => [k.file.link, k["time-read"], k.rating, a++]))
}

```

### 未完成 tasks

```dataview
task from #projects/active
```

```dataviewjs
dv.taskList(dv.pages().file.tasks.where(t => !t.completed));
```

### 已完成 tasks

```dataviewjs
dv.taskList(dv.pages('"/" and -"pages/500 - ARCHIVE"').file.tasks.where(t => t.completed));
```
