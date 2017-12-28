# 难度等级1，最常见的一些概念，初级必须了解

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

## 行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？

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