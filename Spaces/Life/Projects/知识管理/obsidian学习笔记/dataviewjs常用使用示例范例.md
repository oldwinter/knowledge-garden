---
feed: show
content-type: notes
date: 2022-06-26
title: dataviewjs常用使用示例范例
date created: 2022-06-21
---

x:: [[dataview常用使用示例范例]]

## 统计整个库的数据：

[[整个库的统计数据 - dataview]]

## 通过这种用法，也许能写出根据标题自动生成 mermaid 的代码

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
