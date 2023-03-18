---
date created: 2022-08-12
date modified: 2023-03-14
title: 使用Unsplash API生成随机图片
---

[使用 Unsplash API 生成随机图片 | Angus的博客](https://www.imyangyong.com/blog/2020/06/javascript/%E4%BD%BF%E7%94%A8%20Unsplash%20API%20%E7%94%9F%E6%88%90%E9%9A%8F%E6%9C%BA%E5%9B%BE%E7%89%87/)

如果你想使用免费版权的图片时，无论你是否用于商业用途，[Unsplash](https://unsplash.com/) 是不错的选择。

我自己也经常用它来制作大型背景图片，例如：[https://www.imyangyong.com](https://www.imyangyong.com/)。

虽然他们为开发人员提供了很棒的 API，但他们也提供了通过 URL 访问随机图片的选项。

## 1. 默认随机

请看这个例子，从他们巨大的存储中生成随机的图片。

<table><tbody><tr><td><pre><span>1</span><br></pre></td><td><pre><span>https://source.unsplash.com/random</span><br></pre></td></tr></tbody></table>

## 2.指定用户

我们还可以从特定用户账号中生成随机图像。URL 格式是这样的:

<table><tbody><tr><td><pre><span>1</span><br></pre></td><td><pre><span>https://source.unsplash.com/user/{USERNAME}</span><br></pre></td></tr></tbody></table>

你可以尝试单击下面的链接，从我的账号中随机生成图片：

[https://source.unsplash.com/user/angusyang9/likes](https://source.unsplash.com/user/angusyang9/likes)

## 3. 指定尺寸

还有一个选项可以设置要生成的图像的大小。像这样:

<table><tbody><tr><td><pre><span>1</span><br></pre></td><td><pre><span>https://source.unsplash.com/random/{WIDTH}x{HEIGHT}</span><br></pre></td></tr></tbody></table>

让我们生成下 300 x 300 大小的图片：

[https://source.unsplash.com/random/300×300](https://source.unsplash.com/random/300%C3%97300)

## 4. 依据关键词搜索

这个真的很棒。你可以从搜索词生成图像。让我们搜索下城市和夜晚（非常有创意）：

[https://source.unsplash.com/random/?city,night](https://source.unsplash.com/random/?city,night)

当然，你可以与尺寸配合使用：

[https://source.unsplash.com/random/900×700/?fruit](https://source.unsplash.com/random/900%C3%97700/?fruit)

## 代码示例

以下是 react 中的代码片段：

<table><tbody><tr><td><pre><span>1</span><br><span>2</span><br><span>3</span><br><span>4</span><br><span>5</span><br><span>6</span><br><span>7</span><br><span>8</span><br><span>9</span><br><span>10</span><br><span>11</span><br><span>12</span><br><span>13</span><br><span>14</span><br><span>15</span><br><span>16</span><br><span>17</span><br><span>18</span><br><span>19</span><br><span>20</span><br><span>21</span><br><span>22</span><br><span>23</span><br><span>24</span><br><span>25</span><br><span>26</span><br><span>27</span><br><span>28</span><br><span>29</span><br><span>30</span><br><span>31</span><br><span>32</span><br></pre></td><td><pre><span><span><span>class</span> <span>RandomImg</span> <span>extends</span> <span>React</span>.<span>Component</span> </span>{</span><br><span> <span>constructor</span>() {</span><br><span> <span>super</span>();</span><br><span> <span>this</span>.state = {</span><br><span> bgImageUrl: <span>require</span>(<span>'./default.jpeg'</span>)</span><br><span> }</span><br><span> }</span><br><span> </span><br><span> componentDidMount() {</span><br><span> <span>this</span>.generateImage();</span><br><span> }</span><br><span> </span><br><span> generateImage(){</span><br><span> fetch(<span>`https://source.unsplash.com/random/?people`</span>).then(<span>(<span>response</span>) =&gt;</span> {</span><br><span> preloadImage(response.url);</span><br><span> })</span><br><span>	}</span><br><span> </span><br><span> preloadImage(url) {</span><br><span> <span>let</span> img = <span>new</span> Image();</span><br><span> img.src = url;</span><br><span> img.onload = <span><span>()</span> =&gt;</span> {</span><br><span> <span>this</span>.setState({</span><br><span> bgImageUrl: url</span><br><span> });</span><br><span> }</span><br><span>	}</span><br><span> </span><br><span> render() {</span><br><span> <span>return</span> <span><span>&lt;<span>img</span> <span>src</span>=<span>{bgImageUrl}</span> /&gt;</span></span></span><br><span> }</span><br><span>}</span><br></pre></td></tr></tbody></table>

## 参考链接

- [Generate Random Images From Unsplash Without Using The API](https://awik.io/generate-random-images-unsplash-without-using-api/)
