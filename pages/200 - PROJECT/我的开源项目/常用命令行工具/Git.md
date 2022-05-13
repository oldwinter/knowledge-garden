## 用github的ssh地址，实现免密码操作

```
cd ~/.ssh
ssh-keygen -t rsa -C cdd2zju@gmail.com
cat id_rsa.pub
```

复制 id_rsa.pub 文件内容，登录 GitHub，点击用户头像→Settings→SSHandGPG keys

## 后续操作

- 将新的ssh地址，设置为本地git仓库的默认remote即可
- 添加ssh地址为新的remote仓库`git remote add origin-ssh git@github.com:oldwinter/knowledge-garden.git`
- push的时候，第一次需要set-upstream，后续省略即可。` git push --set-upstream origin-ssh main`
