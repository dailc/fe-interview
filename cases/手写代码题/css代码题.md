# css代码题

## 有一个高度自适应的div，里面有两个div，一个高度100px,希望另一个填满剩下的高度

1.box-sizing方案
外层box-sizing:border-box;同时设置padding:100px 0 0
内层100像素高的元素向上移动100像素，或者使用absolute布局防止占据空间
另一个元素直接height:100%

2.absolute布局
外层position:relative
百分百自适应元素直接position: absolute; top: 100px; bottom: 0; left: 0s

3.或者纯js解法

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