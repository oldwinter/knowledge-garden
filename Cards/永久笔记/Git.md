---
date created: 2022-06-09
date modified: 2023-03-14
title: Git
---

## 用 github 的 ssh 地址，实现免密码操作

```
cd ~/.ssh
ssh-keygen -t rsa -C cdd2zju@gmail.com
cat id_rsa.pub
```

复制 id_rsa.pub 文件内容，登录 GitHub，点击用户头像→Settings→SSHandGPG keys

## 后续操作

- 将新的 ssh 地址，设置为本地 git 仓库的默认 remote 即可
- 添加 ssh 地址为新的 remote 仓库 `git remote add origin-ssh git@github.com:oldwinter/knowledge-garden.git`
- push 的时候，第一次需要 set-upstream，后续省略即可。` git push --set-upstream origin-ssh main`

## 子模块

[[git submodule]]
