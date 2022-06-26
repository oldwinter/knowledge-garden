---
feed: show
content-type: notes
date: 2022-06-23
title: dataview常用使用示例范例
date created: 2022-06-21
---

统计整个库的数据：

```dataviewjs
let allFiles = dv.pages()

dv.paragraph(`总共有 **${allFiles.length}** 个文件`)

dv.paragraph(`==标签== **${allFiles.file.tags.distinct().length}** 个`)
dv.paragraph(`==文件夹数== **${allFiles.file.folder.distinct().length}** 个`)
dv.paragraph(`==正向链接== **${allFiles.file.outlinks.length}** 个`)
dv.paragraph(`==反向链接== **${allFiles.file.inlinks.length}** 个`)

let mocFiles = dv.pages("#MOC")
let tocFiles = dv.pages("#TOC")

dv.paragraph(`总共有==MOC文件== **${mocFiles.length}** 个，==TOC文件== **${tocFiles.length}** 个`)

```

通过这种用法，也许能写出根据标题自动生成 mermaid 的代码

```dataviewjs
var y = "2022"
var m = Array(12).fill(0).map(function(v,i){return i});
var d = [31,29,31,30,31,30,31,31,30,31,30,31]

for(let i of m)
{
    var n = Array(d[i]).fill(0).map(function(v,i){return i+1});
    var data = Array(d[i]).fill(0);

    for(let j of dv.pages().filter(p=>String(p.file.cday).split("-")[0]==y && String(p.file.cday).split("-")[1]==i+1).groupBy(p=>String(p.file.cday).split("-")[2].slice(0,2)))
         data[j.key-1] = dv.pages().filter(p=>String(p.file.cday).split("-")[2].slice(0,2)==j.key).length;

    if(data.every(p=>p==0))
        continue
    dv.header(4, i+1+"月");
    dv.paragraph(`\`\`\`chart
type: line
labels: [${n}]
series:
- title: 200-笔记
  data: [${data}]
labelColors: true
\`\`\``)
}
```
[[dataview常用使用示例范例]]


```dataviewjs
const getNestedObject = (nestedObj, pathArr) => {
    return pathArr.reduce((obj, key) =>
        (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
}

function getHotkey(arr) {
    return arr.hotkeys ? [[getNestedObject(arr.hotkeys, [0, 'modifiers'])],
    [getNestedObject(arr.hotkeys, [0, 'key'])]].flat(2).join('+').replace('Mod', 'Ctrl') : '–';
}

let cmds = dv.array(Object.entries(app.commands.commands))
    .where(v => getHotkey(v[1]) != '–')
    .sort(v => v[1].id, 'asc')
    .sort(v => getHotkey(v[1]), 'asc');

dv.paragraph(cmds.length + " commands with assigned hotkeys.<br><br>");

dv.table(["Command ID", "Name in current locale", "Hotkeys"],
  cmds.map(v => [
    v[1].id,
    v[1].name,
    getHotkey(v[1]),
    ])
  );
 
```