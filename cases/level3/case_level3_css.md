# 难度等级3，进阶高阶需掌握，不一定都是难点，也有可能是很偏僻

## object-fit知道么？

css3中的属性，它的作用是决定目标元素如何被替换，适用于img或video等标签

譬如`给video加object-fit: fill;`，可以让视频自适应撑开填满整个屏幕（默认情况下，就是全屏，也会有黑边的）

## skew属性？

注意： ie10以上才支持transition

skew是斜切（或者说拉伸）
skew的默认transform-origin是这个物件的中心点

skewX(30deg) 表示X轴朝逆时针方向旋转30deg，坐标系上的物体也会随着X轴旋转。
skewY(30deg) 表示Y轴朝顺时针方向旋转30deg，坐标系上的物体也会随着Y轴旋转。

## css的@viewport？

可以实现 meta标签中的viewport同样的效果，但是现在的浏览器很多都不兼容
（如Safari和Firefox根本就未实现）

## inline-block之间的间距？

inline布局或者inline-block布局之间就会有间隙，例如如下布局

```html
.space a {
    display: inline-block;
    padding: .5em 1em;
    background-color: #cad5eb;
}

<div class="space">
    <a href="##">惆怅</a>
    <a href="##">淡定</a>
    <a href="##">热血</a>
</div>
```

不管是`display: inline-block;`还是`display: inline;`
会发现a标签之间会有一定的间距

__这个是正常现象！！！__这种表现是符合规范的应该有的表现！

产生间距的原因是标签之间的__空白字符在内联时占据位置__

如何去除？方法很多，譬如

1. 标签不换行，这样不同标签之间就没有空白字符

```html
<a href="##">
    惆怅</a><a href="##">
    淡定</a><a href="##">
    热血</a>
```

或

```html
<a href="##">惆怅</a><a href="##">淡定</a><a href="##">热血</a>
```

总之，只要`><a`之间没有空白即可


2.使用margin负值

```js
.space a {
    display: inline-block;
    margin-right: -3px;
}
```

这些方案，margin负值的大小与上下文的字体和文字大小相关
所以不同字体，字体大小需要使用的margin还不一样
不太适合大规模使用

3.标签不闭合

```html
<a href="##">惆怅
<a href="##">淡定
<a href="##">热血
```

注意，为了向下兼容IE6/IE7等低版本的浏览器，最后一个列表的标签的结束（闭合）标签不能丢。

4.使用font-size:0

```js
.space {
    /*解决某些Chrome,版本中默认有最小字体大小限制*/
    -webkit-text-size-adjust:none;
    font-size: 0;
}
.space a {
    font-size: 12px;
}
```

这样，空白字符就不会占位（没有大小）

5.使用letter-spacing

```js
.space {
    letter-spacing: -6px;
}
.space a {
    letter-spacing: 0;
}
```

同样需要调试到合适的大小，基本适用于所有浏览器
注意，Opera浏览器下有问题：最小间距1像素，然后，letter-spacing再小就还原了。

6.使用word-spacing

```js
.space {
    word-spacing: -6px;
}
.space a {
    word-spacing: 0;
}
```

与上相比，一个是字符间距(letter-spacing)一个是单词间距(word-spacing)，大同小异
经测试，word-spacing的负值只要大到一定程度，其兼容性上的差异就可以被忽略。
因为，好像，word-spacing即使负值很大，也不会发生重叠。

注意，如果某些版本的Chrome浏览器，可能看到的是间距依旧存在
这时可以添加display: table;或display:inline-table;让Chrome浏览器也变得乖巧。

```js
.space {
    display: inline-table;
    word-spacing: -6px;
}
```

7.设置float:left

```js
.space a {
    float:left;
}
```

原理是浮动元素不会去和文档流中的位置计算，因此直接重叠到原有空白上了

基本上一些框架中解决间距都是以上方法的组合，
譬如YUI 3 CSS Grids 使用letter-spacing和word-spacing去除格栅单元见间隔

## CSS里的visibility属性有一个collapse属性值时干嘛的?在不同浏览器下有什么区别？

