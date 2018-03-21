# js基础概念

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

## 什么是闭包(closure)，为什么要用它？

**闭包是指有权访问另一个函数作用域中的变量的函数**（JavaScript高程也这样定义）

创建闭包的最常用方式：在一个函数内创建另一个函数，通过另一个函数访问这个函数的局部变量
利用闭包可以突破作用域链，将函数内部的变量和方法传递到外部
不过也经常会容易造成内存泄漏问题（无法自动回收）

特性：

1.函数内再嵌套函数
2.内部函数引用外层的参数和变量
3.参数和变量不会被垃圾回收机制回收

譬如

```js
function sayHello() {
    // 函数内部变量
    var word = 'hello,world!';
    var index = 0;
    
    return function() {
        console.log(word + (index++));  
    };
}

var say = sayHello();

say(); // hello,world!0
say(); // hello,world!1
```

上面的通俗点将，那个被return的匿名函数就是一个闭包（因为它有访问另一个函数作用域（sayHello函数）中的变量的能力）。
而且可以看到，如果匿名函数没有引用外部函数作用域的变量，正常情况下外部函数执行完后相关内存就销毁了，但是由于它引用了，
并且被外界持有了引用`say`，所以形成了闭包，无法回收内存。