# html5特性

## 如何区分 HTML 和 HTML5

1. 通过doctype声明，H5是`DOCTYPE html`

2. 通过DOM架构中的一些标签，很多都是H5中才有

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

## html的几个版本以及html5？

首先，梳理下html的起源史，大概是这样的：

```js
超文本标记语言(第一版) -- 在1993年6月发为互联网工程工作小组(IETF)工作草案发布(并非标准)
 
HTML 2.0 -- 1995年11月作为RFC 1866发布,在RFC 2854于2000年6月发布之后被宣布已经过时

HTML 3.2 -- 1996年1月14日,W3C推荐标准

HTML 4.0 -- 1997年12月18日,W3C推荐标准

HTML 4.01(微小改进) -- 1999年12月24日,W3C推荐标准

ISO/IEC 15445:2000("ISO HTML")--2000年5月15日发布,基于严格的HTML 4.01语法,是国际标准化组织和国际电工委员会的标准

XHTML 1.0 -- 发布于2000年1月26日,是W3C推荐标准,后来经过修订于2002年8月1日重新发布
 
XHTML 1.1 -- 于2001年5月31日发布（主要是初步进行了模块化）

XHTML 2.0 -- W3C工作草案

HTML5 -- 2014年10月29日，万维网联盟宣布，经过接近8年的艰苦努力，该标准规范终于制定完成。
```

简单的说

```js
最常用的html版本有html 4.01和html5

XHTML 是 XML 风格的 HTML

HTML5 是下一代 HTML，取代 HTML 4.01
```

最大的不同：

```html
H5是Html的新一代标准，而且不再是SGML(Standard Generalized Markup Language-标准通用标记语言)的子集。
而4.01之类的都属于SGML的一个子集

使用更简洁的头部
<!DOCTYPE html>
```

另外

```js
HTML 没有1.0版本是因为当时有很多不同的版本。
第一个正式规范在为了和当时的各种HTML标准区分开来,使用了2.0作为其版本号

HTML 4.0同样也加入了很多特定浏览器的元素和属性，但是同时也开始"清理"这个标准，
把一些元素和属性标记为过时的，建议不再使用它们。HTML的和CSS结合更好。

尚未完成的XHTML 2.0标准，它要求强错误检查，于是没有人采用
```

参考:

[http://www.pinhuba.com/html/101032.htm](http://www.pinhuba.com/html/101032.htm)