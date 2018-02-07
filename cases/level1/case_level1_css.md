# 难度等级1，最常见的一些概念，初级必须了解

## css定义的权重

权重规则：

标签权重1，class 10, id 100,内联 style 1000，具体如下

```css
/*1*/
div {}

/*10*/
.class1 {}

/*100*/
#id1 {}

/*100+1*/
#id1 div {}

/*10+1*/
.class1 div {}

/*10+10+1*/
.class1 .class2 div {}
```

如果权重相同，最后定义的样式会起作用

`!important`代表最高权重(据说是100W)

## css table的一些属性？

1. border-spacing

控制各个cell之间的间距，如果有border，会特别明显

2.border-collapse

可取`collapse`或`seperate`，合并是可以折叠各个cell的border，避免加粗，
默认情况下border不会合并，中间几个cell会被加粗

3.empty-cells

取`hide`时会隐藏空的cell，避免在空的cell中填充background color，

但是，如果设置了border-collapse，不生效，这个属性会被忽略，空的cell仍然会显示background color

## 如何将标准盒模型转化为IE盒模型？

通过css3的`box-sizing`属性

它有如下值：

1. content-box 

    - 标准盒模型

    - 这是由 CSS2.1 规定的宽度高度行为。
    
    - 宽度和高度分别应用到元素的内容框。
    
    - 在宽度和高度之外绘制元素的内边距和边框。
    
2. border-box

    - IE盒模型
    
    - 为元素设定的宽度和高度决定了元素的边框盒。
    
    - 就是说，为元素指定的任何内边距和边框都将在已设定的宽度和高度内进行绘制。
    
    - 通过从已设定的宽度和高度分别减去边框和内边距才能得到内容的宽度和高度。
    
    - 在很多布局中，这个属性很好用
    
3. inherit

    - 规定应从父元素继承 box-sizing 属性的值
    
## 静态、自适应、流式、响应式布局的各自特点和区别？

- 静态布局:一般用于传统的web设计，不管浏览器尺寸多少，网页只会有一套布局，不会有自适应现象
(一般会设置成用横线或竖向的滚动条来查阅被遮掩部分)。
而且这种情况一般移动设备会单独再写一套代码，使用不同的域名访问，如wrap.(m.)

- 自适应布局:自适应布局是为了解决“如何才能在不同大小的设备上呈现同样的网页”，
实现原理主要是依据于允许网页宽度自动调整(比如Viewport标签中的width=device-width,会默认将网页初始化大小占满屏幕)
这种布局一般会使用相对大小(如em,rem,百分比等)，一般会尽力避免使用绝对大小(px)，
这样就达到了随着屏幕大小的不断变化，内容不会溢出，而是自适应的挤压或变长的效果
(也就是说一套自适应布局是可以不用Media Query就能实现的)。

- 流式布局:这种布局一般认为是“使用float实现浮动”(常常会用float+宽度百分比实现)，
即各个区域位置都是浮动的，不是固定不变的。
这种布局中，使用float的好处是如果宽度太小,放不下多个元素，后面的元素会自动滚动到前面元素的下方，不会在水平方向overflow，
避免水平滚动条的出现(一般流式布局要注意使用clear:both清除浮动)。
不过需要注意，在绝对定位中使用float需要非常小心。

- 响应式布局:响应式布局是为了解决“让同一个网页自适应不同大小的屏幕，根据屏幕宽度，自动调整网页的布局以及内容大小”，
也就是说“响应式的概念覆盖了自适应”。响应式实现的原理是基于CSS3的Media Query
(这个媒介查询可以根据不同的屏幕分辨率，调整网页设计，改变展示布局，需要注意的是对于响应式来说，Media Query必不可少)。

### 一个满屏 品 字布局 如何设计?

一般常用为：

上面的一个div 100%宽
下面的两个div分别宽 50%
用float或者inline或绝对定位使得不换行
简单的可以用border来区分是否正确

## CSS选择符有哪些？

选择符包括：

```js
`*`，
`id`，
`class`，
`tag`，
`.a > .b`，
`.a .b`，
`.a.b`（必须两个都满足），
`a:hover`（一些伪类状态），
`a::before`（伪元素），
`a[rel = "external"]`（属性选择）
等等
```

