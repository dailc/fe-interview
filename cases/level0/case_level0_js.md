# 难度等级0，小白须知

## documen.write和 innerHTML的区别

document.write只能重绘整个页面

innerHtml可以重绘页面的一部分

加入页面已经加载完毕（HTML解析完毕），再调研documen.write的话，会将整个页面重置

## 什么是window对象? 什么是document对象?

window对象指浏览器打开的窗口，在浏览器中，window对象就是相当于ECMAScript中定义的`Global`对象-而且功能更多，还包括BOM等

document是当前窗口中Document对象的一个只读引用（属于window对象的一个属性）

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

## encodeURI和encodeURIComponent的区别？

都是编码Unicode字符

1. encodeURI只会将空格编码成20%（其它所有字符都原封不动）

2. encodeURIComponent会将所有特殊字符编码，包括`/`，`:`，`#`，`&`，`=`，`?`，`;`，`@`，`+`等。
但不会对这些ASCII字符和标点符号编码（` - _ . ! ~ * ' ( ) `）

3. 注意，不要使用es3中废弃的escape（它只能正确编码ASCII字符）

## 检测浏览器版本版本有哪些方式？

一般通过useragent检测
譬如：navigator.userAgent

```js
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36
    (KHTML, like Gecko) Chrome/41.0.2272.101 Safari/537.36"
```

如webview容器一般会加上自己特色的头部

不过，在早期（那时候各种标准都不完善或没执行到位），
经常是利用功能检测来判断的（譬如判断某个功能变量是否存在，如果存在就是xx环境等）

## What is a Polyfill?

polyfill
是指在旧浏览器上复制标准API的JavaScript补充
可以动态地加载 JavaScript 代码或库，在不支持这些标准API的浏览器模拟它们

因为 polyfill 模拟标准 API，所以能够以一种面向所有浏览器未来的方式针对这些 API 进行开发，
一旦对这些 API 的支持变成绝对大多数，则可以方便地去掉 polyfill，无需做任何额外工作。

例如，geolocation（地理位置）polyfill 可以在 navigator 对象上添加全局的 geolocation 对象，
还能添加 getCurrentPosition 函数以及“坐标”回调对象，
所有这些都是 W3C 地理位置 API 定义的对象和函数。

## 做的项目中，有没有用过或自己实现一些 polyfill 方案（兼容性处理方案）？

譬如：
html5shiv(h5语义化标签)
Geolocation
Placeholder

但是JQ之类的并不属于这个范畴
polyfill是指标准API的适配，而jq是自己定义一套api

譬如对requestAnimationFrame的兼容适配就属于一种polyfill

## 如何判断当前脚本运行在浏览器还是node环境？

```js
this === window ? 'browser' : 'node';
```

通过判断Global对象是否为window，如果不为window，当前脚本没有运行在浏览器中

## eval是做什么的？

- 作用是把对应的字符串解析成js代码并运行

- 尽量避免使用eval，不安全而且耗性能

- 一次解析成js语句，一次执行

在以前，常有人用

```js
var obj =eval('('+ str +')');
```

来将json字符串解析成json，但是h5中可以用`JSON.stringify`

## 立即执行函数，不暴露私有成员

```js
var module1 = (function() {
    var count = 1;
    
    function change() {
        count++;
    }
    
    return {
        change: change,
    };
)();
```

上面是一个立即执行函数，而且，一旦外部引用了change，会导致count无法被释放，形成闭包。
（正常没有被引用，函数执行完后会被销毁）

## JSON的了解？

JSON(JavaScript Object Notation)是一种轻量级的数据交换方式

它是基于JavaScript的一个子集。
数据格式简单，易于读写，占用带宽小

例如（注意，必须要引号）

```js
{"name": "zhangsan", "age": "18"}
```

JSON字符串转JSON对象（后者是JS中内置的对象模型）

```js
eval('(' + str + ')')
str.parseJSON
JSON.parse(str)

JSON转字符串
obj.toJSONString()
JSON.stringify(obj)
```