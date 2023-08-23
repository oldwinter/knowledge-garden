---
date created: 2022-06-09
date modified: 2023-03-14
title: import和require本质区别
---

作者：寸志

链接：<<<<<https://www.zhihu.com/question/56820346/answer/150724784>>>>>

来源：知乎

著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

## 遵循的模块化规范不一样

模块化规范：即为 JavaScript 提供一种模块编写、模块依赖和模块运行的方案。谁让最初的 JavaScript 是那么的裸奔呢——全局变量就是它的模块化规范。

require/exports 出生在野生规范当中，什么叫做野生规范？即这些规范是 JavaScript 社区中的开发者自己草拟的规则，得到了大家的承认或者广泛的应用。比如 CommonJS、AMD、CMD 等等。import/export 则是名门正派。TC39 制定的新的 ECMAScript 版本，即 ES6（ES2015）中包含进来。

## 出现的时间不同

require/exports 相关的规范由于野生性质，在 2010 年前后出生。AMD、CMD 相对命比较短，到 2014 年基本上就摇摇欲坠了。一开始大家还比较喜欢在浏览器上采用这种异步小模块的加载方式，但并不是银弹。随着 Node.js 流行和 Browsersify 的兴起，运行时异步加载逐渐被构建时模块合并分块所替代。Wrapper 函数再也不需要了。2014 年 Webpack 还是新玩意，现在已经是前端必备神器了。

Browsersify、Webpack 一开始的目的就是打包 CommonJS 模块。

CommonJS 作为 Node.js 的规范，一直沿用至今。由于 npm 上 CommonJS 的类库众多，以及 CommonJS 和 ES6 之间的差异，Node.js 无法直接兼容 ES6。所以现阶段 require/exports 任然是必要且实必须的。出自 ES6 的 import/export 相对就晚了许多。被大家所熟知和使用也是 2015 年之后的事了。这其实要感谢 babel（原来项目名叫做 6to5，后更名为 babel）这个神一般的项目。由于有了 babel 将还未被宿主环境（各浏览器、Node.js）直接支持的 ES6 Module 编译为 ES5 的 CommonJS——也就是 require/exports 这种写法——Webpack 插上 babel-loader 这个翅膀才开始高飞，大家也才可以称 " 我在使用 ES6！"

这也就是为什么前面说 require/exports 是必要且必须的。因为事实是，目前你编写的 import/export 最终都是编译为 require/exports 来执行的。

## require/exports 和 import/export 形式不一样

require/exports 的用法只有以下三种简单的写法：

```javascript
const fs = require('fs')

exports.fs = fs

module.exports = fs
```

而 import/export 的写法就多种多样：

```javascript
import fs from 'fs'

import {default as fs} from 'fs'

import * as fs from 'fs'

import {readFile} from 'fs'

import {readFile as read} from 'fs'

import fs, {readFile} from 'fs'

export default fs

export const fs

export function readFile

export {readFile, read}

export * from 'fs'
```

## require/exports 和 import/export 本质上的差别

形式上看起来五花八门，但本质上：

1. CommonJS 还是 ES6 Module 输出都可以看成是一个具备多个属性或者方法的对象；
2. default 是 ES6 Module 所独有的关键字，export default fs 输出默认的接口对象，import fs from 'fs' 可直接导入这个对象；
3. ES6 Module 中导入模块的属性或者方法是强绑定的，包括基础类型；而 CommonJS 则是普通的值传递或者引用传递。  
1、2 相对比较好理解，3 需要看个例子：

```javascript
// counter.js
exports.count = 0
setTimeout(function () {
  console.log('increase count to', ++exports.count, 'in counter.js after 500ms')
}, 500)
// commonjs.js
const {count} = require('./counter')
setTimeout(function () {
  console.log('read count after 1000ms in commonjs is', count)
}, 1000)
//es6.js
import {count} from './counter'
setTimeout(function () {
  console.log('read count after 1000ms in es6 is', count)
}, 1000)

分别运行 commonjs.js 和 es6.js：

➜  test node commonjs.js
increase count to 1 in counter.js after 500ms
read count after 1000ms in commonjs is 0
➜  test babel-node es6.js
increase count to 1 in counter.js after 500ms
read count after 1000ms in es6 is 1
```