对于普通元素`visibility:collapse;`会将元素完全隐藏,
标准w3c呈现效果为元素隐藏，但是占据空间，Firefox下隐藏并不占空间，IE下不起作用

如果目标元素为table,
可以隐藏对应的行或列（跟display:none一样）

一般使用较少

## position跟display, margin, collapse, overflow, float这些特性相互叠加会怎么样？

如果元素的display为none，那么元素不被渲染，position,float不起作用

如果元素拥有position:absolute或者position:fixed属性
那么元素将为绝对定位，float不起作用，

如果元素float不是none，元素会脱离文档流根据float属性值来显示，

有浮动，绝对定位，inline-block属性的元素，margin不会和垂直方向上的其它元素margin折叠
（inline-block，绝对定位，可以解决垂直 margin折叠问题）

## 对BFC规范（块级格式化上下文：block formatting context）的理解？

BFC的全称是Blok formatting context(块级格式化上下文)

W3C CSS2.1规范中的一个概念，它是一个独立容器，决定了元素如何对其内容进行定位，以及与其它元素的关系和相互作用
一个页面是有很多个Box组成的，元素的类型和display属性决定了这个Box的类型

不同类型的Box会参与不同的Formatting Context（决定如何渲染文档的容器）
因此Box内的元素会以不同的方式渲染
也就是说BFC内部的元素和外部的元素互不影响

触发BFC的条件:
float的值不为none
overflow的值不为visible
display的值为inline-block,table-cell,table-caption
position的值不为static或者releative中的任何一个

有时候会把display：table也认为可以生成BFC，
其实这里的主要原因在于Table会默认生成一个匿名的table-cell，正是这个匿名的table-ccell生成了BFC

BFC中相邻的块级元素垂直外边界会折叠
BFC不会与float的元素区域重叠（如果浮动元素后有一个BFC，它不会和前面的浮动元素折叠）
计算高度时，浮动元素也参与
每个元素的margin box的左边， 与包含块border box的左边相接触（对于从左往右的格式化，否则相反）

默认可以是认为处于body的bfc中

BFC仍然属于文档流中
BFC的约束规则分解如下:
1.内部的Box会在垂直方向上一个接一个的放置
2.垂直方向上的距离由margin决定。
（完整的说法是：属于同一个BFC的两个相邻块级元素Box的垂直margin会发生重叠。）
3.每个元素的左外边距与包含块的左边界相接触（从左向右），即使浮动元素也是如此。
（这说明BFC中子元素不会超出他的包含块，而position为absolute的元素可以超出他的包含块边界-因为如果又用了absolute，已经不属于本bfc了）
4.BFC的区域不会与float的元素区域重叠
5.计算BFC的高度时，浮动子元素也参与计算
6. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面元素，反之亦然

## 如何修改chrome记住密码后自动填充表单的黄色背景？

```css
input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
    background-color: rgb(250, 255, 189); /* #FAFFBD; */
    background-image: none;
    color: rgb(0, 0, 0);
}
```

主要是 -webkit-autofill 样式

## webkit-font-smoothing的作用？

```js
-webkit-font-smoothing: antialiased
```

加上抗锯齿渲染（非标准），可以让页面中的文字更清晰

另外有人总结过只在macOS 的webkit中有效

## font-style属性可以让它赋值为"oblique"，什么意思？

倾斜的字体样式

和italic的区别：
italic是斜体
oblique是倾斜的文字排版（模仿的斜体，但不是斜体）

### display:inline-block什么时候会显示间隙？

换行或空格会占据一定的位置，从而产生间隙

解决方法：
去除空格
使用margin负值
使用font-size：0（本质也是去除了空格的占位）
letter-spacing,word-spacing
譬如letter-spaceing:-4px

## style访问是转为驼峰

```js
background-image
color
font-size
float
```

转为驼峰后分别是？

```js
backgroundImage
color
fontSize
cssFloat
```

注意，`float`是一个不能直接转换的属性，因为它是JS中的保留字，因此不能作为属性名.

DOM2级样式规定样式对象上相应的属性名应该是`cssFloat`（不过老版IE中支持的则是`styleFloat`）

