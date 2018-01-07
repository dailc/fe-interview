# 难度等级2，进阶需掌握

## background-image和img标签，什么时候不推荐使用背景图片？

background-image的作用是给div添加背景图片显示（只是作为样式，大小仍然由div决定）
img标签则是插图一张图片，会占大小（当然也可以通过样式固定）

以下情况中不推荐使用背景图：

- web浏览器不会打印背景，所以像地图导航之类的，推荐插入img而不是背景图

- 搜索引擎不会搜索css，所以如果图片对网站有用（譬如本身属于终于内容，需要seo等），就推荐使用img标签，并且使用`alt`属性

## CSS3新增伪类有那些？

实际上都不一定完全记得住，但是要有概念

```js
:after
:before
:enabled
:disabled
:checked

p:first-of-type
p:last-of-type
p:nth-child(2)
```

## 请解释一下CSS3的Flexbox（弹性盒布局模型）,以及适用场景？

是`display`的一个属性

一个用于页面布局的全新css3功能
flexbox可以把列表放在同一个方向（从上到下或左到右），并让列表延伸到占用可用的空间

采用flex布局的元素位flex容器,它的所有子元素都是容器成员（flex item）

常规布局是基于块和内联流方向，而flex布局是基于flex-flow流，可以很方便的用来对不同屏幕大小进行适应
布局上比以前更灵活

## 用纯CSS创建一个三角形的原理是什么？

一般是隐藏其它几个边（颜色设为transparent），需要设置的角的反面设置颜色，譬如

```js
#demo {
    width: 0;
    height: 0;
    border-width: 20px;
    border-style: solid;
    border-color: transparent transparent red transparent;
  }
```

上右下左映射为下左上右

当然，有时候需要对定位进行一些调整

## css多列等高如何实现？

利用padding-bottom,margin-bottom正负值相抵

设置父容器设置overflow:hidden
这样父容器的高度就是它里面的列没有设置padding-bottom时的高度
当它里面的任意一列高度增加了，父容器的高度被撑到了里面最高列的高度

其它比这列矮的列会用它们的padding-bottom补偿这部分高度差

(这不是自适应的高度，只是利用了overflow:hidden来隐藏两边div的多余部分。)

给左右两个div分别设置了一个200像素高的空白占位高度，
把整个div往上挤了200像素，
然后又通过负的margin把div往下挪200像素。(-200相当于下面200多余的被剪切了一样)
当中间的div高度到了200以上的时候
（准确的说是比两边div内部除了padding之外的高度多200以上），
左右两边的div高度可能就不够了，会比中间矮。

譬如

```css
#first {
    overflow: hidden;
    border: 1px solid red;
}
#second {
    float: left;
    width: 30 % ;
    padding-bottom: 200px;
    margin-bottom: -200px;
    border: 1px solid blue;
}
#third {
    float: left;
    width: 30 % ;
    padding-bottom: 200px;
    margin-bottom: -200px;
    border: 1px solid green;
}
```

## 如何居中div？如何居中一个浮动元素？如何让绝对定位的div居中？

1.居中div

```js
// 水平居中
width: xxpx
margin: 0 auto;
```

2.居中浮动元素

- 浮动元素外面套一层div，然后普通div居中

- 父元素和子元素同时浮动，父元素的`left:50%`，子元素的`left:-50%`

3.居中absolute

- left为`50%`，然后`margin-left: -width/2`
（如果不知道尺寸，可以使用）

```js
-webkit-transform: translate(-50%,-50%);  
      -ms-transform: translate(-50%,-50%);  
          transform: translate(-50%,-50%);  
```

4.inline-block实现居中

```html
<div class="center-container is-inline">  
  <div class="center-block">  
    <!-- CONTENT -->  
  </div>  
</div>  

.center-container.is-inline {   
  text-align: center;  
  overflow: auto;  
}  
  
.center-container.is-inline:after,  
.is-inline .center-block {  
  display: inline-block;  
  vertical-align: middle;  
}  
  
.center-container.is-inline:after {  
  content: '';  
  height: 100%;  
  margin-left: -0.25em; /* To offset spacing. May vary by font */  
}  
  
.is-inline .center-block {  
  max-width: 99%; /* Prevents issues with long content causes the content block to be pushed to the top */  
  /* max-width: calc(100% - 0.25em) /* Only for IE9+ */   
}
```

关键在于inline-block可以vertical-align: middle;  实现垂直居中
水平居中依赖于margin-left: -0.25em;的作用是去除inline-block时空白字符的宽度-不同的字体和大小需要进行调整
after中height: 100%;的作用是自适应撑开高度，便于inline-block垂直居中计算

优点：

-  高度可变

-  内容溢出会将父元素撑开。

-  支持跨浏览器，也适应于IE7。

缺点：

- 需要一个容器

- 水平居中依赖于margin-left: -0.25em;该尺寸对于不同的字体/字号需要调整。

- 内容块宽度不能超过容器的100% - 0.25em。


