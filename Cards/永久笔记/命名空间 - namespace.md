---
title: 命名空间 - namespace
date created: 2022-12-11
date modified: 2023-03-14
---

命名空间和 DNS  
当您创建一个 Service 时，Kubernetes 会创建一个相应的 DNS 条目。

该条目的形式是 <service-name>.<namespace-name>.svc.cluster.local，这意味着如果容器只使用 <service-name>，它将被解析到本地命名空间的服务。这对于跨多个命名空间（如开发、分级和生产）使用相同的配置非常有用。如果您希望跨命名空间访问，则需要使用完全限定域名（FQDN）。  
并非所有对象都在命名空间中  
大多数 kubernetes 资源（例如 Pod、Service、副本控制器等）都位于某些命名空间中。但是命名空间资源本身并不在命名空间中。而且底层资源，例如 nodes 和持久化卷不属于任何命名空间。  
查看哪些 Kubernetes 资源在命名空间中，哪些不在命名空间中：

```
# In a namespace
kubectl api-resources --namespaced=true
# Not in a namespace
kubectl api-resources --namespaced=false
```

来自 <https://kubernetes.io/zh/docs/concepts/overview/working-with-objects/namespaces/>
