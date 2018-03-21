# js优化技巧

## 函数节流与防抖？

这里高级程序设计里好像有误，按这个概念来：

- 节流：一段时间才允许执行一次

- 防抖：最后一次执行才有效（一段时间内）


- 节流throttle：触发->(触发时间-上次动作执行时间>大于限制时间)->允许执行动作，记录执行时间

我们不是要在每完成等待某个时间后去执行某函数，而是要每间隔某个时间去执行某函数，避免函数的过多执行
频率控制 返回函数连续调用时，action 执行频率限定为 次 / delay

譬如，如果有一个update函数每帧都会触发，那么里面加上节流的作用就是，可以防止代码连续触发（设一个间隔），可以中间休息（避免无意义的过渡损耗）

```js
var throttle = function(delay, action){
  var last = 0
  return function(){
    var curr = +new Date()
    if (curr - last > delay){
      action.apply(this, arguments)
      last = curr 
    }
  }
}
```

- 防抖debounce：触发-> 清除以前定时->设置定时：若干时间后执行

就是让某个函数在上一次执行后，满足等待某个时间内不再触发此函数后再执行，而在这个等待时间内再次触发此函数，等待时间会重新计算。
空闲控制 返回函数连续调用时，空闲时间必须大于或等于 idle，action 才会执行

相当于防抖的作用是确保最后一次的有效动作完成后被执行，而不是在完成过程中一直执行

```js
var debounce = function(idle, action){
  var last
  return function(){
    var ctx = this, args = arguments
    clearTimeout(last)
    last = setTimeout(function(){
        action.apply(ctx, args)
    }, idle)
  }
}
```

throttle和debounce均是通过减少实际逻辑处理过程的执行来提高事件处理函数运行性能的手段，
并没有实质上减少事件的触发次数。两者在概念理解上确实比较容易令人混淆，结合各js库的具体实现进行理解效果将会更好。

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