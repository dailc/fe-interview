# 难度等级2，进阶需掌握

## Doctype的作用？Doctype的来由？

doctype用来决定页面以什么样的方式渲染，位于文档的最前面的位置(<html>标签前)

如HTML5中的头部是`!doctype html`

如HTML4.01中DTD可以决定以什么样的格式来渲染

起的作用：

如果没有doctype声明或者格式不正确会就是混杂模式（兼容模式），混杂模式兼容老版本的浏览器显示，
否则标准模式的排版和JS运作模式都是以改浏览器支持的最高标准运行

DOCTYPE的来由：

- 在很久以前的页面都是没有DOCTYPE的（也就是现在所说的非标准页面，怪异渲染模式/混杂模式）

- 后来，在加入新的标准后，为了和以前的页面版本区分，就想到了加上DOCTYPE（最初IE加上的，那时还IE代表业内先进水准）

- 所以就有了这个约定，如果有DOCTYPE，就解析对应的标准，并按对应标准解析，否则就是怪异模式下渲染

## 常见的几种`DOCTYPE`声明

常用的几种DOCTYPE声明：

- HTML 5

```html
<!DOCTYPE html>
```

- HTML 4.01 Strict

该 DTD 包含所有 HTML 元素和属性，但不包括展示性的和弃用的元素（比如 font）。不允许框架集（Framesets）。

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
```

- HTML 4.01 Transitional

该 DTD 包含所有 HTML 元素和属性，包括展示性的和弃用的元素（比如 font）。不允许框架集（Framesets）。

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
```

- HTML 4.01 Frameset

该 DTD 等同于 HTML 4.01 Transitional，但允许框架集内容。
（frameset-框架集的使用。能够将一个窗口按要求分割，并写出对应代码）

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">
```

- XHTML 1.0 Strict

该 DTD 包含所有 HTML 元素和属性，但不包括展示性的和弃用的元素（比如 font）。不允许框架集（Framesets）。必须以格式正确的 XML 来编写标记。
（必须严格闭合）

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
```

- XHTML 1.0 Transitional

该 DTD 包含所有 HTML 元素和属性，包括展示性的和弃用的元素（比如 font）。不允许框架集（Framesets）。必须以格式正确的 XML 来编写标记。
（必须严格闭合）

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
```

- XHTML 1.0 Frameset

该 DTD 等同于 XHTML 1.0 Transitional，但允许框架集内容。
（必须严格闭合）

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
```

- XHTML 1.1

该 DTD 等同于 XHTML 1.0 Strict，但允许添加模型（例如提供对东亚语系的 ruby 支持）。
（必须严格闭合）

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
```

## 如何处理HTML5新标签的浏览器兼容问题

如canvas，一般会加一句当前浏览器不支持canvas，用来提示用户

IE8/IE7/IE6支持通过document.createElement方法产生的标签，可以利用这一特性让这些浏览器支持HTML5新标签，
浏览器支持新标签后，还需要添加标签默认的样式

也可以直接使用成熟的框架、比如html5shim;

```html
<!--[if lt IE 9]>
    <script> src="http://html5shim.googlecode.com/svn/trunk/html5.js"</script>
