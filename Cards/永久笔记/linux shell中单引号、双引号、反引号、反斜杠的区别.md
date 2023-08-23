---
date created: 2022-08-24
date modified: 2023-08-21
title: linux shell中单引号、双引号、反引号、反斜杠的区别
---

**1\. 单引号 ( '' )**

```
\# grep Susan phonebook  
Susan Goldberg 403-212-4921  
Susan Topple 212-234-2343  
```

如果我们想查找的是Susan Goldberg，不能直接使用grep Susan Goldberg phonebook命令，grep会把Goldberg和phonebook当作需要搜索的文件  

```
\# grep 'Susan Gold' phonebook  
Susan Goldberg 403-212-4921  
```

当shell碰到第一个单引号时，它忽略掉其后直到右引号的所有特殊字符

**2\. 双引号 ( " " )  

双引号作用与单引号类似，区别在于它没有那么严格。单引号告诉shell忽略所有特殊字符，而双引号只要求忽略大多数，具体说，括在双引号中的三种特殊字符不被忽略：$,\\,\` ,即双引号会解释字符串的特别意思,而单引号直接使用字符串.如果使用双引号将字符串赋给变量并反馈它，实际上与直接反馈变量并无差别。如果要查询包含空格的字符串，经常会用到双引号。

```
\# x=\*  
\# echo $x  
hello.sh menus.sh misc.sh phonebook tshift.sh  
\# echo '$x'  
$x  
\# echo "$x"  
```

这个例子可以看出无引号、单引号和双引号之间的区别。在最后一种情况中，双引号告诉shell在引号内照样进行变量名替换，所以shell把$x替换为＊，因为双引号中不做文件名替换，所以就把＊作为要显示的值传递给echo。对于第一种情况需要进一步说明，shell在给变量赋值时不进行文件名替换（这从第三种情况中也能看出来），各步骤发生的精确次序如下：shell扫描命令行，把x的值设为星号＊；  
shell再次扫描命令行，碰到星号＊，把它替换成当前目录下的文件清单；  
shell启动执行echo命令，把文件清单作为参数传递给echo.  
这个赋值的先后次序非常重要：shell先作变量替换，然后作文件名替换，最后把这行处理为参数

**3\. 反引号(\`\`)**

命令替换是指shell能够将一个命令的标准输出插在一个命令行中任何位置。shell中有两种方法作命令替换：把shell命令用反引号或者`$(…)结构括起来，其中，$(…)`格式受到POSIX标准支持，也利于嵌套。

```
\# echo The date and time is \`date\`  
The date and time is 三 6月 15 06:10:35 CST 2005  
\# echo Your current working directory is $(pwd)  
Your current working directory is /home/howard/script
```

**4\. 反斜杠 backslash-escaped( \\ )**

反斜杠一般用作转义字符,或称逃脱字符,linux如果echo要让转义字符发生作用,就要使用-e选项,且转义字符要使用双引号

```
echo -e "\\n"
```

反斜杠的另一种作用,就是当反斜杠用于一行的最后一个字符时，shell把行尾的反斜杠作为续行，这种结构在分几行输入长命令时经常使用。
