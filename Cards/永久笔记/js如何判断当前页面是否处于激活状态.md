---
date created: 2022-08-11
date modified: 2023-03-14
title: js如何判断当前页面是否处于激活状态
---

反制方法：开发控制台中，在事件监听器界面，删除blur、focus和 visibilitychange事件，就可以避免有些网站通过检测这个的方式来判断用户考试是否离开了考试界面作弊了。

**方式1：监听事件visibilitychange**  
具体实现方式如下：

```
var hiddenProperty = 'hidden' in document ? 'hidden' :    
    'webkitHidden' in document ? 'webkitHidden' :    
    'mozHidden' in document ? 'mozHidden' :  null;
var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
var onVisibilityChange = function(){
    if (!document[hiddenProperty]) {    
        alert("未激活状态！");
    }else{
        alert("激活状态！")
    }
}
document.addEventListener(visibilityChangeEvent, onVisibilityChange);
```

**方式2：监听事件blur和focus**

```
window.onblur = function(e){
console.log("未激活状态！")
}
window.onfocus = function(e){
console.log("激活状态！")
}
```
