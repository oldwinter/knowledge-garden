## 定义

在docker的运行时容器中，再运行一个docker engine，从而在这个容器内，又有一套全新的docker运行时系统，与容器外完全隔离。
相对的概念：[[docker from docker]]

## 运行时容器中的yaml定义片段

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

- 为什么docker rm 和start的时候,docker in docker 以前pull的镜像还在 ?
	- 因为用了volume, volume没有删除的话,重新启动vscode会自动mount以前同名的volume, volume里面有以前的历史images数据