## CSS3有哪些新特性？

新增各种css选择器
如:not(.input)   所有class不是input的节点

圆角
border-radius:6px

多列布局
multi-column layout

阴影与反射
shadow/reflect

文字特效
text-shadow

文字渲染
text-decoration

线性渐变
gradient

旋转，平移等变化
rotate transform

## CSS哪些属性可以继承？

- 可继承属性

`color`，`font-size`，`font-family`，`font-style`，`visibility`，`line-height`，`cursor`

- 不可继承

`border`，`padding`，`margin`，`width`，`height`等等

## css sprite是什么，有什么优缺点?

概念：将多个小图片拼接到一个图片中。通过background-position和元素尺寸调节需要显示的背景图案。

优点：
1.减少HTTP请求数，极大地提高页面加载速度
2.只要加载一次后，可以避免其它图首次显示时的延迟（如果是独立的图片，每一张首次显示时都会有一个加载延迟）
3.增加图片信息重复度，提高压缩比，减少图片大小
4.更换风格方便，只需在一张或几张图片上修改颜色或样式即可实现

缺点：
1.图片合并麻烦（可以用在线工具或者node等自动工具）
2.维护麻烦，修改一个图片可能需要从新布局整个图片，样式

## display有哪些值？说明他们的作用。

- `none`，隐藏元素，并且不保留位置（如果是另一个属性，`visible`的话会，虽然看不见，但是保留位置）

- `block`，块级元素，默认情况下会占据整行，可以设置宽高等元素

- `inline`，内联元素，无法设置宽高（`padding`和`margin`也无效。布局时需注意）

- `inline-block`，内联的块级，可以设置宽高

- `table`，表格

- `table-cell`，表格元素

- `table-caption`，表格头部

- `box`，`flex`的前身，伸缩性布局

- `flex`，弹性布局，不计入普通文档流

- `list-item` 列表，会为元素内容生成一个块型盒，随后再生成一个列表型的行内盒。其效果就和ul中出现项目列表符号一样。
通俗地说就是会在内容前面自动加上黑点，而display:block则不会出现黑点。

## position的值relative和absolute定位原点是？

- absolute
生成绝对定位元素，相对于值不为static的第一个父元素进行定位

- fixed
绝对定位，相对于浏览器窗口进行定位

- relative
生成相对定位，相对于其正常位置进行定位。（relative不会导致元素脱离文档流）

- static
默认值，没有定位,元素出现在正常流中(文档流)，忽略top,bottom,left,right,z-index等声明

- inherit
从父元素集成position值

### 移动端布局用过媒体查询（@media）么

媒体查询相关代码在满足相应条件后才会生效，经常用于响应式布局中。
媒体查询可以在不同的条件下设置不同样式，也特别适合于移动端响应式布局

有两种方案，一种是直接写在css中。

```js
@media (min-width:700px) and (orientation: landscape) {
    .sidebar {
        display: none;
    }
}
```

还有一种方案是直接放html标签中，在满足条件下才会加载对应样式并生效

注意，就算不满足要求，也会去下载，只不过是满足要求后才生效而已。（就跟写css中效果一样）

```html
<link href='xxx' rel='stylesheet' media='(min-width:700px)'>
```

有一些可能比较少见的：

```js
@media print {
}
```

代表在打印模式下的样式，而且这种模式下，单位一般是`pt`

## display:none和visibility:hidden的区别？

相同点： 都能将网页上的某个元素隐藏

不同点：
display:none。隐藏对象并且不保留空间，即使用后该对象会从页面上消失，看不见，摸不着
涉及到了DOM结构，故产生reflow与repaint

visibility:hidden。使得对象在网页不可见（点击事件也无法触发），但是对象在网页上所占的空间没变（变为一块空白占据原有空间）
保留空间，不影响结构，故只产生repaint

在渲染时，visibility:hidden被渲染成了空盒子，仍然在render树中，
而display:none的元素是将节点从整个render tree中移除，所以不是布局中的一部分

所以，很多时候visibility:hidden更方便

## position属性的三个值：relative，absolute，fixed的区别？

- relative:
生成相对元素，无top,left时，元素就是在正常的文档流中，
譬如如果设置了left:20px，就会从左侧偏离20像素