5. flex-box

这是目前的布局趋势
可以解决像垂直居中这样的常见布局问题
也可以分栏或者解决一些令人抓狂的布局问题。

优点：

- 内容块的宽高任意，优雅的溢出。

- 可用于更复杂高级的布局技术中。

缺点：

- IE8/IE9不支持。

- Body需要特定的容器和CSS样式。

- 运行于现代浏览器上的代码需要浏览器厂商前缀。

- 表现上可能会有一些问题

## css实现垂直水平居中

![](center_vandh.png)

```js
.center-container {  
  position: relative;  
  width: 200px;
  height: 200px;
  background: #008855;
}  
  
.absolute-center {  
  width: 50%;  
  height: 50%;  
  overflow: auto;  
  margin: auto;  
  position: absolute;  
  top: 0;
  left: 0; 
  bottom: 0; 
  right: 0;  
  background: #0000CC;
}  
```

如上代码可以实现绝对的垂直水平居中

优点：

1.支持跨浏览器，包括IE8-IE10.

2.无需其他特殊标记，CSS代码量少

3.支持百分比%属性值和min-/max-属性

4.只用这一个类可实现任何内容块居中

5.不论是否设置padding都可居中（在不使用box-sizing属性的前提下）

6.内容块可以被重绘。

7.完美支持图片居中。

缺点：

1.必须声明高度（查看可变高度Variable Height）。

2.建议设置overflow:auto来防止内容越界溢出。（查看溢出Overflow）。

譬如还可以单独的设置
left: auto; right: 20px;...
等等来适应各种布局
而且加上min-width/max-width 和min-height/max-height这些属性在自适应盒子内的表现也和预期很一致。
给内容块元素加上padding也不影响内容块元素的绝对居中实现。

可以加上 overflow: auto;  处理内容高度大于块元素或容器（视区viewport或设为position:relative的父容器）的溢出问题

可以通过resize: both;  来处理窗口改变的重绘问题


### 安卓上如何实现1px像素线？

先看看按照正常思路如何实现这个逻辑：

```css
border:1px solid #000
```

但是，用这个后，会发现在高分辨率的手机中，线会变胖，并不是1px

原理如下：

iPhone 3GS 和 iPhone 4 的像素分别是 320px 和 640px，但是显示屏的宽度却却都是相同的，
所以为了在所有设备上渲染出的显示效果相同，CSS 中的 1px 映射到 iPhone 4 的物理像素上，就会是 2px
同样的道理，在 iPhone 5、6 上 CSS 的 1px 对应物理像素 2px，6plus 则是 3px

上述的描述就是：逻辑分辨率和物理分辨率的区别，一般通过设置下面的meta实现（设置后视口中的像素和物理像素就又一个比例了）

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

所以当我们设置 1px 时，实际的显示效果其实是由两个甚至三个像素点所绘制的

那么如何设置真实的1px线？（注意，android中，直接0.5px并不适应-或许未来可以，但现在还是不能这样）

- 先放大，然后利用transform(scale(0.5));缩小（一般不会单独兼容3倍像素的，兼容2devicePixelRatios就可以了）
即构建1个伪元素, 将它的长宽放大到2倍, 边框宽度设置为1px, 再以transform缩放到50%.
（为什么放大200%，因为，需要缩小0.5，否则的话可能长度就不对了，比如绘制100px的1px宽线，先绘制200px的2px，然后缩小一半）
-1csspx(实际两像素),缩小0.5后就是实际一像素

- 或者通过设置对应viewport的rem基准值，这种方式就可以像以前一样轻松愉快的写1px了。
(2的时候，viewport缩放为0.5,3的时候，viewport缩放为0.33，然后这样就1px就是实际的像素了（不过和viewport为1时的像素大小是不一样的，注意）)
或者用对多背景渐变实现的也有

## li与li之间有看不见的空白间隙是什么原因引起的？有什么解决办法？

行框的排列会受到中间空白（回车，空格）的影响，
因为空格也属于字符，这些空白也会被应用样式，占据空间，所以会有间隔

把字符大小设为0，就没有空格了

## chrome中可以显示11px大小的文本么？

chrome浏览器中，默认会有一个最小字体限制

小于12px的文本会默认按照12px显示

如何解决：

```css
-webkit-text-size-adjust: none;
```

这样可以关闭chrome的自动调整，就不会有这个问题了

## absolute的containing block(容器块)计算方式跟正常流有什么不同？

absolute中的定位都会找到其祖先position不为static的元素，然后判断
1.若此元素为inline元素，则containing block就是
    能包含这个元素生成的第一个和最后一个inline box的padding box(除margin,border外的区域)的最小矩形
2.否则，则由这个祖先元素的padding box构成

如果都找不到，则为 initial containing block

supplement:
1.static/relative: 简单的说就是它的父元素的内容框（去掉padding部分）
2.absolute: 向上找最近的定位不为static
3.fixed:它的containing block一律为跟元素(html/body)，跟元素也是initial containing block