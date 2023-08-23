---
date created: 2022-06-17
date modified: 2023-03-14
title: husky
---

[GitHub - typicode/husky: Git hooks made easy 🐶 woof!](https://github.com/typicode/husky)

按照官网 3 步配置，即可完成初始化。接着就是写实际需要运行的 pre-commit 脚本的事儿了。脚本需要看 husky.sh 里面的定义，返回非 0 值，则判断为验证不通过。
