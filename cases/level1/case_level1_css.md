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

## display:none和visibility:hidden的区别？

相同点： 都能将网页上的某个元素隐藏

不同点：
display:none。隐藏对象并且不保留空间，即使用后该对象会从页面上消失，看不见，摸不着
涉及到了DOM结构，故产生reflow与repaint

visibility:hidden。使得对象在网页不可见（点击事件也无法触发），但是对象在网页上所占的空间没变（变为一块空白占据原有空间）
保留空间，不影响结构，故只产生repaint