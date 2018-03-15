# 难度等级2，进阶需掌握

## 相对定位

在使用相对定位时，无论是否移动，元素仍然占据原有空间。
因此移动元素会导致它覆盖其它框

而绝对定位则因为不在文档流中，因此不占据空间，不会覆盖

## css选择器从右到左解析

虽然css选择器的生效规则是从左到右，依次可以覆盖之前的样式，
但是，CSS选择器的解析规则是从右往左解析的

原因是：为了更快的找到对应的样式，算是一种优化规则

因为实际过程中，拥有公共祖先节点的选择器可能会有不少，
这样会有一个问题时，前边的公用规则都解析了，然后最后一个不匹配，
然后就造成了浪费，
因此优化成从右到左解析，最后一个如果不匹配，直接就匹配失败，
减少匹配时间

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

## 请解释下为什么需要浮动？清除浮动的方式

清除浮动主要是为了清除浮动元素产生的影响
浮动的元素，高度会坍塌，高度坍塌使得页面后面的布局不能正常显示

方法：

overflow:hidden触发生成bfc,bfc会计算浮动元素高度
父级div定义height
父级的div也一起浮动
clear:both属性

```js
.clearfix::before, .clearfix::after {
    content: " ";
    display: table;
}
.clearfix::after {
    clear: both;
}
.clearfix {
    *zoom: 1;
}

sass中
&::after,&::before{
        content: " ";
          visibility: hidden;
          display: block;
          height: 0;
          clear: both;
    }
```

原理：

display:block 使得元素以块级元素显示，占满剩余空间
height：0 避免生成内容破坏原有布局的高度
visibility:hidden 使生成的内容不可见，并允许可能被生成内容盖住的内容可以进行点击和交互;
通过 content:"."生成内容作为最后一个元素，至于content里面是点还是其他都是可以的，
例如oocss里面就有经典的 content:".",有些版本可能content 里面内容为空,一丝冰凉是不推荐这样做的,
firefox直到7.0 content:”" 仍然会产生额外的空隙；
zoom：1 触发IE hasLayout。
除了clear：both用来闭合浮动的，其他代码无非都是为了隐藏掉content生成的内容，
这也就是其他版本的闭合浮动为什么会有font-size：0，line-height：0。

## clear:both的作用

css1和css2中都有，在 CSS2.1 中，会在元素上外边距之上增加清除空间，而外边距本身并不改变。
clear:both用来清除浮动效果，利用清除浮动来把外层的div撑开
clear属性规定元素的哪一侧不允许元素浮动
left:左侧不允许浮动
right:右侧不允许浮动
both:左右两侧不允许浮动
none:默认值，允许两侧的元素浮动
inherit:(任何ie都不支持)规范从父元素继承clear属性的值

比如如果两个元素都用了float，然后用了clear:left，
那么第一个元素布局时先判断左侧是否有浮动元素， 结果判断没有，正常布局，

第二个元素布局时继续判断左侧是否有浮动元素，结果确实有浮动元素，
所以根据规则(左侧不允许有浮动)，第二个元素顺延到第一个元素的下面去了，

接下来继续判断其它元素
通常，如果一个div内部，有多个浮动元素，那么这些浮动元素会脱离正常流(文档流)，
这时候需要会在最后的浮动元素插入一个空的元素，然后设置clear:both以此来清除浮动，
这样，后面的元素就不会被前面的浮动元素影响了(一般会通过::after伪元素实现)

相比而言:overflow:hidden并不是清除浮动，它只是由于触发了bfc，所以内部的浮动元素一起计算高度而已

## overflow:hidden的作用是什么？

`overflow:hidden`

规定当内容溢出元素时，自动修剪（变为不可见），同时会触发bfc(这点常用于去除浮动影响)

overflow属性规定当内容溢出元素框时发生的事情，可选值如下:
visible:默认值，内容不会被修剪，会呈现在元素框之外
hidden:内容会被修剪，并且其余内容不可见，而且还能用于清除浮动
scroll:内容会被修剪，但是浏览器会显示滚动条以便查看其余内容
auto:如果内容被修剪，则浏览器会显示滚动条以便查看其余内容(但有可能不被修剪)
inherit:(任何ie都不支持)规定从父元素继承overflow属性

对绝对定位时overflow:hidden会有些出乎意料的效果

