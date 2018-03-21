# this

## 谈谈this对象的简单理解。

this总指向函数的直接调用者(而非间接调用者)
譬如 

```js
var ajax = Util.ajax();
ajax();
```

此时this指向window，而不是util

如果有new关键字，this指向new出来的那个对象

在事件中，this指向触发这个事件的对象
特殊（ie中的attachevent的this总是指向全局对象window）

- ES5非严格模式中，函数调用如果未指定，默认this指向window

- 严格模式中则为undefined

## 下述代码的区别？考察指针指向

```js
function foo() {
    console.log(this.a);
}

function active(fn) {
    // 真实调用者，为独立调用
    fn();
}

var a = 20;
var obj = {
    a: 10,
    getA: foo
};

// 20-相当于foo();
active(obj.getA);
```

```js
var a = 20;

function getA() {
    return this.a;
}
var foo = {
    a: 10,
    getA: getA
};

// 10
console.log(foo.getA());
```

## 箭头函数与bind this的区别？

```js
setTimeout(function() {
    console.log("id:", this.id);
}.bind(this),100);
   
setTimeout( () => {
    console.log("id:", this.id);
},100); 
```

这两者是有区别的：

- 箭头函数没有自己的this（所以在里面找就是相当于在外部作用域的this找）

- 普通函数中自己本来是有this的，bind this只不过是把自己的this替换成了传入this的作用域的this而已

另外，不仅仅是this

```js
箭头函数并不绑定 this，arguments，super(ES6)，抑或 new.target(ES6)。
```