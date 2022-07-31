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

[Minimal Documentation](https://minimal.guide/)