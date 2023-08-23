---
title: vercel edge function
date created: 2023-03-04
date modified: 2023-03-14
---

[[edge function 和serverless function的不同之处及其应用场景]]

可以理解为，将原本需要部署在某台服务器上的服务端代码，进行了2个层面的极致化：

- 代码，简化成函数，目前只支持JavaScript语言，直接运行
- 不需要管服务器，用户浏览器的请求，将直接发送往距离其最近的服务器（其实是JavaScript执行环境）（cloudflare或vercel的边缘服务器或执行环境，对我们是透明的），让其运行之前托管的函数。

也可以理解为，动态版的cdn。cdn只能分发静态文件，而edge function可以动态分发算力，虽然目前这个算力只支持运行JavaScript语言。

## [[Cloudflare Worker]]

## vercel edge function

Vercel Edge Function是Vercel Serverless平台提供的一种边缘计算服务，它可以在Vercel全球分布式网络的边缘节点上执行JavaScript代码。Edge Function的原理如下：

首先，用户在Vercel平台上创建一个Edge Function，并将其部署到Vercel全球分布式网络的边缘节点上。然后，当一个用户访问网站时，请求会被发送到最近的边缘节点，Edge Function就会在这个节点上执行。

在执行期间，Edge Function可以访问请求的元数据、请求体、响应体等信息，并根据这些信息来执行一系列自定义的JavaScript代码。例如，Edge Function可以根据请求的来源、路径、参数等信息，来进行路由、鉴权、缓存等操作。

在执行完毕后，Edge Function会将结果返回给用户，同时还可以对响应进行一系列自定义的操作，例如添加头部、修改状态码、压缩响应等。最后，响应会被发送回用户的浏览器，完成整个请求-响应过程。

总之，Vercel Edge Function是一种在Vercel全球分布式网络的边缘节点上执行JavaScript代码的服务，它可以根据请求的元数据、请求体、响应体等信息，来执行自定义的操作，并对响应进行自定义的处理。这种服务可以帮助用户实现更加灵活、高效、安全的网站和应用程序。