注意:一个绝对定位的后代快元素，部分位于容器之外，这样的元素是否裁剪并不总是取决于定义了overflow:hidden属性的祖先容器；
尤其是不会被“位于他们自身和他们的包含块之间的祖先容器”的overflow裁剪
比如一个demo中，爷爷是相对定位，老爸规定溢出隐藏，儿子是绝对定位元素，这时候儿子的溢出元素是否隐藏由爷爷决定，而不是老爸，
原因是老爸没有相对定位，无法作为绝对定位的包含块，所以由爷爷接管)

另外,裁剪只有当高度固定时才有用(因为如果高度没有固定，内容本来就是自动撑开的)

Overflow是css2中加入的，
能够清除浮动的原理是因为overflow取值只要不是visible，将会触发BFC
(BFC中必须给浮动元素撑出高度，使的后续的元素无法跟浮动元素共享同一水平位置，看上去就是clear:both的效果了)，
而BFC决定了元素高度是如何计算的(会将浮动元素高度计算入内)，所以达到了清除浮动效果

## overflow:hidden和clear:both都有清除浮动的功能，这两者有什么区别？

clear:both-元素设置了这个属性后，自身就有清除浮动的效果
overflow:hidden-父级设置了这个属性后，会触发BFC
(BFC中必须给浮动元素撑出高度，使的后续的元素无法跟浮动元素共享同一水平位置，看上去就是clear:both的效果了)，
从而达到了类似于清除浮动的效果。

所以准确的说clear是“清除浮动”，而overflow是“闭合浮动-使浮动元素闭合，从而减少浮动带来的影响

## 请列举几种常用的清除浮动的方法，并解释下原理？

清除浮动一般有两大类别，
第一类别为通过clear清除浮动，
第二类别为通过触发BFC闭合浮动，去除浮动影响。

第一类别:(原理为利用clear的功能清除浮动),常用方法有如下:
在浮动元素后面新增一个空的标签，并设置clear:both
高级用法(最常用)，最后一个浮动元素使用自定义的clearfix类，
这个类的作用是通过:after，在元素后面插入一个空的伪元素，
这个伪元素有clear:both属性，从而达到清除浮动效果

第二类别:(原理为通过触发BFC闭合浮动，去除浮动带来的影响),常用方法有如下:
通过overflow属性(除了visible值,其它都可以，最常用hidden)，
比如overfow:hidden，触发BFC，从而达到闭合浮动，去除浮动效果
其它的触发BFC的方法，如
display:table(这种方法本身并不会创建BFC，但是它会产生匿名框，
而匿名框中的display:table-cell可以创建新的BFC，也就是说触发BFC的是匿名框，而不是display:table，
所以通过display:table和display:table-cell（本身）创建的BFC效果是不一样的)

## 为什么对元素使用了float浮动，一定要清除浮动？

元素使用浮动属性后，会脱离文档普通流，浮动元素可以左右移动，直至它的外边缘遇到包含框或者另一个浮动框的边缘。
这样当一个元素浮动后，同级内的其它元素会变现的跟浮动元素不存在一样，会跟浮动元素共享同一个位置。
而且当一个div内部同时存在浮动元素和普通元素，并浮动元素的高度高于普通元素时，
div的高度不会自动伸高来闭合浮动元素，只会使用普通元素的高度，导致了“高度坍塌”现象

正是由于浮动的这种特性，在实际布局中会影响正常的预期效果，并不是我们期望的，所以往往都需要使用某些方法闭合浮动，
从而使元素达到预期效果

## zoom:1的清除浮动原理

`ie`专用

清除浮动，触发hasLayout
zoom属性是ie专有的，可以设置或检索对象的缩放比例，解决ie下比较奇怪的bug
譬如外边距折叠，清除浮动，触发hasLayoutd等

原理
设置了zoom后，所设置的元素就会就会扩大或者缩小，高度宽度就会重新计算了，
这里一旦改变zoom值时其实也会发生重新渲染，运用这个原理，也就解决了ie下子元素浮动时候父元素不随着自动扩大的问题。

Zoom属是IE浏览器的专有属性，火狐和老版本的webkit核心的浏览器都不支持这个属性。
然而，zoom现在已经被逐步标准化，出现在 CSS 3.0 规范草案中。(基本chrome支持了，现代浏览器都开始支持)

目前非ie由于不支持这个属性，它们又是通过什么属性来实现元素的缩放呢？
可以通过css3里面的动画属性scale进行缩放。

## 什么是外边距合并

