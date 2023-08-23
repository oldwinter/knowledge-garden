---
title: 替换deploy镜像版本
date created: 2022-12-11
date modified: 2023-03-14
---

kubectl set image deploy istio-ingressgateway xx=xx:1.3.0-r1-casing -n istio-system

1、将istio-gateway的envoy替换成新版envoy  
kubectl edit deploy istio-ingressgateway -n istio-system  
找到 image: 字段，将 镜像版本tag改成1.3.0-r1-casing即可

2、将业务pod自动注入的envoy替换成新版envoy  
kubectl edit cm istio-sidecar-injector -n istio-system  
找到如下字段替换成红框tag版本即可。

将想要升级最新版的业务pod重启，就会自动注入新版的envoy

kubectl delete pod --all -n mmc  
3、如果只需要给指定负载替换最新的envoy版本，则不要执行步骤2，而是在指定负载的deployment里面，加入annotation。  
Kubectl edit deploy {deployName} -n {namespace}  
找到如下字段，添加新的annotation即可

其他支持的annotation如下：  
https://istio.io/docs/reference/config/annotations/
