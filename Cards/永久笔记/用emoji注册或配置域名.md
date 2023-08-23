---
date created: 2022-07-27
date modified: 2023-03-14
title: 用emoji注册或配置域名
---

[与众不同的 Emoji 域名 | 冷知识+1 - 少数派](https://sspai.com/post/40131)

直接输入emoji会配置失败。转换成[[punycode]]就行：

以配置二级域名 ([SLD](https://en.m.wikipedia.org/wiki/Second-level_domain)) 向自己的域名中加入 Emoji 元素，效果如下 (示例)

```
Punycoding  [  https://❤️.example.com  >>  https://bxn--qei.example.com  ]
```

*在 DNS 解析管理界面配置时，应使用 Punycoder 将 Emoji 转换为 ASCII 字符后再进行配置

[Punycode converter (IDN converter), Punycode to Unicode 🔧](https://www.punycoder.com/)

✈️.oldwinter.top
