---
date created: 2022-07-15
date modified: 2023-03-14
title: Omnisearch
---

## 重要技巧

作者并没有适配中文的长连词场景，输入长词不高亮，比如**禁手规则**，原因为：被识别成了禁手和规则两个词语，则会默认用or的规则搜索这2个词语。如果需要只匹配，加上双引号，搜索**"禁手规则"**即可高亮，第二个引号可以省略。

[[Various Complements]]插件同理，在匹配中文时，只能搜索词语或短语，不能直接搜索整句。

可以在[[Dataview]]中调用获得搜索数据，词条加""，则代表完全匹配搜索，不加则会按照中文分词依据分词进行匹配搜索。

```dataviewjs
const results = await omnisearch.search('降维打击')
const arr = dv.array(results).sort(r => r.score, 'desc')
dv.table(['File', 'Score'], arr.map(o => [dv.fileLink(o.path), Math.round(o.score)]))
```
