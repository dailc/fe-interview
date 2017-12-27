# 难度等级2，最常见的一些概念，新手必须了解

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
