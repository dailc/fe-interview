# jsapi

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

## 数组和对象有哪些原生方法，列举一下?

数组：

```js
push
pop
shift
unshift
splice
slice
reverse
sort
concat
join
toString
indexOf（可以识别obj的位置-只能判断引用，如果是引用不同而内容相同是无法判断的）
lastIndexOf
forEach
map
filter
every
some
reduce
reduceRight
length
```

Object:

```js
hasOwnProperty
isPrototypeOf
provertyIsEnumerable
toString // {}.toString()返回[object Object]
// 主要区别，一个数组中
// toString访问的是每一个对象的toString方法
// toLocalString(本地环境字符串,会根据机器环境返回字符串)访问的是对象每一个元素的toLocalString
// 两个方法都可以被重写
toLocalString // {}.toLocalString()返回[object Object]
valueOf // 返回的是原始值(对象本身的值)，例如{}.valueOf();返回的是{}对象
call
apply
```

## .call()和.apply()的区别？

这两个方法都可以替换`context`

区别是

```js
.call(context, param1, param2, ...)
.apply(context, [param1, param2, ...])
```

一个是传数组，一个是传多个参数

## indexof与findindex的区别？

indexOf是es5中的（同批次还有every、some 、forEach、filter 、indexOf、lastIndexOf、isArray、map、reduce、reduceRigh）
findIndex是es6中新增的（与find同批次）
findIndex和find都可以发现NaN，弥补了数组的IndexOf方法的不足。

例如

```js
[NaN].indexOf(NaN)  
// -1  
[NaN].findIndex(y => Object.is(NaN, y))  
// 0  
```

indexOf方法无法识别数组的NaN成员，但是findIndex方法可以借助Object.is方法做到。

另外findIndex传入的是条件函数，
（返回符合测试条件-true，的第一个数组元素索引，如果没有符合条件的则返回 -1。）
而indexOf是直接传入目标

## String()与toString()的区别

String()转换规则：

1.如果值有toString()，调用值的toString-不带参

2.如果值是null，返回'null'

3.如果值是undefined，返回'undefined'

除了null与undefined外的值都有toString()

而且toString(基数)可以接收一个基数，譬如传8代表8进制输出

但是注意：

```js
console.log(('11').toString()); // 合法输出11
console.log((true).toString()); // 合法输出true
console.log((22).toString()); // 合法输出22

console.log('11'.toString()); // 合法输出11
console.log(true.toString()); // 合法输出true
console.log(22.toString()); // 报错Uncaught SyntaxError: Invalid or unexpected token
console.log(null.toString()); // 报错Cannot read property 'toString' of null
console.log(undefined.toString()); // 报错Cannot read property 'toString' of undefined
```

## getComputedStyle

DOM2级样式中增强了`document.defaultView`，提供了getComputedStyle方法。

接收两个参数：要取得计算样式的元素，和一个伪元素字符串（如:after，可以为null）

返回一个CSSStyleDeclaration对象（与Style属性的类型相同）

譬如

```js
var computedStyle = document.defaultView.getComputedStyle(myDiv, null);

computedStyle.width; // 100px
computedStyle.color; // red
...
```

作用是用来动态计算，因为默认的style对象获取的信息不包括那些从其它样式表层叠而来并影响到当前元素的样式信息。

老版本IE不支持这个方法，它可以通过`myDiv.currentStyle`来达到类似效果

另外，计算样式是只读的。无法通过修改带来影响

另外，不同浏览器的表现可能会有差异，需要多测试，譬如有的浏览器`visibility`为`visible`，有的为`inherit`，因为任何具有默认值的css属性都会表现在计算后的样式中。

## JSON.stringify

接收三个参数：（后两个可以不传）

- 第1个参数是需要转化的对象

- 第2个参数可以是数组或者函数-过滤器

- 第3个参数表示是否在json字符串中保留缩紧

    - 如果是数字，则代表每一层级的缩进空格数
    
    - 如果是字符串，则会用这个字符串替代原有的空格缩进
    （每一层级，原有的多个空格缩进不再用，用这个字符串替代）

```js
JSON.stringify(json, ["title", "name"], 4);

JSON.stringify(json, function(key, value) {
    if (key === 'title') {
        return key + '-hello';
    }
    
    return value;
}, 4);
```

## JSON.parse

除了第一个是字符串，同样接收第2个参数

该参数是一个函数（还原函数），同样用来过滤（接收key-value）

## scrollIntoView方法知道么？

这是一个标准方法，但是处于实验中的功能。

它的定义是：

让当前的元素滚动到浏览器窗口的可视区域内。

