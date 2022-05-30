
启动器除了[[alfred]]和[[raycast]]，还有竞品[[Utools]]、[[HapiGo]]、[[LaunchBar]]。

多方考察，发现raycast异军突起，最有实力，开发团队全远程办公，大概有20人。

## 为什么要迁移

### alfred的问题

- 收费过高
- 不思进取，迭代缓慢
- 插件散落，不好寻找，没有统一商店

### raycast的优势

- 个人用户完全免费
- 自定义别名，自定义搜索优先级
- 自己写插件很方便

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

- [[keyboard maestro]]的macros搜索与触发
	- 平替
- 浏览器tabs搜索，平替[[chrome-omni插件]]
	- raycast更强，bookmark和history都支持
- [[devonthink]] 搜索 #todo
	- raycast暂无替代
- 词典查找
	- 平替
- [[豆瓣]]电影和书
	- raycast暂无替代，只能用quicklink网页搜索了
- [[github]]全集操作
	- raycast更强，几乎搜索仓库，issure，pull request等操作全支持
- 菜单栏操作搜索
	- 平替。raycast自带，alfred需要插件增强
- [[notion]]搜索
	- 平替
- 文件内搜索 #todo
	- raycast还未找到插件
- [[obsidian]]操作
	- alfred的shimming obsidian插件功能强大，raycast只有一个简陋的搜索的插件
- terminal和finder互相打开
	- 平替
- [[vscode]]管理
	- 平替
- 变量名更改，驼峰大小写等
	- 平替