<![endif]-->
```

## 详解下script标签中defer和async的区别？

- async：异步加载脚本

用了它后的作用就是：

立即加载脚本，但是异步加载，也就是说页面的其它操作并不会暂停，并且只对外部脚本生效

一般设置async="async"（古老的XHTML更是严格要求）

一些注意的地方：

异步加载的脚本并不确保执行顺序（所以建议异步脚本不要再加载期间修改dom），
异步脚本一定会在load事件前执行，但是可能在DOMContentLoaded事件的前面或后面

- defer：延迟执行脚本

用了它后的作用就是：

立即下载，但延迟执行（同样异步加载），这个脚本会被等到文档完全解析和显示后再执行，并且只对外部脚本生效

一般设置defer="defer"（古老的XHTML更是严格要求）

一些注意的地方：

html5规范要求，延迟加载的执行顺序是和引入顺序一样的，而且脚本执行顺序先于DOMContentLoaded事件
（但是实际上不一定按这个顺序，而且也不一定在DOMContentLoaded事件执行-浏览器的实现问题）

按规范来说，defer应该是立即异步下载并延迟执行，
但是实际实现来说，譬如chrome中defer是和将script放到body底部一样的效果。
（相当于延迟下载了-浏览器优化的结果）

- 如果同时使用async和defer，一般表现和async一致（如chrome中的实际效果）

- 否则，如果普通的script，下载和执行时都会阻塞文档解析


一般的使用常见：

在webkit引擎下，建议的方式仍然是把<script>写在<body>底部，
如果需要使用百度谷歌分析或者谷歌分析等独立库时可以使用async属性，
若<script>标签必须写在<head>头部内可以使用defer属性，

兼容性：

async在IE<=9时不支持，其他浏览器OK；defer在IE<=9时支持但会有bug，其他浏览器OK

按mdn中的说明，这两个属性是h5中规范的（其中async明确是属于h5，defer在html4.01可能已经存在，但目前基本都是h5，所以都有这两个属性的）

## HTML5的离线储存怎么使用，工作原理能不能解释一下？

在用户没有联网时可以正常访问站点或应用，联网时再更新机器上的缓存

原理：
html5离线缓存是基于.appcache文件的缓存机制（不是存储技术）
通过这个文件的解析清单离线存储资源
这些资源就像cookie一样会被存储下来，处于离线状态时浏览器会展示离线缓存数据

如何使用:

```js
1、页面头部像下面一样加入一个manifest的属性；
2、在cache.manifest文件的编写离线存储的资源；
    CACHE MANIFEST
    #v0.11
    CACHE:
    js/app.js
    css/style.css
    NETWORK:
    resourse/logo.png
    FALLBACK:
    / /offline.html
3、在离线状态时，操作window.applicationCache进行需求实现。
http://yanhaijing.com/html/2014/12/28/html5-manifest/
```

很少有使用这个，因为不好用。

它的优点：

- 可以离线运行

- 可以减少资源请求

- 可以更新资源

缺点：

- 更新的资源，需要二次刷新才会被页面采用

- 不支持增量更新，只有manifest发生变化，所有资源全部重新下载一次

- 缺乏足够容错机制，当清单中任意资源文件出现加载异常，都会导致整个manifest策略运行异常

但是移动app，如 hybrid中，这个优点不明显，而很麻烦，想要达到理想效果比较难。所以应用并不是很广。

## iframe有哪些缺点

- iframe会阻塞页面的onload事件

- 搜索引擎的检索程序无法解读这种页面，不利于seo

- iframe和主页面共享连接池，而浏览器对相同域的链接有限制，所以会影响页面的并行加载

如果一定要用iframe，最好是通过js动态给iframe添加src

## 如何实现浏览器内多个标签页之间的通信

- WebSocket（简单场景不建议使用），建立链接，多个页面可以交互

- localstorage API，它被添加，修改或删除时会触发一个事件

```js
window.addEventListener("storage", function(e){  
  console.log('key:', e.key); // "abc"
  console.log('oldValue:', e.oldValue); // null
  console.log('newValue:', e.newValue); // 123
});
```

但是需要注意，（无痕模式下，localStorage可能会有问题）

- 通过SharedWorker

```js
// main.html
var worker = new SharedWorker('shared.js');
// note: not worker.onmessage!
worker.port.onmessage = function(e) {
    // e.data
};

// shared.js
onconnect = function(e) {
  var port = e.ports[0];
  port.postMessage('Hello World!');
};
```

注意，页面必须同域，两个页面可以链接一个shareworker，页面A存储的数据页面B可以取出

worker这个新特性在某些场景下很实用，但是常常容易被人忽视。

## 如何在页面实现一个圆形的可点击区域？

1.border-radius 属性矩形区域变成圆形

2.圆形的svg

3.使用map+area，img标签usemap，area区域约定圆形区域

```html
<img src="xxx.png" width="1366" height="768" border="0" usemap="#Map" />  
<map name="Map" id="Map">  
<area shape="circle" coords="100,100,50" href="https://www.baidu.com" target="_blank" />  
</map>
```

map + area可以让一张图片拥有多个超链接(也可以监听实现自定义事件)

4.纯JS实现，譬如获取鼠标坐标，通过算法判断是否在目标圆形之内（不建议）
