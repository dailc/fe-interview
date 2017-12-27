# 难度等级3，进阶高阶需掌握，不一定都是难点，也有可能是很偏僻

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