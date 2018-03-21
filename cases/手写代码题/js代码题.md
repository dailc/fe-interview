# js代码题

## 用js实现千位分隔符?

只考虑整数

```js
function commafy(num) {
    return num && num
          .toString()
          .replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {
              return $1 + ",";
          });
}

console.log(commafy(1234567.90)); //1,234,567.90
```

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

