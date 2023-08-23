---
date created: 2022-06-09
date modified: 2023-03-14
title: mongoDB
---

## 快速实践

### 运行

```
docker run -d --name mongodb-server -v /Users/cdd/Works/trytry/mongoDB/data:/data/db -p 27017:27017 mongo --auth 
-v后面的参数表示把数据文件挂载到宿主机的路径
-p把mongo端口映射到宿主机的指定端口
--auth表示连接mongodb需要授权
```

### 创建用户并测试

```
docker exec -it mongodb-server mongo admin
```

### 创建一个名为 admin，密码为 123456 的用户。

```
db.createUser({ user:'admin',pwd:'123456',roles:[ { role:'userAdminAnyDatabase', db: 'admin'},"readWriteAnyDatabase"]});
```

### 尝试使用上面创建的用户信息进行连接。

```
db.auth('admin', '123456')
```

### Navicat 连接并进行数据操作
