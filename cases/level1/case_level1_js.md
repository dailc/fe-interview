# 难度等级1，最常见的一些概念，初级必须了解

## ECMAScript与javascript的区别？

ECMAScript是标准
javascript是实现

ECMAScript定义javascript语言的实现
但是浏览器端的javascript是一般意义上的泛指，同时还包括bom（如navigator对象）和dom等

## JavaScript有几种基本数据类型？

7种（es6新增一种symbol）

1. `number`-数字

2. `string`-字符串

3. `undefined`-未定义，默认都是这个值

4. `boolean`

5. `null`，空对象，原型链的尽头，`typeof`的结果为`object`

6. `object`，复杂对象

7. `symbol`，`es6`新增，表示独一无二

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