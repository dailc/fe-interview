# js基础语法

## for-of

for-of里可以break，但是不能return;

## javascript中的`"user strict";`是什么意思？使用它区别是什么？

`use strict`是ECMAscript 5中的严格运行模式

如严格模式是ECMAScript 5 中的一种模式，ECMAScript 5中有两种模式，一种是正常模式，一种是“严格模式(strict mode)”，
使用这种模式使得Javascript在更严格的条件下运行。

设立“严格模式”的目的主要有:

1.  消除JS语法的不合理，不严谨之处，减少一些怪异行为
譬如不能用with,不能给未声明的全局变量赋值，不能callee，不允许直接操作argument等

2.  消除代码运行的不安全之处，保证代码运行的安全

3.  提高编译器效率，增加运行速度

4.  为新版本做铺垫，如ES6中全面使用了严格模式

注意，在正常模式下可以运行的代码很有可能严格模式下运行出错。而且ES6中只允许严格模式的用法。

严格模式有两种用法:

1. 在脚本文件(或`<script>`脚本片段)的第一行，使用`'use strict';` 可以将整个脚本文件(片段)以严格模式运行
(注意，如果前面是一些不产生实际运行结果的语句，可以不再第一行-如在开头注释后面,
注意,前面有;号也会取消严格模式；但是如果前面的语句有效-如输出语句，这样则严格模式无效，整个片段会以正常模式运行)

2. 在函数体的第一行使用`'use strict';`则整个函数以严格模式运行
(这种是最常用的写法，通常会将这句话放在一个立即执行的匿名函数中)

使用严格模式后，JS语法和行为与正常模式有所区别:

1. 全局变量显示声明(正常模式下，如果一个变量没有声明就赋值，默认是全局变量，而在严格模式下，会报错)

2. 静止使用with语句(with语句主要用于设置代码在特定对象中的作用域，严格模式下禁用with语句)

3. 创设eval作用域，ES5中，正常模式下，JS语言中有两种变量作用域:全局作用域和函数作用域。
严格模式创设了第三种作用域:eval作用域(这样,eval里面不能再生成全局变量了-正常模式中eval会生影响外部作用域)。

4. 禁止this关键字指向全局对象。在正常情况下,一个普通函数内部的this会指向一个全局对象window,但是严格模式下禁止了这种用法，
严格模式下,普通函数内部的this为undefind，注意：通过new 出来的对象除外，new 出来的会指向自身

5.禁止在函数内部遍历调用栈。正常情况下函数内部可以通过caller等方法调用自身,但是严格模式下禁止了这种用法

6. 禁止删除变量（严格模式下无法删除var显示声明的变量，只能删除属性）
注意,` [object Object]`的属性只有configurable设置为true才能被删除（不过默认隐式创建的一般都是为true），否则无法删除

7. 显式报错。
正常模式下，对于一个对象的只读属性进行赋值，不会报错，只会默默失败，严格模式下，会报错
严格模式下，对于一个使用getter方法读取的属性进行赋值，会报错
严格模式下，对禁止拓展的对象添加新属性（Object.preventExtensions(o)），会报错
严格模式下，删除一个不可删除的属性，或报错（如删除Object.prototype）
严格模式下，删除一个不可删除的属性，或报错
对象不能有重名的属性(正常模式下，如果对象有多个重名属性，最后赋值的那个属性会覆盖前面的值，严格模式下，这属于语法错误)
函数不能有重名参数(正常模式下，如果函数有多个重名参数，可以用argument[i]读取。严格模式下，属于语法错误)

8. 禁止八进制表示法
严格模式下，整数的第一位如果是0，表示这是八进制，比如0100等于十进制的64。但是严格模式下禁止这种写法，证书第一位为0，会报错

9. Arguments对象的限制。
不允许对arguments赋值
Arguments不再追踪参数的变化（如果形参a被改变，对应的arguments是不会改变的）
禁止使用arguments.callee。严格模式下，无法使用caller,也就是说匿名函数内部无法调用自身了

10. 函数必须声明在顶层
严格模式下只允许在全局作用域和函数作用域的顶层声明函数。
不允许在非函数的代码块内声明函数(ES6中会加入块级作用域概念)

11. 保留字。严格模式下，新增了一些保留字:
implements, interface, let, package, private, protected, public, static, yield
使用这些词作为变量或参数将会报错
另外,ES5本身也有些保留字:
class, enum, export, extends, import, super
以及各大浏览器自行增加的 const保留字。这些保留字都不能作为变量名或参数

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

## var和let作用域？

```js
for (let i = 0; i < 5; i++) {
 setTimeout(function() {
  console.log(i);
 }, 1000);
}
console.log(i); // 报错 01234
```

