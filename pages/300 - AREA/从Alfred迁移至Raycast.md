---
feed: show
content-type: notes
date: 2022-06-09
title: 从Alfred迁移至Raycast
---

启动器除了 [[alfred]]和[[raycast]]，还有竞品[[Utools]]、[[HapiGo]]、[[LaunchBar]]。

多方考察，发现 raycast 异军突起，最有实力，开发团队全远程办公，大概有 20 人。

## 为什么要迁移

### alfred 的问题

- 收费过高
- 不思进取，迭代缓慢
- 插件散落，不好寻找，没有统一商店

### raycast 的优势

- 个人用户完全免费
- 自定义别名，自定义搜索优先级
- 自己写插件很方便，简单的先从写个脚本开始，为脚本赋予别名或快捷键也可。
- 快捷键和命令行的逻辑统一

### raycast 的劣势及规避方式

## 自带功能迁移列表

| funtion             | both             | New Column       |                 |
| ------------------- | ---------------- | ---------------- | --------------- |
| text                | text             | text             |                 |
| column-id-95ogol    | column-id-n53pr6 | column-id-tl3obk | table-id-wd1kig |
| file search         | y                |                  | row-id-uf8gjr   |
| app search          | y                |                  | row-id-0sum17   |
| setting search      | y                |                  | row-id-ieu9v2   |
| web search          | y                |                  | row-id-uvhzuu   |
| snippet             | y                |                  | row-id-y1lgl4   |
| clipboard history   | y                |                  | row-id-i1jorp   |
| system operation    | y                |                  | row-id-mgpmi4   |
| customed web search | y                |                  | row-id-tovjhe   |

## 插件功能迁移

- [[keyboard maestro]] 的 macros 搜索与触发
	- 平替
- 浏览器 tabs 搜索，平替 [[chrome-omni插件]]
	- raycast 更强，bookmark 和 history 都支持
- [[devonthink]] 搜索
	- raycast 暂无替代，直接打开 devonthink 的 Spotlight index 开关，就可以文件直接搜索到，曲线救国
- 词典查找
	- 平替
- [[豆瓣]] 电影和书
	- raycast 暂无替代，只能用 quicklink 网页搜索了
- [[github]] 全集操作
	- raycast 更强，几乎搜索仓库，issure，pull request 等操作全支持
- 菜单栏操作搜索
	- 平替。raycast 自带，alfred 需要插件增强
- [[notion]] 搜索
	- 平替
- 文件内搜索
	- raycast 里需要给 file search 插件配置成搜索文件内容，才能实现。
- [[obsidian]] 操作
	- alfred 的 shimming obsidian 插件功能强大，raycast 只有一个简陋的搜索的插件
- terminal 和 finder 互相打开
	- 平替
- [[VSCode]] 管理
	- 平替
- 变量名更改，驼峰大小写等
	- 平替