- absolute:
生成绝对定位元素，相对于上级元素中第一个position属性非static的元素来定位
使用left,right,top,bottom来定位

- fixed:
生成绝对定位元素，相对于浏览器视窗来定位
使用left,right,top,bottom定位

- position的其它值:
static:默认值，没有定位，元素出现在正常流中
忽略top,bottom,left,right或者z-index声明

一般情况下，对于一些动画元素会采用absolute来单独布局，因为这样可以脱离普通文档流，减少回流影响的单位数量

## 对line-height是如何理解的？

指定了一行字的高度，定义是同一个元素中（比如同一个p）两个文本行基线之间的距离
如果div没有高度，但是里面有文字，那么它会被文字的line-height默认撑开

line-height只影响行内元素，并不能直接应用与块级元素
具有可继承性，块级元素的子元素会继承该特性，并在行内元素上生效

譬如，简单的把height设置和行高一样的话，可以实现单行文本居中

## 设置元素浮动后，该元素的display值是什么?

浮动后的display值自动变为了display:block

## 怎么让chrome支持小于12px的文字？

使用小于12px的字体，非chrome可以不考虑兼容，chrome中加上

```js
-webkit-text-size-adjust: none
```

有一个后果，就是如果放大了网页，字体不会随着一起放大（所以不建议全局使用，而是特定需要兼容的使用）

其他障眼法
如用图片替代文字

## style样式动态设置

譬如

```js
myDiv.style.width = '100px';
```

注意，如果设置为`100`，没有带单位，会被自动忽略，因为没有度量单位（当然，很久以前的混杂模式中，会有一个默认的px，不过标准模式必须带单位）

## 在网页中应该使用奇数还是偶数字体？为什么？

偶数字体

1.（重要）偶数字号相对更容易和web设计的其他部分构成比例关系（譬如16 * 0.5 = 8）

2.一些字体点阵（点阵字体也叫位图字体）只提供偶数字体（如早期windows自带中易宋体-新宋体等），而奇数13时用的是小一号的点阵（每个字的占据空间大了1px，但点阵没变）
据说早起的windows字体点阵中，有2，14，15，16，唯独少13

3.后续偶数更多的是一种习惯

另外，12显示英文很好，但是中文太小，14对中英文都太大，13比较合适（譬如知乎是13）

## 全屏滚动的原理是什么？用到了css的哪些属性？

多个页面，每一个页面分别占据页面的100%高度，每次切换页面时全屏滚动

它的原理和图片轮播一样，都是基于css的transform属性
每一个页面初始化时的y值不同(间隔一个屏幕高度)
然后页面切换时，切换到不同的y值

一般会使用transform,transition等属性，分别用来设置坐标，设置过渡时间等
有时候还可以用其它过渡效果，如透明度，颜色渐变等

## 什么是FOUC？如何避免？

Flash Of Unstyled Cotent

大概就是样式加载前浏览器用默认样式渲染文档，
样式加载后重新渲染文档，造成页面闪烁

解决方案是：

样式放在head中，这样在加载文档前样式已经有了，或者其它的优化css加载时间的方案

## overflow:scroll不能平滑滚动的问题

特别是iOS下

1.需要-webkit-overflow-scrolling： touch开启硬件加速
(底层用了一个原生控件来显示的)

2.或者类似于iScroll一样，自己内部用translate动画模拟

## 视差滚动效果，如何给每页做不同动画？（回到顶部，向下滑动要再次出现，和只出现一次分别怎么做？）

视差滚动：多层背景以不同速度移动，形成立体的运动效果，带来出色的视觉体验

一般会有背景层，内容层，贴图（悬浮）层，滚动时，不同速度移动

一般原理是：各个页面是fixed布局，然后监听滚动（譬如滚轮），
在滚动的不同距离以此移动对于图层的top值

## 如果需要手写动画，你认为最小间隔是多久，为什么？

很多显示器的频率仍然是： 60HZ，所以理论上是：

`1/60 *1000ms = 16.7ms`

## 什么是CSS预处理器／后处理器？