这里的的let是在for循环中声明，
所以当前的i只在本轮循环有效，每一次的循环就是一个新的变量
引擎内部会记住上一次循环的值，初始化本轮循环i时，在上一轮的基础上计算
for循环中，循环语句是一个父作用域，循环体内是一个单独的子作用域
内部原理：
for ( LexicalDeclaration Expressionopt ; Expressionopt ) Statement 规则的时候
每次迭代会新建运行环境记录值为拷贝最后迭代内容
（每次循环体都是个独立的新scope）
所以当次循环体里的定义的func往外爬变量就是当次循环体内的值了

```js
let i;          
for (i = 0; i < 5; i++) {
 setTimeout(function() {
  console.log(i);
 }, 1000);
}
console.log(i); // 5 55555

for (var i = 0; i < 5; i++) {
 setTimeout(function() {
  console.log(i);
 }, 1000);
}
console.log(i); // 5 55555
```

## js的浮点误差？

```js
var a=10.2;
var b= 10.1;

console.log(a - b === 0.1); // false
console.log(a - 10.1 === 0.1); // false,实际是0.09999999999999964
console.log(a - 0.1 === 10.1); // true
```

一般比较方法是判断两个浮点数的误差不大于某个极小数即可，如
`a - b < 1e-7`

或者.toFixed(10)
在判断浮点运算结果前对计算结果进行精度缩小，因为在精度缩小的过程总会自动四舍五入: 
这样

```js
parseFloat((1.0-0.9).toFixed(10)) === 0.1 // true
parseFloat((1.0-0.8).toFixed(10)) === 0.2 // true

(a - 10.1).toFixed(10) // 0.1000000000（自动四舍五入了）
```

不光是js，只要采用IEEE754浮点数标准(由电气电子工程师学会定义的浮点数在内存中的算法规范。)的语言都存在这个问题。
（由美国电气电子工程师学会（IEEE）计算机学会旗下的微处理器标准委员会（Microprocessor Standards Committee, MSC）发布）
IEEE754浮点数主要有单精度（32位）和双精度（64位），js采用双精度。
有些浮点数比如0.1转化为二进制是无穷的，而64位的浮点数表示法尾数位只允许52位，
超出的部分进一舍零，会造成浮点数精度丢失，两个浮点数转化二进制相加后的结果，也遵循这个原则。

譬如：
    十进制           二进制
    0.1              0.0001 1001 1001 1001 ...
    0.2              0.0011 0011 0011 0011 ...
    0.3              0.0100 1100 1100 1100 ...
    0.4              0.0110 0110 0110 0110 ...
    0.5              0.1
    0.6              0.1001 1001 1001 1001 ...
    
所以比如 1.1，其程序实际上无法真正的表示 ‘1.1'，而只能做到一定程度上的准确，这是无法避免的精度丢失：`1.09999999999999999`

## JavaScript中的作用域与变量声明提升?

ES6之前没有块级作用域，var等声明会提前

例如

```js
console.log(a); // undefined
console.log(b); // ReferenceError
var a = 1;
let b = 2;
```

等同于：

```js
var a;
console.log(a); // undefined
console.log(b); // ReferenceError
a = 1;
let b = 2; 
```

另外

```js
function xxx() {}
```

函数声明也会提升，顺序是：

- 先函数声明

- 如果没有声明，则进行变量声明，如果有，变量声明无效

- 变量赋值

```js
var myName;
function myName () {...};
console.log(typeof myName); // function

var myName = 'hello';
function myName () {...};
console.log(typeof myName); // String
```

## JavaScript中的label语法了解么？

注意，是JavaScript中的label不是dom中的label标签

首先看下label语法的示例：（出自JavaScript高级程序设计）

```js
var num=0;
outermost:
for (var i = 0; i < 10; i++){
    for (var j = 0;j < 10; j++){
        if (i == 5 && j == 5){
            break outermost;
        }
        num++;
    }
}
// 55
alert(num);
```

label语句可以在代码中添加标签，以便将来使用，譬如上述的for循环内部就用到label来跳转

但是，MDN上已经明确声明了禁止使用（这也是为什么几乎没看到这段代码）

```js
Avoid using labels
Labels are not very commonly used in JavaScript since they make
programs harder to read and understand. As much as possible, avoid
using labels and, depending on the cases, prefer calling functions or
throwing an error.
```

- [label - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label)

## return?

```js
return {
     name: "hello"
};
return
{
     name: "hello"
};
```

前者是一个Object，后者是undefined.
这是return的设计缺陷-程序被自动补全为了（自动修复机制）

```js
return;
{
     name: "hello"
};
```

##  为什么 parseInt(0.0000008) === 8？

因为隐式转化的问题

parseInt接受的是字符串，所以

`0.0000008`被转化成：

```js
'0.0000008'
'8e-7'
```

嗯，所以因为内部用科学计数法表示了，所以是`8`

另外注意下：

```js
parseInt(0.000008); // 0
```

因为它内部还没有转为科学计数法（这个与JS内部机制有关）
