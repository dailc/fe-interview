# 难度等级1，最常见的一些概念，初级必须了解

## ECMAScript与javascript的区别？

ECMAScript是标准
javascript是实现

ECMAScript定义javascript语言的实现
但是浏览器端的javascript是一般意义上的泛指，同时还包括bom（如navigator对象）和dom等

## JavaScript有几种基本数据类型，你能画一下他们的内存图吗？

7种（es6新增一种symbol）

1. `number`-数字

2. `string`-字符串

3. `undefined`-未定义，默认都是这个值

4. `boolean`

5. `null`，空对象，原型链的尽头，`typeof`的结果为`object`

6. `object`，复杂对象

7. `symbol`，`es6`新增，表示独一无二

简单类型在栈中，复杂类型栈中有一个堆中的引用（栈中只保留指针，堆中才是实际数据）

分为两大类型： 原始数据类型（栈），引用数据类型（堆）

## 判断一个对象是否是数组？

1.`Array.isArray(arr)`(ECMAScript5引入-当然了，不考虑ie8)
2.`arr instanceof Array`
3.`arr.constructor === Array`

注意，由于跨iframe实例化的对象彼此不共享原型，因此2，3检测可能会有问题

4.`Object.prototype.toString.call(arr) === '[object Array]'`最保险的一种判断

## JS数组的迭代与归并方法？

迭代

传入的参数是函数，函数内的传值都是：`item, index, array`

1. every

如果每一项返回true，则返回true

2. some

如果任意一项返回true，则返回true

3. filter

会返回为true的项组成的数组

4. forEach

没有返回值，请注意，函数内部是值传递

5. map

返回每次函数调用结果组成的数组（可以认为，相当于全部映射成另一个了）

归并

传入的参数是`函数，初始值`，函数内的传值都是：`prev, cur, index, array`

1. reduce

迭代数组的所有项，并返回一个结果

从第一项开始，逐个向后遍历，遍历到最后

第N项时的pre是前N-1项已迭代的结果

2. reduceRight

迭代数组的所有项，并返回一个结果

从最后一项开始，逐个向前遍历，遍历到最前

和前一个的差别只是从后开始遍历而已。


## encodeURI和encodeURIComponent的区别？

都是编码Unicode字符

1. encodeURI只会将空格编码成20%（其它所有字符都原封不动）

2. encodeURIComponent会将所有特殊字符编码，包括`/`，`:`，`#`，`&`，`=`，`?`，`;`，`@`，`+`等。
但不会对这些ASCII字符和标点符号编码（` - _ . ! ~ * ' ( ) `）

3. 注意，不要使用es3中废弃的escape（它只能正确编码ASCII字符）

## 说一说object类型中的内置对象

```js
Array, Date,RegExp,Error,String,Boolean,Number
```

这些拓展类型有一个特点就是使用typeof 只会返回”object”。而且一般语言装箱就会实现，属于内置对象

注意,这里的String等和简单类型中的string是有差别的,简单类型中的string指向的是栈内存中的常量，
而这里的String指的封装类型。String的对象的值是一个栈内存区的指针，指向堆内存区的内容，所以才会认为是object型

另外还有一个特殊的Object拓展类型: Function,这个类型的对象用typeof 会返回”function”

## location.assign知道么？

它的作用是打开新的URL并在浏览器的历史记录中生成一条记录。

以下效果等同：

```js
window.location = 'http://www.google.com';
location.href = 'http://www.google.com';
location.assign('http://www.google.com');
```

`location.href`底层就是调用的`location.assign`

## 如何跳转到新的页面并不产生历史记录？

使用:（可以调整所有）

```js
location.replace('http://www.google.com');
```

或者：（同源限制）

```js
// 改变历史记录，但并不会主动去访问
// 如果调整跨域地址，会报错，history api不会允许
1. history.replaceState(null, document.title, 'http://192.168.x.x/xxx/xx.html');

2. location.replace('');
```

## location.reload?

作用是重载当前显示的页面，可接受一个参数

```js
// 重新加载（有可能从缓存中加载）
location.reload();

// 重新加载（从服务器重新加载）
location.reload(true);
```

## event.prventDefault()与event.stopPropagation()的区别？

(不考虑部分IE浏览器，
IE浏览器的`preventDefault`得用`Window.event.returnValue=false`替代。
IE下的`stopPropagation`要用`event.cancelBubble=true`替代)

`event.preventDefault()`用于取消事件的默认行为，
例如当点击提交按钮时，监听方法内部使用了这句代码可以阻止默认的表单提交行为。
同理可以适用于阻止a标签的跳转行为等等

`event.stopPropagation()`用于取消事件的传递，
即事件冒泡或事件捕获时阻止事件的冒泡或者阻止被下一级捕获。

比如div中点击a标签。事件冒泡中,在a标签的监听函数内部使用这句代码可以阻止事件冒泡到div上，所以div无法获取到点击事件。
在事件捕获中，在div的监听函数内部使用这句代码可以阻住a标签捕获事件，所以a标签无法捕获到监听事件。
(avveventListener的第三个参数为false代表使用冒泡机制，为true代表使用捕获机制，默认为false)


## 说说写JavaScript的基本规范？

1. 良好的代码规范，无规矩不成方圆，譬如airbnb的规范

2. 如果是es5，采用严格模式，避免错误

3. 尽量优雅

```js
===而不是==
不使用全局变量
使用[]而不是new Array
for循环使用大括号
if使用大括号
不在一行声明多个变量
等等
```

## JavaScript原型，原型链 ? 有什么特点？

这里随便简单描述点。

每一个对象都有原型链`__proto__`对象（由浏览器决定）可以顺着原型链往上找

函数对象有一个`prototype`，`(new Func()).xxx`即可调用`prototype.xxx`（如果对象没有，才会顺着原型链找）

`prototype`中的方法属于`xxx.prototype`，不属于实例对象，这点得区分

原型和原型链常被用于模拟其它面向对象语言的继承语法

```js
instance.constructor.prototype = instance.__proto__
```

我们找一个属性时，会先看对象中是否有，如果没有，沿着原型链判断是否有，一直到检索Object的内置对象

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

### 使用正则实现获取文件扩展名？

可以用正则提取(捕获组)
str.match(/[.]([^.]+)$/)[1];
没有可以设置为空