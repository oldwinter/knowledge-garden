---
date created: 2022-06-09
date modified: 2023-03-14
title: docker in docker
---

## 定义

在 docker 的运行时容器中，再运行一个 docker engine，从而在这个容器内，又有一套全新的 docker 运行时系统，与容器外完全隔离。

相对的概念：[[docker from docker]]

## 运行时容器中的 yaml 定义片段

```yaml
{
                "Type": "volume",
                "Name": "dind-var-lib-docker",
                "Source": "/var/lib/docker/volumes/dind-var-lib-docker/_data",
                "Destination": "/var/lib/docker",
                "Driver": "local",
                "Mode": "z",
                "RW": true,
                "Propagation": ""
},
{
                "Type": "volume",
                "Name": "minikube-config",
                "Source": "/var/lib/docker/volumes/minikube-config/_data",
                "Destination": "/home/vscode/.minikube",
                "Driver": "local",
                "Mode": "z",
                "RW": true,
                "Propagation": ""
}
```

## 发现的几个问题

- 为什么 docker rm 和 start 的时候,docker in docker 以前 pull 的镜像还在 ?
	- 因为用了 volume, volume 没有删除的话,重新启动 vscode 会自动 mount 以前同名的 volume, volume 里面有以前的历史 images 数据
