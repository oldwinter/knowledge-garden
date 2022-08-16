// var discussionInterface = `
// <script src="https://giscus.app/client.js"
//         data-repo="oldwinter/knowledge-garden"
//         data-repo-id="R_kgDOHT-NGQ"
//         data-category="主发布站的评论系统"
//         data-category-id="DIC_kwDOHT-NGc4CQ3PG"
//         data-mapping="title"
//         data-strict="0"
//         data-reactions-enabled="1"
//         data-emit-metadata="0"
//         data-input-position="bottom"
//         data-theme="preferred_color_scheme"
//         data-lang="zh-CN"
//         data-loading="lazy"
//         crossorigin="anonymous"
//         async>
// </script>`

// 由于github鉴权需要callback后带回token在url中，obsidian的publish暂时不支持，等以后晚上再嵌入giscus

var targetdom = document.getElementsByClassName('backlinks')[0];
var script = document.createElement("script");
script.setAttribute("src", "https://giscus.app/client.js");
script.setAttribute("data-repo", "oldwinter/knowledge-garden");
script.setAttribute("data-repo-id", "R_kgDOHT-NGQ");
script.setAttribute("data-category", "主发布站的评论系统");
script.setAttribute("data-category-id", "DIC_kwDOHT-NGc4CQ3PG");
script.setAttribute("data-mapping", "title");
script.setAttribute("data-strict", "0");
script.setAttribute("data-reactions-enabled", "1");
script.setAttribute("data-emit-metadata", "0");
script.setAttribute("data-input-position", "bottom");
script.setAttribute("data-theme", "preferred_color_scheme");
script.setAttribute("data-lang", "zh-CN");
script.setAttribute("crossorigin", "anonymous");
script.setAttribute("async", "true");

if(!document.getElementsByClassName('giscus')[0]){

    targetdom.appendChild(document.createElement("br"));
    targetdom.appendChild(script);
}
// targetdom.insertAdjacentHTML('afterend', script);
// targetdom.insertAdjacentHTML('afterend', discussionInterface);