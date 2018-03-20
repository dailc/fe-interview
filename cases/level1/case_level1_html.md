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

## 行内元素有哪些？块级元素有哪些空(void)元素有那些？

1.行内

`span`，`a`，`i`，`b`，`strong`，`pre`，`img`，`select`

2.块级

`div`，`p`，`ul`，`ol`，`li`，`code`，`h1`，`dt`，`dl`，`dd`

3.空元素

，`br`，`hr`，`img`，`input`，`link`，`meta`

## load事件与DOMContentLoaded事件

当 onload（`DOM3级事件`） 事件触发时，页面上所有的DOM，样式表，脚本，图片，flash都已经加载完成了。

当 DOMContentLoaded 事件触发时，仅当DOM加载完成，不包括样式表，图片，flash。
(譬如如果有async加载的脚本就不一定完成)

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


## 表单内包含元素都有哪些

包含的元素:

```js
fieldset
legend
input text submit password
select
input checkbox radio
```

一些解释：

fieldset 标签将表单内容的一部分打包，生成一组相关表单的字段。
当一组表单元素放到 fieldset 标签内时，浏览器会以特殊方式来显示它们，
它们可能有特殊的边界、3D 效果，或者甚至可创建一个子表单来处理这些元素。

legend 元素为 fieldset 元素定义标题（caption）。

## label的作用是什么？如何用

label标签用来定义表单控制间的关系,
当用户选择该标签时（譬如点击label时），浏览器自动将焦点转到和标签相关的表单控件上

```html
  <label for="Name">Number:</label>
  <input type="text" name="Name" id="Name"/>

  <label>Date:<input type="text" name="B"/></label>
```

## 实现不使用border画出1px高的线，在不同浏览器的标准模式和怪异模式下都能保持一致的效果

使用div（主要是考虑怪异模式下-那个模式非常的古老）

```html
<div style="height:1px;overflow:hidden;background:black"></div>
```

如果兼容性没有这么多要求的话，方式更多

譬如after可以插入伪元素（较常用），然后定义高度为1px，content为''，可以进行绝对定位，再设置背景色

## 什么是cookie隔离？（或者说：请求资源时不要让它带cookie，怎么做）

如果静态文件都放在主域名下，那么静态文件请求的时候都带有的cookie的数据提交给server
浪费流量，不如隔离开

如何隔离：

因为cookie有跨域限制，因此跨域请求时默认不会带上cookie(当然可以手动强行打开的)
这样降低请求头部大小，减少请求时间

同时由于不会将cookie提交给server，也会减少server的解析环节，提高http解析速度

## 老项目的页面重构的一般流程

随意发挥

网站重构：
在不改变外部行为的前提下，简化结构，增加可读性，（但是前端行为是和重构前一致的）

对传统网站的重构一般是：
table改为div+css
是网站前端兼容现代浏览器（主要是css规范往w3c靠拢）
针对移动端的优化
针对seo优化（这点对产品级别的网站很有必要）

网站重构需要考虑：
减少代码的耦合性
增加可拓展性
按照规范编写代码
设计更可拓展的API
增加用户体验（如性能优化）
使用新框架，新语言（如vue,react）

譬如可以将静态资源打包压缩合并
优化程序的数据读写等性能
采用cdn加速
http服务器的缓存
dom操作优化

## img的alt与title有何异同

- `alt`是当图像无法显示时候的替代文字

- `title`则是图像正常加载，然后鼠标刷上去时显示的提示文本

## 网页验证码是干嘛的，是为了解决什么安全问题？

主要作用是：区分是计算机程序自动操作还是人为手工操作

可以防止恶意破解密码，刷票，论坛灌水等

在国内，最早应该是为了防止暴力穷举密码，最主要是防止机器人

## 知道什么是webkit么? 知道怎么用浏览器的各种工具来调试和debug代码么?

Chrome（现在是blink）,safari浏览器的内核

准确的说，chrome是基于chromium引擎，而使用webkit内核

weblit是当初苹果开源的
google在次基础上开发了chromium（现在内核变为了blink）

chrome中的devtools的调试工具