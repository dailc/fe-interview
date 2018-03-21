# position与浮动

## 设置元素浮动后，该元素的display值是什么?

浮动后的display值自动变为了display:block

哪怕以前是inline，浮动后也会变为block
（因为浮动时，对象将被视作块对象block-level）

## position跟display, margin, collapse, overflow, float这些特性相互叠加会怎么样？

如果元素的display为none，那么元素不被渲染，position,float不起作用

如果元素拥有position:absolute或者position:fixed属性
那么元素将为绝对定位，float不起作用，

如果元素float不是none，元素会脱离文档流根据float属性值来显示，

有浮动，绝对定位，inline-block属性的元素，margin不会和垂直方向上的其它元素margin折叠
（inline-block，绝对定位，可以解决垂直 margin折叠问题）

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