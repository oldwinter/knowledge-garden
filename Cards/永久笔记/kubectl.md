---
date created: 2022-06-09
date modified: 2023-03-14
title: kubectl
---

```bash
      
//阻塞式命令，拿来控制流程
kubectl wait --for=condition=Ready pods --all --timeout=1200s 

//获取指定label的pod信息
kubectl get pod --show-labels |grep app-ch

```