- 预处理器，如less,sass,stylus
用来预编译，一般里面会有支持变量、继承等，增加了复用性
而且还会有函数，循环，mixn，层级，很方便进行组件化开发，提高工作效率

- 后处理器，如postcss
譬如用来补全不同浏览器下的兼容后缀，如-webkit等
这样可以基于css规范来编写，无法写的时候关注兼容问题，更有效率,也不易出错，而且源码会更少

## 有使用过css预处理器吗？喜欢哪个？

SASS, LESS, Stylus等，原理都是最终会编译打包成正式css运行

主要的方便之处是：

- 支持变量，便于复用，特别是多套皮肤时

- 支持嵌套，复杂的父子级关系时更为清晰

## 有一个高度自适应的div，里面有两个div，一个高度100px,希望另一个填满剩下的高度

1.box-sizing方案
外层box-sizing:border-box;同时设置padding:100px 0 0
内层100像素高的元素向上移动100像素，或者使用absolute布局防止占据空间
另一个元素直接height:100%

2.absolute布局
外层position:relative
百分百自适应元素直接position: absolute; top: 100px; bottom: 0; left: 0s

3.或者纯js解法

## 为什么要初始化CSS样式

浏览器兼容问题，不同浏览器对有些标签的默认值不同，如果没对CSS初始化，往往会出现浏览器之家的页面显示差异

最简单的初始化（非常不建议）

```js
* {padding: 0; margin: 0;}
```

或者采用常见的样式初始化方案

```js
body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, th, td { margin:0; padding:0; }
  body, button, input, select, textarea { font:12px/1.5tahoma, arial, \5b8b\4f53; }
  h1, h2, h3, h4, h5, h6{ font-size:100%; }
  address, cite, dfn, em, var { font-style:normal; }
  code, kbd, pre, samp { font-family:couriernew, courier, monospace; }
  small{ font-size:12px; }
  ul, ol { list-style:none; }
  a { text-decoration:none; }
  a:hover { text-decoration:underline; }
  sup { vertical-align:text-top; }
  sub{ vertical-align:text-bottom; }
  legend { color:#000; }
  fieldset, img { border:0; }
  button, input, select, textarea { font-size:100%; }
  table { border-collapse:collapse; border-spacing:0; }
```

## input与textarea的区别

input单行

textarea多行

input自闭合

textarea结对

input有value属性可以设置

textarea直接在标签间的文本设置（但是可以获取value）

textarea有一些row、col指定大小

input有Maxlength之类的

## 经常遇到的浏览器的兼容性有哪些？原因以及解决方法是什么？常用hack技巧？

png24位的图片在IE6浏览器上出现背景，解决方案是做成png8

浏览器默认的margin和padding不同。解决方案是加一个全局的
`*{margin:0;padding:0;}`来统一

IE6双边距bug: 块属性标签float后，又有横行的margin的情况，在ie6显示margin比设置的大
浮动IE产生的双倍距离

```js
box{ float:left; width:10px; margin:0 0 0 10px;}
```

这种情况之下IE会产生20px的距离，解决方案是在float的标签样式控制中加入 ——
`display:inline;`将其转化为行内属性。(这个符号只有ie6会识别)

渐进识别，利用`\9`标记将IE浏览器分离出来
然后，再使用'+'将IE8和IE7，IE6分离开

```js
.bb{
    background-color:red;/*所有识别*/
    background-color:#00deff\9; /*IE6、7、8识别*/
    +background-color:#a200ff;/*IE6、7识别*/
    _background-color:#1e0bd1;/*IE6识别*/
}
```

IE下，可以获取常规属性的方法来获取自定义属性
也可以使用getAttribute()获取自定义属性
Firefox下，只能使用getAttribute()获取自定义属性。
解决：统一使用getAttribute()

IE下，event对象有x,y属性，但是没有pageX,pageY属性
Firefox下，有pageX,pageY，但没有x,y

Chrome中文界面默认会将小于12px的文本强制按照12px显示
可以css中加入

```js
-webkit-text-size-adjust: none;
```

 解决。

超链接访问过后hover属性不见了，被点击访问的超链接样式不再具有hover和active了解决方法是改变CSS属性的排列顺序

```js
L-V-H-A :  a:link {} a:visited {} a:hover {} a:active {}
```