用途：

很多时候用来解决input被输入法遮挡问题。

```js
// 等同于element.scrollIntoView(true) 
element.scrollIntoView();
// Boolean型参数 
element.scrollIntoView(alignToTop);
// Object型参数
element.scrollIntoView(scrollIntoViewOptions);
```

传参数：

- alignToTop
    
    - 如果为true，元素的顶端将和其所在滚动区的可视区域的顶端对齐。
    
    - 如果为false，元素的底端将和其所在滚动区的可视区域的底端对齐。
    
- scrollIntoViewOptions（带options的支持情况较差）

    - 一个boolean或一个带有选项的object：
    
    - 如果是一个boolean, true 相当于{block: "start"}，false 相当于{block: "end"}
    
```js
{
    behavior: "auto"  | "instant" | "smooth",
    block:    "start" | "end",
}
```

注意，取决于其它元素的布局情况，此元素可能不会完全滚动到顶端或底端。

更多见w3c。

## scrollIntoViewIfNeeded方法知道么？

首先，这个方法**不是W3C标准**，是一种WebKit专有的方法，所以尽量不要在生产环境中使用它！

这个方法很多时候都被用到解决input被输入法遮挡问题。

因为它的定义是：

用来将不在浏览器窗口的可见区域内的元素滚动到浏览器窗口的可见区域。 
如果该元素已经在浏览器窗口的可见区域内，则不会发生滚动。 
此方法是**标准**的Element.scrollIntoView()方法的专有变体。

支持传一个参数：

- opt_center（一个 Boolean 类型的值，默认为true）：

    - 如果为true，则元素将在其所在滚动区的可视区域中居中对其。
    
    - 如果为false，则元素将与其所在滚动区的可视区域最近的边缘对齐。
     根据可见区域最靠近元素的哪个边缘，元素的顶部将与可见区域的顶部边缘对准，
     或者元素的底部边缘将与可见区域的底部边缘对准。

不过，按w3c上的描述，这个私有属性往往支持性还要比标准属性scrollIntoView好点。

所以解决输入法遮挡input，可以是：

```js
$('input').on('click', function() {
    var target = this;
    
    setTimeout(function() {
        // 可以自己选择是否传参
        if (target.scrollIntoViewIfNeeded) {
            target.scrollIntoViewIfNeeded();
        } else {
            target.scrollIntoView();
        }
    }, 100);
});
```

## es6的proxy与reflect

- proxy对目标对象的属性读取、设置，亦或函数调用等操作进行拦截（处理）

它的操作包括（get、set、propKey in proxy（has）、deleteProperty、defineProperty、for（enumerate）、
construct、getOwnPropertyDescriptor、getPrototypeOf、isExtensible、ownKeys、preventExtensions、setPrototypeOf）等

使用：

```js
let proxy = new Proxy(target,handle)
```

每次target有变动都会通知handle，这里注意，handle内部必须实现若干对应的方法才能接收到拦截，
而且返回的proxy相当于是target的浅拷贝

```js
let target = { _prop: 'foo', prop: 'foo' };
let proxy = new Proxy(target, handler);

proxy._prop = 'bar';
target._attr = 'new'
console.log(target._prop) // 'bar'
console.log(proxy._attr) //'new'
```

```js
let handler = {
    get(target, key) {
        return target[key]
    },
    set(target, key, value) {
        if (key === 'age') {
            // 这样就只有age改变时才会生效
            target[key] = value > 0 && value < 100 ? value: 0
        }
        
        console.log(target[key]);
        return true; //必须有返回值
    }
};

let target = {};
let proxy = new Proxy(target, handler);
proxy.age = 22; //22
```

- Reflect与ES5的Object有点类似，包含了对象语言内部的方法

Proxy相当于去修改设置对象的属性行为，而Reflect则是获取对象的这些行为。

和proxy类似，也有若干静态方法，譬如

```js
Reflect.apply
Reflect.construct
Reflect.defineProperty
Reflect.deleteProperty
Reflect.enumerate // 废弃的
Reflect.get
Reflect.getOwnPropertyDescriptor
Reflect.getPrototypeOf
Reflect.has
Reflect.isExtensible
Reflect.ownKeys
Reflect.preventExtensions
Reflect.set
Reflect.setPrototypeOf
```

注意，`Reflect.call`是不存在的，目前只有上述几种方法（20180208）

譬如，可以这样用：

```js
Reflect.apply(fn, obj, [])
```

这个的作用等价于

```js
fn.apply(obj, []);
// 或
Function.prototype.apply.call(fn, obj, []);
```