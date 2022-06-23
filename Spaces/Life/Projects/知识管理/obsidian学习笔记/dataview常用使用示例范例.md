---
feed: show
content-type: notes
date: 2022-06-23
title: dataview常用使用示例范例
date created: 2022-06-21
---

统计整个库的数据：

```dataviewjs
var i = [dv.pages().length, 
					dv.pages("#MOC").length,
					dv.pages("#TOC").length,
	        dv.pages().file.tags.distinct().length,
	        dv.pages().file.folder.distinct().length,
	        dv.pages().file.outlinks.length,
	        dv.pages().file.inlinks.length]
	        
dv.paragraph(`总共有 **${i[0]}** 个文件`)
//dv.paragraph(`其中孤立文件 **${i[0]}** 个`)
//dv.paragraph(`其中 **${i[0]}** 个文件`)


dv.paragraph(`其中==MOC文件== **${i[1]}** 篇，==TOC文件== **${i[2]}** 篇`)
dv.paragraph(`==标签== **${i[3]}**个`)
dv.paragraph(`==文件夹数== **${i[4]}**个`)
dv.paragraph(`==正向链接== **${i[5]}**个`)
dv.paragraph(`==反向链接== **${i[6]}**个`)
```

HeatmapCalendar:

```dataviewjs
const calendarData = { 
	entries: [], // Populated in the DataviewJS loop below
	year: 2022,  // (optional) Defaults to current year
	colors: {    // (optional) Defaults to green
	  blue:        ["#8cb9ff","#69a3ff","#428bff","#1872ff","#0058e2"], // first entry is considered default if supplied
	  green:       ["#c6e48b","#7bc96f","#49af5d","#2e8840","#196127"],
	  red:         ["#ff9e82","#ff7b55","#ff4d1a","#e73400","#bd2a00"],
	  orange:      ["#ffa244","#fd7f00","#dd6f00","#bf6000","#9b4e00"],
	  pink:        ["#ff96cb","#ff70b8","#ff3a9d","#ee0077","#c30062"],
	  orangeToRed: ["#ffdf04","#ffbe04","#ff9a03","#ff6d02","#ff2c01"]
	},
	showCurrentDayBorder: true // (optional) Defaults to true
}

//DataviewJS loop
for(let page of dv.pages('"journals"').sort(p=>p.file.name)){ 

	calendarData.entries.push({
		date: page.file.name, // (required) Format YYYY-MM-DD
		intensity: page.file.size, // (required) Color intensity for entry, will map intensities automatically
		content: "", // (optional) Add text to the date cell
		color: "orange", // (optional) Reference from *calendarData.colors*. If no color is supplied; colors[0] is used
	})

}

/**
* param1  HTMLElement   DOM reference for calendar rendering
* param2  CalendarData  Calendar data object from above
*/
renderHeatmapCalendar(this.container, calendarData)
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

某个文件夹下面的全部反向链接：

```dataview
table file.inlinks AS "反向链接"
from "Cards"
limit 1
```