在同一个bfc下的两个box
当它们的垂直外边距相遇时，将会合并成一个外边距（取两个发生合并的外边距高度中较大者）
全部都为正值，取最大者
不全是正值，都取绝对值，然后正值减去绝对值
没有正值，都取绝对值，0减去绝对值

一个空元素，有外边距，但是没有边框或填充，这时候，它的上边距和下边距会合并

当一个元素在另一个元素中时(假设没有内边距或边框把外边距隔开)，它们的外边距会发生合并

不同bfc之间的外边距不会合并

## ::before和:active中双冒号和单冒号有什么区别？解释下伪元素和伪类？

双冒号是css3规范中引入的
正常来说，单冒号用于伪类，双冒号用于伪元素
不过浏览器会支持单冒号表示伪元素的写法

伪元素譬如：(代表会新增东西)

```js
::first-letter-将特殊的样式添加到文本的首字母
::first-line-将特殊的样式添加到文本的首行
::before-在某元素之前插入某些内容
::after-在某元素之后插入某些内容
```

伪类譬如：(代表特定状态)

```js
active-将样式添加到被激活的元素
:focus-将样式添加到被选中的元素
:hover-当鼠标悬浮在元素上方时，向原生添加样式
:link-将特殊的样式添加到未被访问的链接
:visited-将特殊样式添加到被访问过的链接
:first-child-将特殊的样式添加到元素的第一个元素
:lang-运行创作者来定义指定元素中使用的语言
```

- 伪类用于向某些选择器添加特殊效果（：表示），可以认为只是改变某个状态

- 伪元素用于将特殊效果添加到某些选择器（：：表示），可以认为新元素生成（dom树中找不到）

- 有时候为了一些就浏览器兼容，伪元素也用（：）表示，比如兼容ie

区别：

- 伪类的效果可以通过添加一个实际的类达到，
而伪元素的模拟则需要添加一个实际的元素才能达到

- 伪类理解为状态（比如:first-child相当于给第一个元素添加样式，并不需要添加元素），
而伪元素可以理解为伪造的元素（譬如：：after表示插入一个新的元素）

在不考虑兼容的情况下，伪类用（：表示），伪元素用（：：）表示

## 元素竖向的百分比设定是相对于容器的高度吗？

元素的竖向百分比设定是基于容器的宽度而不是高度

可以自行测试一旦修改容器宽度，发现竖向百分比对于的值也增加了

注意，指的是`margin`，`padding`这种是基于宽度

但是`height`这种是基于父元素的高度的

千万别搞混

## style标签写在body后和body前有什么区别?

HTML标准一直是规定style不应该出现在body中

但网页也有容错：

如果style出现在body中(或者body后更是)，效果仍然和style中一样，
但是可能会引起fouc(Flash of Unstyled Content-无内容闪烁)，重绘或重新布局

## position:fixed在手机上无效怎么处理？

fixed是基于整个页面固定，而某些场景下滑动的是整个viewport,
网页并没有滑动，所以fixed看起来跟没有固定一样(实际上它并没有动，只是不是相对手机屏幕的固定而已)

一般是没有加viewport声明的缘故，加上即可

```html
meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
```

另外，iOS下自带的回弹也可能造成问题
或者iOS下fixed被输入框弹出(原理是body被滚动，改成absolute，或者监听focus时临时改)

还有人的做法是使得fixed布局的父元素(body)不出现滚动，将滚动内容移到其他div内部
这样弹出后，页面本身不会滚动，不会有这个问题

还有一种是页面上同时添加了滑动事件，如：`overflow：auto/scroll`等，就会出现这样的BUG：
当滑动页面时，input框（fixed）就会掉下来，fixed属性失效。
解决是使用iscroll等插件（不使用overflow：auto/scroll，iScroll内部是自己用的translate动画-低版本也是js模拟动态修改top）

## 实现自适应父元素宽度的正方形

注意要点：

```js
margin: 100%
padding: 100%
```

都是基于父元素的`宽度`进行

但是

```js
height: 100%
```

是基于父元素的`高度`进行，
如果父元素高度不定，就相当于`auto`效果（缺省值）

本题的实现：

```html
<div class="parent">
    <div class="child">
        
    </div>
</div>
```

```js
.parent {
    background: red;
    width: 200px;
    height: 400px;
}
            
.child {
    background: blue;
    width: 100%;
    padding-bottom: 100%;
}
```