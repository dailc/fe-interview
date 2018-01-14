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

## viewport的理解？

`layout viewport`（布局视口）
移动设备浏览器一般都会默认设置一个viewport标签
它的作用是定义一个虚拟的`layout viewport`，用于解决早期的页面在手机显示问题

譬如默认情况下iOS,android中将这个视口分辨率设置为`980px`
所以，pc端网页基本能在手机上展示，只不过元素看起来很小（默认可以通过手指缩放）

当然也可以自己设定一个宽-一般会取`device-width`，这也是下面会提到的。

- visual viewport（视觉视口）和物理像素
visual viewport（视觉视口）为物理屏幕的可视区域
屏幕显示器的物理像素，同样尺寸的屏幕，像素密度大的设备，硬件像素会更多
例如iPhone的物理像素：

```js
    iPhone5 ：640 * 1136
    iPhone6：750 * 1334
    iPhone6 Plus：1242 * 2208
```

- ideal viewport（理想视口）和 dip （设备逻辑像素）

    - ideal viewport（理想视口）通常是我们说的屏幕分辨率。
    
    - dip （设备逻辑像素）跟设备的硬件像素无关的。一个 dip 在任意像素密度的设备屏幕上都占据相同的空间。

比如MacBook Pro的 Retina （视网膜）屏显示器硬件像素是：2880 * 1800。
当你设置屏幕分辨率为 1920 * 1200 的时候，ideal viewport（理想视口）的宽度值是1920像素，
那么 dip 的宽度值就是1920。设备像素比是1.5（2880/1920）。
设备的逻辑像素宽度和物理像素宽度（像素分辨率）的关系满足如下公式：

```js
    逻辑像素宽度*倍率 = 物理像素宽度
```

而移动端手机屏幕通常不可以设置分辨率，一般都是设备厂家默认设置的固定值
，换句话说 dip 的值就是 ideal viewport（理想视口）（也就是分辨率）的值

譬如，iPhone的屏幕分辨率：

```js
    iPhone5 ：分辨率 320 * 568，物理像素 640 * 1136，@2x
    iPhone6：分辨率 375 * 667，物理像素 750 * 1334，@2x
    iPhone6 Plus ：分辨率 414 *  736，物理像素1242 * 2208，@3x，（
    注意，实际显示图像等比降低至1080×1920，具体原因查看：http://www.css88.com/archives/5972）
```

更多设备的 ideal viewport（理想视口）可以查看http://viewportsizes.com/

- css像素

    - CSS像素（px）用于页面布局的单位。样式的像素尺寸（例如 width: 100px）是以CSS像素为单位指定的。
    
    - CSS像素与 dip 的比例即为网页的缩放比例，如果网页没有缩放，那么一个CSS像素就对应一个 dip（设备逻辑像素）    
    （譬如为device-width时，css像素与逻辑像素一样）

使用viewport元标签控制布局，通常使用如下标签

```html
<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1; user-scalable=no;">
```

`width`属性被用来控制`layout viewport`（布局视口）的宽度，layout viewport（布局视口）宽度默认值是设备厂家指定的。

iOS, Android基本`默认`都将这个视口分辨率设置为 `980px`。
我们可以 `width=320` 这样设为确切的像素数，也可以设为`device-width`这一特殊值
一般为了自适应布局，普遍的做法是将width设置为device-width

`width=device-width` 也就是将layout viewport（布局视口）的宽度设置 ideal viewport（理想视口）的宽度。
网页缩放比例为100%时，一个CSS像素就对应一个 dip（设备逻辑像素）
，而layout viewport（布局视口）的宽度，ideal viewport（理想视口）的宽度（通常说的分辨率），
dip 的宽度值是相等的。

height与width类似，但实际上却不常用。

viewport中的其它几个属性：

- initial-scale用于指定页面的初始缩放比例：
initial-scale=1 表示将layout viewport（布局视口）的宽度设置为 ideal viewport（理想视口）的宽度，
initial-scale=1.5 表示将layout viewport（布局视口）的宽度设置为 ideal viewport（理想视口）的宽度的1.5倍。

- maximum-scale用于指定用户能够放大的最大比例，例如

- minimum-scale是用来指定页面缩小比例的。通常情况下，不会定义该属性的值，页面太小将难以阅读。

- user-scalable来控制用户是否可以通过手势对页面进行缩放。该属性的默认值为yes，可被缩放，你也可以将该值设置为no，表示不允许用户缩放网页。



## meta viewport minimum-scale无效？

```html
<meta name="viewport" content="width=device-width, minimum-scale=0.5, initial-scale=1.0, maximum-scale=3.0">
```

这样声明时会发现页面只能放大不能缩小

可能与兼容性有关，譬如有一种说法是：
Android WebKit内核和IE浏览器的layout viewport永不会小于`320px`。

## 把 Script 标签 放在页面的最底部的body封闭之前 和封闭之后有什么区别？浏览器会如何解析它们？

标准规定应该是放在body封闭之前

但实际上放之后，浏览器也是能正常解析的
但是这时候的解析规则是：
“body标签闭合之后”后再出现script或任何元素的开始标签，
都是parse error，浏览器会忽略之前的</body>，即视作仍旧在body内。所以实际效果和写在“body标签闭合之前”之前是没有区别的。

## png、jpg、gif这些图片格式解释一下，分别什么时候用。有没有了解过webp？

GIF：
Graphics Interchange format（图形交换格式）
是一种索引颜色格式，在颜色数很少时，产生的文件极小
优点：
1.支持背景透明
2.支持动画
3.支持图形渐进
4.支持无损压缩
5.水平扫描
最大的缺点是最多只有256中颜色

jpeg：
Joint Photograhic Experts Group（联合图像专家组）
优点：
1.支持上百万中颜色
2.使用更有效的有损压缩，文件体积更小
3.更适合与照片
缺点是会损失一些细节（如艺术线条），而且有损压缩不可逆，另外就是不支持图形渐进和背景透明

png:
(Portable Network Graphic Format，PNG)流式网络图形格式
目的是企图替代GIF和tiff格式
优点：
1.存储灰度图像时，深度可多达16位
2.存储彩色图像时，深度多达48位
3.还可存储16位的透明通道
4.从LZ77派生的无损数据压缩算法。
缺点是体积相对jpg较大，对于普通图片来说，保留了过多的无用细节

一般色彩较少的纯色背景小图标等可用gif
有透明度要求的色彩丰富的可用png
其他用jpg(特别适合与普通的图片-要求不高的)

webp:（同时支持有损和无损）
google开发的一种旨在加快图片加载速度的图片格式

当有损压缩，相比较与jpg，编码同样质量的webp文件需占用更多的计算资源（体积更小，比jpg小40%）

它具有更优的图像数据压缩算法，能带来更小的图片体积，而且拥有肉眼识别无差异的图像质量；
同时具备了无损和有损的压缩模式、Alpha 透明以及动画的特性，
在 JPEG 和 PNG 上的转化效果都相当优秀、稳定和统一。

chrome中基本都支持webp

ios中还需第三方插件转换