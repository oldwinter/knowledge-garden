---
title: edge function 和serverless function的不同之处及其应用场景
date created: 2023-03-04
date modified: 2023-03-14
---

Vercel Edge Function和Vercel Serverless Function是Vercel平台提供的两种不同的计算服务，它们有以下不同之处：

1. 执行位置不同

Vercel Serverless Function是在Vercel平台的服务器上执行的，而Vercel Edge Function是在Vercel全球分布式网络的边缘节点上执行的。Edge Function更加接近用户，可以更快地响应请求，同时也可以减轻服务器的负载。

2. 执行方式不同

Vercel Serverless Function可以使用多种语言和框架进行开发，例如Node.js、Python、Go等，而Vercel Edge Function只能使用JavaScript进行开发。同时，Edge Function的执行环境也是不同的，它使用了一些特殊的API和功能，例如HTTP缓存、路由、重定向等。

3. 功能不同

Vercel Serverless Function和Vercel Edge Function的功能也有所不同。Serverless Function可以执行更加复杂、耗时的计算任务，例如数据处理、机器学习、视频转码等，同时还可以与其他服务进行集成，例如数据库、消息队列、存储等。Edge Function则更加注重于处理请求、路由、鉴权、缓存等方面的操作，可以提高网站和应用程序的性能和安全性。

4. 使用场景不同

由于执行位置和功能的不同，Vercel Serverless Function和Vercel Edge Function适用的场景也不同。Serverless Function适用于需要执行复杂计算任务、与其他服务进行集成的场景，例如电商平台、社交媒体、SaaS应用等。Edge Function则适用于需要优化网站和应用程序性能、提高安全性的场景，例如静态网站、API服务、内容分发等。

总之，Vercel Edge Function和Vercel Serverless Function是两种不同的计算服务，它们有各自不同的执行位置、执行方式、功能和使用场景。用户可以根据自己的需求来选择合适的服务，以实现更加高效、灵活、安全的网站和应用程序。
