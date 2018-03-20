# http缓存

## http 200 From cache和200 ok

三种状态码：

- 200 ok

    - 正常的网络请求

- 200 OK (from cache)

    - 指的是浏览器都没和服务器确认，直接用了浏览器缓存。

- 304 (Not Modified)

    - 比 200 OK (from cache) 慢，指的是浏览器还向服务器确认了下 "If-Not-Modified"，才用的缓存。
    

所以 Chrome 里面，长时间缓存有时候显示为 200 OK（from cache），有时候显示为 304 Not Modified。

前者是直接按回车访问时发生，后者是按了 F5 刷新、或是 Entity Tag 没有正确禁用的情况。

涉及到的头部

- `If-Modified-Since/Last-modified`: 

服务器程序检查请求头(`request header`)里面的(`If-modified-Since`)，
如果最后修改时间相同(例如静态文件的Modified time 通过shell `ls -l`可以查看)则返回304，
否则给返回头(`response header`)添加`last-Modified`并且返回数据(response body)。
    
- `If-None-Match/Etag`：

服务器程序检查检查请求头(`request header`)里面的`if-none-match`的值与当前文件的内容通过hash算法
（`例如 nodejs: cryto.createHash('sha1')`）生成的内容摘要字符对比，相同则直接返回`304`，
否则给返回头(`response header`)添加`etag`属性为当前的内容摘要字符，并且返回内容。

ETag的值是服务端对文件的索引节，大小和最后修改时间进行Hash后得到的。

- 强缓存（也就是上述的from cache）

如果设置了`Expires`(XX时间过期)或者`Cache-Control（http1.0不支持）`(经历XX时间后过期)且没有过期，命中`cache`的情况下，
`from cache`不去发出请求。如果强刷（如ctrl+r）会发起请求，但是如果没有修改会返回`304`内容未修改，如果已经改变则返回新内容。

expires/cache-control 虽然是强缓存，
但用户主动触发的刷新行为，还是会采用缓存协商的策略，主动触发的刷新行为包括点击刷新按钮、右键刷新、f5刷新、ctrl+f5刷新等。

如果在控制台里面选中了`disable cahce`则无论如何都会请求最新内容(304协商缓存、强缓存都无效)
因为此时不会检查本地是否有缓存；请求头信息(request header)既没有If-Modified-Since也没有If-None-Match来让服务端判断。

```html
<meta http-equiv="Cache-Control"content="max-age=0"/>
```

这行代码的作用是不让页面缓存，每次访问必须到服务器读取


## 什么是E-tag、last-modified、max-age、Expires、Cache-Control

E-tag是http1.1加入的

它的作用大概是：当前请求资源的hash值（类似于资源指纹）。
额，里面还有强ETAG和弱ETAG的区别

它的作用其实与last-modified雷同（这个是http1.0的，一般不建议同时使用），不过更精确。
last-modified精度在s内，而E-tag只要改变，指纹就会变更

一般的流程是：

- 客户端使用`If-None-Match`字段查询（里面的内容就是ETAG的内容）

- 服务端的HttpReponse Header中包含Etag

- 如果两者匹配，服务端会直接返回304(Not Modified) Response


还有其它的：max-age与Expires


Expires（http1.0）=时间（缓存的载止时间，服务端时间）
可以结合Last-Modified与E-tag使用。
用于控制请求文件的有效时间，当请求数据在有效期内时客户端浏览器从缓存请求数据而不是服务器端.
当缓存中数据失效或过期，才决定从服务器更新数据。

譬如：

```js
Expires: Fri, 30 Oct 1998 14:19:41
```

max-age（http1.1，Cache-Control头部中的一个属性）=秒（资源在本地缓存多少秒）
的作用和Expires类似，
如果max-age和Expires同时存在，则被Cache-Control的max-age覆盖。

譬如：

```js
Cache-Control: max-age=3600, must-revalidate
```

为什么要加max-age？

因为Expires 的一个缺点就是，返回的到期时间是服务器端的时间，
这样存在一个问题，如果客户端的时间与服务器的时间相差很大，那么误差就很大，
所以在HTTP 1.1版开始，使用Cache-Control: max-age=秒替代。

同时使用last-modified与E-tag（可以被允许同时支持）

Last-Modified和ETags请求的http报头一起使用，服务器首先产生Last-Modified/Etag标记，
服务器可在稍后使用它来判断页面是否已经被修改，来决定文件是否继续缓存

- 客户端请求一个页面（A）。

- 服务器返回页面A，并在给A加上一个Last-Modified/ETag。

- 客户端展现该页面，并将页面连同Last-Modified/ETag一起缓存。

- 客户再次请求页面A，并将上次请求时服务器返回的Last-Modified/ETag一起传递给服务器。

- 服务器检查该Last-Modified或ETag，并判断出该页面自上次客户端请求之后还未被修改，
直接返回响应304和一个空的响应体。

总结下：

- 浏览器端：If-Modified-Since，If-None-Match分别代表最后一次改动以及etag

- 服务端响应：Last-Modified，ETag分别代表最后的变动时间以及当前文件的etag

如果不符合，缓存就会失效

还有Pragma头域，在HTTP/1.1协议中，它的含义和Cache- Control:no-cache相同。

```html
<MMETA HTTP-EQUIV="Pragma" CONTENT="no-cache">
```