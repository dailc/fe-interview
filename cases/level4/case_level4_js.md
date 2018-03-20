# 难度等级4，难点或深度知识


## 全面考察js基础

```js
function Foo() {
    getName = function () { alert (1); };
    return this;
}
Foo.getName = function () { alert (2);};
Foo.prototype.getName = function () { alert (3);};
var getName = function () { alert (4);};
function getName() { alert (5);}

// 答案：
Foo.getName();//2
getName();//4
Foo().getName();//1，补充，严格模式下报错，因为严格模式下函数默认的this为undefined
getName();//1
new Foo.getName();//2
new Foo().getName();//3
new new Foo().getName();//3
```

## 尾递归优化

尾递归优化的实质是：函数的调用栈中，可以回收那些没有用用处的函数（因为没有被引用，所以可以被回收），防止爆栈

示例如下：

未优化的普通递归：

```js
function factorial(n) {
  if (n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

factorial(5); // 120
```

这个函数中，执行栈中需要保留`n`个调用记录（因为每一次都有一个n被引用，无法回收），
所以无法进行优化，容易爆栈

改成**尾递归**如下：

```js
function factorial(n, total) {
  if (n === 1) {
    return total;
  }
  
  return factorial(n - 1, n * total);
}

factorial(5, 1); // 120
```

这里面可以看到，不断递归时，最外层的都是属于无用函数了，可以被优化回收，因此栈中可以优化到只保留一个调用记录。


再看一看，Fibonacci数列的普通递归：

```js
function Fibonacci (n) {
  if ( n <= 1 ) {return 1};

  return Fibonacci(n - 1) + Fibonacci(n - 2);
}

Fibonacci(10) // 89
Fibonacci(100) // 堆栈溢出
Fibonacci(500) // 堆栈溢出
```

尾递归优化后的实现：

```js
function Fibonacci2 (n , ac1 = 1 , ac2 = 1) {
  if( n <= 1 ) {return ac2};

  return Fibonacci2 (n - 1, ac2, ac1 + ac2);
}

Fibonacci2(100) // 573147844013817200000
Fibonacci2(1000) // 7.0330367711422765e+208
Fibonacci2(5000) // Infinity
```

“尾调用优化”对递归操作意义重大，所以一些函数式编程语言将其写入了语言规格。

ES6 是如此，第一次明确规定，所有 ECMAScript 的实现，都必须部署“尾调用优化”。

这就是说，ES6 中只要使用尾递归，就不会发生栈溢出，相对节省内存。

经实践，效果很明显：

- 如果没有使用尾递归优化。Fibonacci(100)时就会一直转圈圈了

- 如果开启了尾递归优化，Fibonacci2(5000)左右都无压力（不过大于10000左右还是会直接爆栈-不过不会一直转圈圈）

- 另外，chrome中现代（201801左右）已经默认就开启尾递归优化了，无需手动开启（--harmony-tailcalls），毕竟时代在进步