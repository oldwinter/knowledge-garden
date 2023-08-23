---
date created: 2022-07-26
date modified: 2023-03-14
title: minimal主题的publish.js参考
---

```JavaScript
var plausible = document.createElement('script')
plausible.defer = true
plausible.setAttribute('data-domain', 'minimal.guide')
plausible.src = 'https://plausible.io/js/script.outbound-links.js'
document.head.appendChild(plausible)


var siteLeft = document.querySelector('.site-body-left-column');

let navOrderAsc = ["Home.md", "Help.md", "About.md"]; /* these go on top*/

let navOrderDsc = []; /* these go at the bottom */

/* items not mentioned go in between in alphabetical order */

var siteNav = siteLeft.querySelector('.nav-view-outer');

var navContainer = siteNav.querySelector('.tree-item').querySelector('.tree-item-children');

for (const item of navOrderAsc.reverse()){

    querytext = '[data-path="' + item + '"]';

    navItem = navContainer.querySelector(querytext);

    if (navItem == null) continue;

    moveItem = navItem.parentElement;

    navContainer.prepend(moveItem);

}

for (const item of navOrderDsc.reverse()){

    querytext = '[data-path="' + item + '"]';

    navItem = navContainer.querySelector(querytext);

    if (navItem == null) continue;

    moveItem = navItem.parentElement;

    navContainer.append(moveItem);

}
```

插入一段html到dom中的原生js方法

```
let text = `
<script src="https://giscus.app/client.js"
        data-repo="oldwinter/knowledge-garden"
        data-repo-id="R_kgDOHT-NGQ"
        data-category="主发布站的评论系统"
        data-category-id="DIC_kwDOHT-NGc4CQ3PG"
        data-mapping="title"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="preferred_color_scheme"
        data-lang="zh-CN"
        data-loading="lazy"
        crossorigin="anonymous"
        async>
</script>`
element.insertAdjacentHTML('afterend', text);
```

[Minimal Documentation](https://minimal.guide/)
