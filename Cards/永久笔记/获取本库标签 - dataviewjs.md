---
date created: 2022-07-03
date modified: 2023-03-14
title: 获取本库标签 - dataviewjs
---

## 获取库的全部标签

```dataviewjs
let b = dv.pages("")
let tags = b.file.tags
// 数组去重
function removeDuplicate(arr) {
   const newArr = []
   arr.forEach(item => {
     if (newArr.indexOf(item) === -1) {
     newArr.push(item)
    }
 })
 return newArr
}

dv.list(removeDuplicate(tags).sort())
```
