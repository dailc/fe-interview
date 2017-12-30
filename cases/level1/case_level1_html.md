# 难度等级1，最常见的一些概念，初级必须了解

## html5有哪些新特性、移除了那些元素

增加:

```js
canvas
sessionStorage
localStorage
webworker
websocket
Geolocation
video
audio

标签元素
article
nav
footer
section
header
calendar
date
url
search
```

移除了一些:

```js
表现型
basefont
big
center
font
s
strike
tt
u
可用型
frame
frameset
noframes
等
```

## HTML5 为什么只需要写 `<!DOCTYPE HTML>`，而不是`<!DOCTYPE HTML PUBLIC "-xxx.dtd">`？

因为HTML5已经不再是SGML的子集，浏览器识别到`!DOCTYPE HTML`即可判断是H5页面

HTML5与HTML4.01的区别

- HTML5不基于SGML，因此不需要DTD引用，但也需要doctype来规范浏览器的行为

- HTML4.01基于SGML，所以需要对DTD进行引用，才能告知浏览器使用的文档类型

## HTML5的一些特点

1. H5不再基于SGML，而是作为一个独立的版本

2. H5使用新的头部声明类别`DOCTYPE html`声明

3. H5语言规则定义更为完善，H5减少了Flash的依赖，能够不依赖于Flash完成网页的功能

4. H5对移动端的兼容很到位，目前几乎所有浏览器都支持H5。通过H5+CSS3，让移动开发成为主流。

5. html5新增了自己独特的元素(video,canvas,footer标签等)

Html5新元素(如header、nav、footer、adide、article、section等标签，audio、video、 canvas、geolocation等新的元素)，
表单控件(calender、date、time、email、url、search)，
新的API(如localStorage、sessionStorage、indexedDB、websocket)，
增加离线缓存(可以通过manifest配置- <html manifest=”路径”>)，
废弃了部分属性(如img废弃name、html废弃version、form废弃accept…)，

## 简述一下对HTML语义化的理解？

譬如`<stoing>`是语义化的强调，语音设备会重读，而`<b>`仅仅是自然样式上的加粗

通用，如果是列表，优先使用`ul,li`，而不是`div`大法层层嵌套

即用正确的标签做正确的事情

语义化的好处：

1. html语义化让页面内容结构化，结构更清晰，便于浏览器解析

2. 而且即使丢失css，也能保持基本格式

3. 搜索引擎依赖于html标记来确定上下文和关键字权重，利于seo

4. 同样，阅读源码时也更容易将网站分块，便于阅读维护理解

## 行内元素有哪些？块级元素有哪些空(void)元素有那些？

1.行内

`span`，`a`，`i`，`b`，`strong`，`pre`，`img`，`select`

2.块级

`div`，`p`，`ul`，`ol`，`li`，`code`，`h1`，`dt`，`dl`，`dd`

3.空元素

，`br`，`hr`，`img`，`input`，`link`，`meta`

## load事件与DOMContentLoaded事件

当 onload 事件触发时，页面上所有的DOM，样式表，脚本，图片，flash都已经加载完成了。

当 DOMContentLoaded 事件触发时，仅当DOM加载完成，不包括样式表，图片，flash。
(譬如如果有async加载的脚本就不一定完成)

## 页面导入样式时，使用link和@import有什么区别？

1. link属于XHTML标签的，除了加载css外，还能用于定义RSS，定义REL链接属性等作用，也可以加载一些其它文件，而且所有浏览器都支持
页面被加载的同时，link会被加载，link加载时不会阻塞页面，而是会异步加载（譬如某浏览器可同时并发下载5个css）
(注意，并行下载，甚至可以并行解析dom，但是会阻塞DOM的渲染)

2.@import是css中才有的，只能用来载入css
@import加载时会阻塞，也就是说，如果css用@import来加载，因为即便在头部书写，也会在页面结构被渲染后才加载css，造成页面的可能无样式的尴尬。
@import是css2.1提出的，只有IE5上才能被识别，link是XHTML标签，无兼容问题（现在一般无需考虑IE兼容）
一般的页面规范中都是禁止使用@import加载的，很影响体验

## 知道defer和async么，它们的作用？

- async：异步加载脚本

用了它后的作用就是：

立即加载脚本，但是异步加载，也就是说页面的其它操作并不会暂停，并且只对外部脚本生效

- defer：延迟执行脚本

用了它后的作用就是：

立即下载，但延迟执行（同样异步加载），这个脚本会被等到文档完全解析和显示后再执行，并且只对外部脚本生效

- 否则，如果普通的script，下载和执行时都会阻塞文档解析

## 描述下cookies,sessionStorage,localStorage的区别

cookie是网站为了标志用户身份而存储在用户本地终端上的数据（会有加密）

cookie在同源的http请求中总是会携带（即使不需要），
跨域的ajax请求需要开启`xhr`的`withCredentials`为`true`
很多情况下都是服务端读取cookie中的jsessionid，然后根据服务端的session判断是那一个用户

sessionStorage和localStorage仅本地保留，不会发送给服务端

大小限制：

cookie一般不能超过4k
sessionStorage和localStorage一般是5m左右

时间限制：

localStorage: 持久化，永久保存，除非主动删除
sessionStorage: 当前浏览器窗口关闭后删除
cookie: 设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