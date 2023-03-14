---
title: scp ssh自动输入密码脚本
date created: 2022-12-11
date modified: 2023-03-14
---

```
# scp：

#! /usr/bin/expect

set timeout 60
set source [lindex $argv 0]
set target [lindex $argv 1]
set passwd [lindex $argv 3]

spawn scp -r -o StrictHostKeyChecking=no $source $target
expect {
"*assword: "
{send "Huawei@123\r";}
}
expect eof

# ssh：

#! /usr/bin/expect

set timeout 90
set target [lindex $argv 0]
set passwd [lindex $argv 1]
set cmd [lindex $argv 2]
spawn ssh -o StrictHostKeyChecking=no $target $cmd 
expect {
"*assword: "
{send "$passwd\r";}
}
expect eof

```
