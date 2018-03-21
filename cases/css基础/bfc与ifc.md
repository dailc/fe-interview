# bfc与ifc

## 对BFC规范（块级格式化上下文：block formatting context）的理解？

https://www.w3.org/TR/CSS21/visuren.html#block-formatting

https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context

BFC的全称是Blok formatting context(块级格式化上下文)

W3C CSS2.1规范中的一个概念，它是一个独立容器，决定了元素如何对其内容进行定位，以及与其它元素的关系和相互作用
一个页面是有很多个Box组成的，元素的类型和display属性决定了这个Box的类型

不同类型的Box会参与不同的Formatting Context（决定如何渲染文档的容器）
因此Box内的元素会以不同的方式渲染
也就是说BFC内部的元素和外部的元素互不影响

触发BFC的条件:
float的值不为none（所以，浮动元素其实也是一个BFC）
overflow的值不为visible
display的值为inline-block,table-cell,table-caption，flex, inline-flex（官方文档提到flex也是）
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

## BFC与IFC

归根节点都是：FC（Fomatting Context），CSS2.1规范中的一个概念，
它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用

本质都是渲染规则，这里由一点展开解释：display：inline-block到底是BFC还是IFC？

先这样理解：IFC的line box（线框）高度由其包含行内元素中最高的实际高度计算而来
（不受到竖直方向的padding/margin影响)

所以我们可以理解为什么：inline表现的元素设置padding/margin无效
（准确的说是，竖直方向的，水平方向最终是可以生效的-最终是IFC盒子上的水平间距生效了，和其他盒子隔开）

垂直无法生效的主要原因是:

padding的值是根据目标元素的width计算出来的，而inline， non-replace元素的width是不确定的。

那么display：inline-block呢？可以理解为，它的外面有了一个BFC盒子（但内部仍然是IFC渲染规则）

再进一步理解：

譬如一个盒子中有，`span`，`sss（文本）`，那么`span`就是一个IFC，
`sss（文本）`也会在外部产生一个匿名IFC包裹着

再进一步：IFC有一些布局规则，譬如

- text-align：center规则可以让内部的IFC居中

- vertical-align：middle规则可以让内部的IFC垂直居中

然后IFC的line-height规则可以影响IFC本身的高度计算等

说到底，本质就是因为css是盒子模型，所以需要这些FC来进行计算
