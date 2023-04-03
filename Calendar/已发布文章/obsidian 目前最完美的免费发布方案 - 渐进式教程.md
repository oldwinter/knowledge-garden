---
date created: 2022-08-15
date modified: 2023-03-14
tags:
  - 文章/已完成
title: obsidian 目前最完美的免费发布方案 - 渐进式教程
---

> 可以访问此文的双链版本，获得完整阅读体验：[obsidian 目前最完美的免费发布方案 - 渐进式教程 - 🌲 oldwinterの数字花园](https://oldwinter.top/Calendar/%E5%B7%B2%E5%8F%91%E5%B8%83%E6%96%87%E7%AB%A0/obsidian+%E7%9B%AE%E5%89%8D%E6%9C%80%E5%AE%8C%E7%BE%8E%E7%9A%84%E5%85%8D%E8%B4%B9%E5%8F%91%E5%B8%83%E6%96%B9%E6%A1%88+-+%E6%B8%90%E8%BF%9B%E5%BC%8F%E6%95%99%E7%A8%8B)

## 几个发布方案对比

>支持[[双向链接]]是底线，否则随便用一个主流的静态blog方案就行了。

先看最终方案的发布页面效果：[🌱 oldwinterの数字花园](https://notes.oldwinter.top/)

![](https://img2.oldwinter.top/obsidian%20目前最完美的免费发布方案%20-%20渐进式教程_image_1.png)

和obsidian的官方发布方案做个对比：[🌲 oldwinterの数字花园](https://oldwinter.top/)

![](https://img2.oldwinter.top/obsidian%20目前最完美的免费发布方案%20-%20渐进式教程_image_2.png)

功能点详细比对：

| 功能点和限制                | jekyll方案1                        | 官方收费发布方案                | hugo方案(quartz)                               | logseq方案                     |
| --------------------------- | ---------------------------------- | ------------------------------- | ---------------------------------------------- | ------------------------------ |
| 反向链接面板                | 支持                               | 支持                            | 支持                                           | 支持                           |
| 正向链接预览                | 支持                               | 支持                            | 支持                                           | 支持                           |
| 支持搜索                    | 不支持，但通过google间接实现       | 支持                            | 支持，但中文不兼容                             | 支持                           |
| 链接稳定性                  | 只要文件名不改，链接就稳定         | 受文件夹和文件名同时影响        | 只要文件名不改，链接就稳定                     | 只要文件名不改，链接就稳定     |
| 文件夹层级显示              | 无                                 | 支持                            | 无                                             | 无                             |
| [[首屏加载速度]]            | 极快，2s内，下载资源<1M            | 中等，5秒内，下载资源<5M        | 极快，2s内，下载资源<1M                        | 超慢，10秒，下载资源<30M       |
| 图谱显示                    | 支持全局图谱，但1K+笔记就很卡      | 完美支持                        | 支持局部图谱，中文支持不友好                   | 支持，稍卡                     |
| [[横向卷动布局- andy mode]] | 不支持                             | 支持                            | 不支持                                         | 不支持                         |
| 暗色模式支持                | 不支持                             | 支持                            | 支持                                           | 支持，但固定，不能切换         |
| [[SEO优化]]                 | 可被google自动收录                 | 官方做了优化，收录优先级更高    | 可被google自动收录                             | google好像不会收录单html的方案 |
| 移动端支持                  | 支持                               | 支持                            | 支持                                           | 支持                           |
| markdown扩展语法支持        | 支持基本md语法和`[[`语法及别名语法 | 支持obsidian的callout和别名语法 | 只支持基本md语法                               | 只支持基本md语法和`[[`语法     |
| 评论留言系统                | 支持外挂第三方方案                 | 目前第三方外挂方案都有问题      | 支持外挂第三方方案                             | 支持外挂第三方方案                               |
| 其他限制                    | 必须要有YAML区                     | 收费                            | 必须要有YAML区；不支持`[[`wikilink格式，需妥协 | 语法上需要一点克制             |

精力有限，就只对比这4种方案了。下面列上我目前体验对比过的全部第三方开源发布方案，供各位参考，也可以持续观察作者后续的开发进展，再择优选择。

- jekyll方案1，即我选用的方案。[GitHub - maximevaillancourt/digital-garden-jekyll-template: Start your own digital garden using this Jekyll template 🌱](https://github.com/maximevaillancourt/digital-garden-jekyll-template)
- jekyll方案2，[一位印度老哥写的](https://github.com/Jekyll-Garden/jekyll-garden.github.io)
- hugo方案(quartz)，[jackyzha0 (Jacky Zhao) · GitHub](https://github.com/jackyzha0)
- logseq方案，[GitHub - pengx17/logseq-publish: Logseq Publish Action](https://github.com/pengx17/logseq-publish)
- zola方案，[GitHub - ppeetteerrs/obsidian-zola: A no-brainer solution to turning your Obsidian PKM into a Zola site.](https://github.com/ppeetteerrs/obsidian-zola)
- perlite方案，[GitHub - secure-77/Perlite: A webbased markdown viewer optimized for Obsidian](https://github.com/secure-77/Perlite)
- gatsby方案，支持[[横向卷动布局- andy mode]]，但构建时长小时级别，[GitHub - aravindballa/gatsby-theme-andy: A Gatsby theme to build Andy style websites. 📑](https://github.com/aravindballa/gatsby-theme-andy/)
- [[2022-07-24]]新发现方案：[GitHub - mathieudutour/gatsby-digital-garden: 🌷 🌻 🌺 Create a digital garden with Gatsby](https://github.com/mathieudutour/gatsby-digital-garden/)

总之，有钱就选官方服务准没错。其次，综合对比后，我选择了jekyll方案1，如何一步步实现，见下文。

[[2022-08-21]]新增[[quartz]]方案，已经成熟很多，比jekyll方案性能更好，还支持搜索。

## 渐进式教程

>注：程序员朋友预估10分钟之内能搞定。纯小白也许需要花费30分钟以上。有能力的朋友，可以直接根据原作者的readme进行部署和发布，不需要看我的**汉化啰嗦版**😅

### 总的来说：

通过基于[[jekyll]]开源的静态blog模板，通过[[git push]]自动触发[[🔗netlify]]进行构建操作，将md文件转换成静态服务器可以识别的html文件。

### 一步步来说：

- 1.本地调试。
	- fork这个jekyll开源模板：[GitHub - oldwinter/dg](https://github.com/oldwinter/dg)
		- 有能力的朋友，建议fork原作者的，自己进行定制改动。
	- `git clone`自己fork的仓库地址到你电脑本地：`git clone <YOUR_COPIED_URL_HERE> my-digital-garden`
	- 进入刚才clone的仓库的目录，`cd my-digital-garden`
	- 执行依赖库安装命令`bundle`
		- bundle是[[ruby]]的包管理器，所以可能还需要先安装ruby语言环境，请自行搜索教程。
		- 如果因为网络问题导致依赖库安装很慢，请自行搜索解决。
	- 执行本地调试命令`bundle exec jekyll serve`，接着浏览器打开`http://localhost:4000`看是否正常显示页面。
	- 将obsidian库全部要发布的文件用linter插件加上YAML格式的[[frontmatter]]区，然后拷贝至`_notes_`目录。
		- linter插件支持一键对全库进行markdown格式美化，强烈推荐。⚠️执行前请先备份。
		- 有能力的朋友，可以直接将obsidian笔记库添加为[[git submodule]]。
	- ctrl + c 停止`bundle exec jekyll serve`命令，并重新执行。接着浏览器打开`http://localhost:4000/笔记名`。例如我的obsidian笔记库里面有`数字花园`这条笔记，则访问`http://localhost:4000/数字花园`即可看到笔记。
- 2.[[🔗netlify]]配置自动构建。
	- 按照这个教程[手把手教你使用Netlify部署博客及部署自动化 - 知乎](https://zhuanlan.zhihu.com/p/55252024)，界面一步步点，都按默认配置来，从而将上一步fork的自己仓库，通过netlify构建和发布。
		- 主流的免费的还有[[github pages]]和[[Vercel]]服务，前者缺少[[CDN]]导致国内访问很慢，后者存在非html后缀的链接报404错误的问题。
	- 完成上一步后，应该能得到一个`https://master--zippy-dango-d43c8d.netlify.app/`类似格式的网址，打开后正常显示原仓库的页面即可。
- 3.将本地全部文件push至github。
	- 本地仓库的根目录执行git三件套：`git add .` `git commit -m "first commit"` `git push`
		- 有能力的朋友，可以将这个步骤，用效率工具，包装成一个定时执行或一键执行的命令。
	- 回到[[🔗netlify]]页面，应该能看到它开始被push操作触发了构建动作，等几分钟后，打开得到的新网址，看是否已经包含了obsidian笔记库内容，链接为`域名/笔记名`。例如我的obsidian笔记库里面有`数字花园`这条笔记，则访问`https://master--zippy-dango-d43c8d.netlify.app/数字花园`即可看到笔记。
- 4.定制自己的首页、网站名和样式
	- 首页修改。修改`_pages`文件夹下的`index.md`即可，可直接参考[dg/index.md at master · oldwinter/dg · GitHub](https://github.com/oldwinter/dg/blob/master/_pages/index.md)
	- 网站名修改。修改根目录的`_config.yaml`第一行title字段即可。
	- 有能力的同学，自己根据jekyll官方文档，定制自己的界面和样式即可。
	- 完整重复步骤3，看更改是否生效。
- 5.⚠️重要注意事项
	- 图片推荐使用[[图片保存：图床or本地|图床]]。若你未使用图床，而是使用本地图片。则需
		- 在obsidian库中，引用本地图片不使用`![[xx.png]]`，而是使用`![](xx.png)`格式。
		- 在[[🔗netlify]]的Build Setting的Build command设置中，将图片从obsidian的图片库移动至工程根目录，如`mv _notes/Extras . && jekyll build --trace`。
- （可选）自定义自己的域名
	- 在netlify界面按提示一步步操作即可，需要有自己的域名且已经备案。
	- [[第一次购买并备案域名的经验]]
	- [[DNS解析]]
- （可选）嵌入评论系统[[2022-08-17]]新增
	- 推荐用giscus，不用自己折腾数据库这些烦人的东西。[[博客的评论系统借用github discussion模块 - giscus]]

## 写在最后

我在践行obsidian笔记库全量开源的想法（代码能力不够，笔记来凑😂），欢迎捧场来赏赐1个star⭐️：[GitHub - oldwinter/knowledge-garden: 真实袒露的第二大脑 second brain，未经美化的数字花园 digital garden](https://github.com/oldwinter/knowledge-garden)
