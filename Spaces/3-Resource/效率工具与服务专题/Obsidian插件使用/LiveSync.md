---
date created: 2022-06-09
date modified: 2023-03-14
uid: 7384af7a-8b51-4e01-b3ef-8fbe2c161c0a
title: LiveSync
---

## Obsidian 最优雅的多端同步插件 LiveSync

### 目前各种同步方案的优缺点

除了官方的收费同步服务，目前社区的多端同步方案，均以使用 icloud，onedrive，坚果盘等云盘为主，缺点就是同步延时性较大，达到分钟级。甚至如果是安卓系统，还得多装一个非常耗电的 foldersync 服务。

这几天 [[Remotely Save]]的插件的讨论也比较多，除了云盘，还支持使用云服务商的对象存储服务的桶进行同步。但对象存储服务，很可能会产生过多的网络下载费用，导致最后一年要花几百块，费用不可控，不太划算。[[2022-09-22]]更新：只要不是太多视频和图片，同步费用非常低，一个月可能就几毛钱。这个方案目前是对普通用户来说，效果最好，折腾最少的方案。

其实有个最好用的插件，不仅能满足当前同步方案的基本效果，还能实现实时同步的效果，亲测完美，延时小于 2s。官方的图如下：

![](https://img2.oldwinter.top/livesync_image_1.gif)

这个帖子已经完整讨论了 LiveSync 插件的使用方式。[不使用第三方软件实现Obsidian多平台实时同步 - 经验分享 - Obsidian 中文论坛](https://forum-zh.obsidian.md/t/topic/2811)

但作者使用得过于复杂了，很容易劝退大家，我尝试给大家提供一个最小化可行性的版本，让大家花几十分钟就可以实现，而不是要折腾几个小时。如果下文有什么地方没看懂，请自行搜索或参考上方这位朋友的帖子。

### 最小化实现完美多端云同步

#### 有言在先

- 此方案需要使用云服务器，docker，但属于小白级的使用。
- 此插件是同步数据，而不是备份。备份请使用 git。并且在执行下面的操作前，一定要先备份。
- 此方案是最小化版本，最少的改动，最简的方案，用的都是默认配置。
- 由于使用的是 http 协议同步，你的数据是明文传输的，所以敏感信息，就得给自己的服务器配 https 服务，这样会变得太复杂。我的笔记都是纯自己的感想，所以我自己是只使用 http 的。
- 插件有个特点就是，不进行删除同步操作，所以如果你在 A 端删除操作，或者重命名某个文件夹（被视为等同于删除并新建），则 B 端不会自动进行删除操作，需要你再删除一遍。
- 其他方面使用下来，个人感觉良好。如果心动了，就开整吧。

#### 买一台云服务器并运行 livesync 的 server 端服务 - 耗时 10 到 30 分钟

- 买服务器
	- 为了访问速度，可以买[[阿里云]]，[[腾讯云]]，[[华为云]]等国内服务器，虽然我的老东家是华为云，但纯便宜角度，我推荐腾讯云，首单一年 45 元，而且还可以先申请试用 1 个月，不满意就跑路换一家。
		- 题外话：大家可能听过『即使不是程序猿，也推荐你学习一门编程语言』这种说法。具体原因，大家有兴趣可以去搜索。我这里想提一个自己的见解『即使不是程序猿，也推荐你学会使用云服务』。原因很简单：
			- 你会发现很多厂商提供了 docker 的方式安装他们的软件 server 端，其实 docker 纯使用而言，就是执行几条固定的命令行，本质上和双击打开某个应用程序，没难太多。
			- 当你会使用云服务后，能为你完善自己的工作流，提升效率，带来更多想象空间和可能性。
			- 再比如，可以用 docker 一键式自建博客，自建科学上网，自建 rss 服务，自建内网穿透等等。都只需要几条 docker 命令行。
	- 以腾讯云举例，写到这里，我还特地去申请了个推广链接，如果你后面花钱了，貌似能给我带来一点收入😃，先注册：[腾讯云](https://curl.qcloud.com/3ulU59pY)，再申请试用：[云产品免费试用_云服务免费体验_免费云产品试用 - 腾讯云 (tencent.com)](https://cloud.tencent.com/act/free?from=15048)，申请到 1 个月的『轻量应用服务器』试用（选装最常用的 ubuntu 系统最新版）
- 装 docker
	- 申请试用后，他们界面会引导你如何 ssh 登陆。登陆上后，执行几步：
		- 安装 docker，[Install Docker Engine on Ubuntu | Docker Documentation](https://docs.docker.com/engine/install/ubuntu/)，就按照文档里面提供的一键式安装命令 `curl -fsSL <<<<https://get.docker.com>>>> -o get-docker.sh && sudo sh get-docker.sh`
		- 测试是否安装成功：`sudo docker run hello-world`
- 运行 livesync 的 server 服务
	- 按照插件官方描述[obsidian-livesync/setup_own_server.md at main · vrtmrz/obsidian-livesync (github.com)](https://github.com/vrtmrz/obsidian-livesync/blob/main/docs/setup_own_server.md)，3 步
		- 新建一个 local.ini，原样复制过来即可
		- 运行 `docker run --rm -it -e COUCHDB_USER=admin -e COUCHDB_PASSWORD=password -v .local.ini:/opt/couchdb/etc/local.ini -p 5984:5984 couchdb`
			- 注意下这条命令需要将.local.ini 改成你上一步新建的文件路径及名字，比如 `/home/local.ini`
			- 如果你当前权限不足，docker 前面加 sudo
		- 运行 `docker run -d --restart always -e COUCHDB_USER=admin -e COUCHDB_PASSWORD=password -v .local.ini:/opt/couchdb/etc/local.ini -p 5984:5984 couchdb`
			- 注意事项同上一条，不赘述
	- 测试是否运行成功：`sudo docker ps |grep couchdb`

#### 电脑端安装 livesync 插件作为 client 端，配置并连接至自己的 server 端 - 3 到 10 分钟

- 安装 livesync 插件，并打开配置项
- 从上一步，找到自己申请的服务器的公网 ip 地址，比如 121.111.173.186，按照如下填写，密码在上一步的命令行里面，默认是 paasword。接着点击 test，确认连通即可。
- ![](https://img2.oldwinter.top/livesync_image_2.png)
- 接着配置一下同步策略，我的策略如下。livesync 对于未限制后台的手机端而言，可能还是有点耗电，酌情使用。
- ![](https://img2.oldwinter.top/livesync_image_3.png)

#### 手机端新建空库安装 client 端，配置并连接至自己的 server 端，等待同步完成。 - 3 到 10 分钟

- 手机端操作同电脑端，唯一需要注意的是，新建一个库即可，库名相同不相同都可以。
- 或者你如果知道如何在手机端使用 git，那也不用新建，直接 pull 电脑端配置完成的最新库即可。
- 同步成功现象：你会发现自己的文件逐步的被添加到你的文件列表中。

#### 同步第三方插件及其配置 - 3 到 10 分钟

- 若要使用插件同步功能，则需要在电脑端按下图设置，将数据库加密存储
- ![](https://img2.oldwinter.top/livesync_image_4.png)
- 接着打开同步插件的功能即可
- ![](https://img2.oldwinter.top/202204041617016.png)
- ![](https://img2.oldwinter.top/Extras/Media/202204041638512.png)
- 手机端同理，执行上面 2 步。不同之处如下：
	- 手机端选择 apply and receive，而不是 apply and send
	- 手机端的设备和仓库名，取一个和电脑端能区分开的名字即可。
	- 手机端在第 2 步打开插件同步窗口后，选择性地从电脑端同步手机必要的插件和配置即可。
