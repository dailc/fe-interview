# 难度等级3，进阶高阶需掌握，不一定都是难点，也有可能是很偏僻

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


## noscript标签知道么？

这是为了解决早起浏览器不兼容javascript或者脚本被禁用后的问题而创造出的标签

```html
<noscript>
<p>本页面需要浏览器支持（启用）javascript</p>
</noscript>
```

示例如上
只是为了提升用户体验，现在一般用不到

## 加载远程脚本时，script标签中嵌入执行代码会怎么样？

例如

```html
<script src="xxx.jd">
alert('hello world');
</script>
```


JavaScript高级程序设计中有提到过：

带有src属性的script标签中嵌入的任何代码都会被忽略（也就是说这个标签只会去加载src，不会执行中间的代码），
所以上述的alert无效


## HTML5的form如何关闭自动完成功能

自动完成功能的意思时：输入的时候会有补全提示

给不想提示的form或某个input设置为`autocomplete=off`

默认整个表单是默认开启（自动补全字段-根据以前输入）


## webSocket如何兼容低版本浏览器

注意，IE >= 10 才支持websocket，注意，以下方案，在现代浏览器中，已经被淘汰，非常不建议使用

- 用Adobe Flash Socket

- Active HTMLFile(IE的控件)

- 基于multipart编码发送XHR（流化，服务器会维护一个持续更新和保持打开的开放响应，除非超时或主动关闭）
    需要浏览器支持才行
    
- 基于长轮询的XHR(keep-alive, 如果没数据，会一直挂起，知道等到数据，有数据会返回，然后结束后再次向服务器请求)
    建立多个长连接可能会造成阻塞，要考虑性能
    
## 页面可见性（visibility）可以有哪些用途？

通过visibilityState的值检测页面当前是否可见，以及打开网页的时间等

可以在页面被切换到其它后台进程时，自动暂停音乐或视频的播放

document.visibilityState返回当前页面的可见性，有以下值

- hidden

- visible

- prerender，预渲染

- preview，预览（如win7鼠标放底部预览时）


visibilityChange: 当可见性状态改变时触发的事件