# dom操作

## documen.write和 innerHTML的区别

document.write只能重绘整个页面

innerHtml可以重绘页面的一部分

加入页面已经加载完毕（HTML解析完毕），再调研documen.write的话，会将整个页面重置

## innerHtml设置脚本会有什么效果？

除了IE8及更早版本，现代浏览器中通过innerHTML插入的脚本元素并不会执行。（dom对象已经插入了，但是不会执行这个脚本）

```html
1. div.innerHTML = "<script defer> alert('hello!');<\/script>";

2. div.innerHTML = "_<script defer> alert('hello!');<\/script>";

3. div.innerHTML = "<div></div><script defer> alert('hello!');<\/script>";

4. div.innerHTML = "<div>&nbsp;</div><script defer> alert('hello!');<\/script>";

5. div.innerHTML = "<input type=\"hidden\"/><script defer> alert('hello!');<\/script>";
```

譬如上述的一系列设置都不会执行（chrome等一系列现代浏览器中的效果）

IE8中则是只要脚本加上了defer属性，并且前面有一个“有作用域元素”，就可以正常执行。（这里不过度描述ie8）

'无作用域的元素'(NoScope element):

如`style`，`script`元素或注释类似。
有作用域则相反

## DOM操作，怎么添加、移除、移动、复制、创建和查找节点？

1.创建

```js
createDocumentFragment() // 创建一个dom片段
createElement() // 创建一个具体元素
createTextNode() // 创建一个文本节点
```

2.添加，移除，替换，插入

```js
appendChild()
removeChild()
replaceChild()
insertBefore()
```

3.查找

```js
getElementsByTagName()
getElementsByClassName()
getElementsByName()
getElementById()
document.querySelector()
```

## children与childNodes的区别？

children只包含元素中同样还是元素的子节点（不包含普通文本节点）

childNodes会包含空白符和文本节点