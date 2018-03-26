# ajax

## Ajax是什么，如何创建一个Ajax?

全称： `Asynchronous JavaScript And XML`
异步传输 + js + xml
也就是向服务器发送请求时，不必等待结果，而是可以同时做其他事情
等到有结果了它会自己根据设定进行后续操作
于此同时，页面不会整体刷新，提高了用户体验

创建：

```js
1.创建一个XMLHttpRequest对象，也就是创建一个异步调用对象
2.创建一个新的Http请求，并指定该HTTP请求的方法，url以及验证信息
3.设置响应HTTP请求状态变化的函数
4.发送HTTP请求
5.获取异步调用返回的数据
6.使用js和dom实现局部刷新
```

## Ajax如何解决浏览器缓存问题？

ajax请求中，只有get请求会有缓存

解决方案

```js
1.ajax请求前加上:ajaxObj.setRequestHeader('If-Modified-Since', '0');
2.ajax请求前加上:ajaxObj.setRequestHeader('Cache-Control', 'no-cache');
3.在URL后面加上一个随机数: "random=" + Math.random();
4.同理在url后面加上时间戳: "nowtime=" + (new Date()).getTime();
5.jq中，可以: $.ajaxSetup({cache: false});
```

## fetch与ajax

Ajax的本质是使用XMLHttpRequest对象来请求数据

fetch 是全局量 window 的一个方法，它的主要特点有：

- 第一个参数是URL:

- 第二个是可选参数，可以控制不同配置的 init 对象

- 使用了 JavaScript Promises 来处理结果/回调:

- 从 fetch()返回的 Promise 将不会拒绝HTTP错误状态, 即使响应是一个 HTTP 404 或 500。
相反，它会正常解决 (其中ok状态设置为false), 并且仅在网络故障时或任何阻止请求完成时，它才会拒绝。

- 默认情况下, fetch在服务端不会发送或接收任何 cookies, 
如果站点依赖于维护一个用户会话，则导致未经认证的请求(要发送 cookies，必须发送凭据头).

- 如果想要在同域中自动发送cookie,加上 credentials 的 same-origin 选项

- same-origin值使得fetch处理Cookie与XMLHttpRequest类似。 否则，Cookie将不会被发送，导致这些请求不保留认证会话。

对于CORS请求，使用include值允许将凭据发送到其他域：

## ajax状态

ajax有五种状态（`readyState`）

```js
0: （未初始化）还没有调用send()方法

1: （载入）已调用send()方法，正在发送请求

2: （载入完成）send()方法执行完成，已经接收到全部响应内容

3: （交互）正在解析响应内容

4: （完成）响应内容解析完成，可以在客户端调用了
```