# 难度等级2，进阶需掌握

## js对象传参是引用传递还是值传递？

JavaScript高级程序设计中，明确指出，是值传递，而不是引用传递

对象传承时，传递的是在栈内存中的值的地址，所以就是函数中对象改变，外部也会改变，因为这个地址指向堆内存中的实际对象

如何区分是引用还是值传递？

```js
function setName(obj) {
    obj.name = 'hello';
    obj = new Object();
    obj.name = 'world';
}

var word = new Object();

setName(word);
alert( word.name); // hello
```

如果是引用传递，那么obj和word是同一个引用，obj改变时，word的引用地址应该自动变化，所以word.name应该是'world'

但是实际上，word.name的值是'hello'，所以可知是值传递而不是引用传递。

实际上，传递的是一个复制后的值，虽然这个值和word一样，指向相同的堆内存，但它和word确实不是同一个东西，所以改变时互不影响

可以把函数中的参数看成局部变量

## 基本包装类型String和基础型字符串的区别？

基础包装型String是对象
typeof 返回object
instanceof String 为true
所有的自动转换为布尔都为true

基础型字符串不是对象
typeof 返回string
instanceof String 为true
可以按照约定规则转为布尔

## 基础数据类型（如string, number）为何能调用一些方法？

示例：

```js
'123'.substr(1);
```

按照JS中的定义，'123'属于基础数据类型，在栈内存中，不属于对象，从逻辑上将它不应该有方法。
但为何实际上，上述的代码调用可以正常运行，并不会报错？

解答：

理论上来说，基础数据类型不是对象（数字，布尔也一样），没有方法。但是为了能让开发者更直观的操作。程序后台会对基础类型操作时进行自动封装处理。即：

1. 基于的基本包装类型：String，Number，Boolean（这个是对象）

2. 当代码访问到'123'时，访问过程处于一种读取模式，也就是要从内存中读取这个字符串的值。而在读取模式中访问字符串时，后台会进行如下处理

```js
1. 创建String类型的一个实例

2. 在实例上调用指定方法

3. 销毁这个实例
```

所以，它可以调用方法，但是，需要注意，这个实例只存在于这一行的一瞬间，在下一行中就被销毁了，所以不能给基础型赋值。

上述相当于

```js
var tmp = new String('123');

tmp.substr(1);
tmp = null;
```


## ECMAScript的单体内置对象？

1. Global
在浏览器中变为window的一部分（注意，window不止有global对象，除了这个还有一些其它的内容）

2. Math

定义了两个不依赖于宿主环境的对象。其中

math定义了一些数学公式的使用

global在浏览器中是window形式表现，作为兜底对象，
譬如undefined，Date，Boolean等都属于global。也就是：

**所有在全局作用域中定义的属性和函数，都是global对象的属性**

一些注意：

- 给eval重新赋值会报错

- ECMAScript5中明确禁止给undefined，NaN，Infinity赋值（即使在非严格模式）

