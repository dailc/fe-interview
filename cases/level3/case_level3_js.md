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

## scrollIntoView方法知道么？

这是一个标准方法，但是处于实验中的功能。

它的定义是：

让当前的元素滚动到浏览器窗口的可视区域内。

用途：

很多时候用来解决input被输入法遮挡问题。

```js
// 等同于element.scrollIntoView(true) 
element.scrollIntoView();
// Boolean型参数 
element.scrollIntoView(alignToTop);
// Object型参数
element.scrollIntoView(scrollIntoViewOptions);
```

传参数：

- alignToTop
    
    - 如果为true，元素的顶端将和其所在滚动区的可视区域的顶端对齐。
    
    - 如果为false，元素的底端将和其所在滚动区的可视区域的底端对齐。
    
- scrollIntoViewOptions（带options的支持情况较差）

    - 一个boolean或一个带有选项的object：
    
    - 如果是一个boolean, true 相当于{block: "start"}，false 相当于{block: "end"}
    
```js
{
    behavior: "auto"  | "instant" | "smooth",
    block:    "start" | "end",
}
```

注意，取决于其它元素的布局情况，此元素可能不会完全滚动到顶端或底端。

更多见w3c。

## scrollIntoViewIfNeeded方法知道么？

首先，这个方法**不是W3C标准**，是一种WebKit专有的方法，所以尽量不要在生产环境中使用它！

这个方法很多时候都被用到解决input被输入法遮挡问题。

因为它的定义是：

用来将不在浏览器窗口的可见区域内的元素滚动到浏览器窗口的可见区域。 
如果该元素已经在浏览器窗口的可见区域内，则不会发生滚动。 
此方法是**标准**的Element.scrollIntoView()方法的专有变体。

支持传一个参数：

- opt_center（一个 Boolean 类型的值，默认为true）：

    - 如果为true，则元素将在其所在滚动区的可视区域中居中对其。
    
    - 如果为false，则元素将与其所在滚动区的可视区域最近的边缘对齐。
     根据可见区域最靠近元素的哪个边缘，元素的顶部将与可见区域的顶部边缘对准，
     或者元素的底部边缘将与可见区域的底部边缘对准。

不过，按w3c上的描述，这个私有属性往往支持性还要比标准属性scrollIntoView好点。

所以解决输入法遮挡input，可以是：

```js
$('input').on('click', function() {
    var target = this;
    
    setTimeout(function() {
        // 可以自己选择是否传参
        if (target.scrollIntoViewIfNeeded) {
            target.scrollIntoViewIfNeeded();
        } else {
            target.scrollIntoView();
        }
    }, 100);
});
```

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

## 有试过继承Date对象么？

首先，一般情况下，这个需求都是，由于需要自己定制拓展一个Date工具类才有的。

但是，Date是无法继承的（指的是是经典的那种继承法）。MDN文档有如下说明：

```js
Note: Note that Date objects can only be instantiated by calling Date or using it as a constructor;
unlike other JavaScript object types, Date objects have no literal syntax.
```

看起来就是，Date并不是一个普通的对象，而是被特殊定制过的。所以无法让你去直接继承。

然后再看看V8中的代码

```js
function DateGetHours() {
  var t = DATE_VALUE(this);
  if (NUMBER_IS_NAN(t)) return t;
  return HOUR_FROM_TIME(LocalTimeNoCheck(t));
}

...

DATE_VALUE(arg) = (%_ClassOf(arg) === 'Date' ? %_ValueOf(arg) : ThrowDateTypeError());
```

所以，其实v8并不允许让Date被继承。

当然，经典的继承无法使用，并不代表真的没有方法，譬如以下一些：

- 可以用以下方法进行伪继承：

```js
function MyDate() {
   var _d=new Date();
   function init(that) {
      var i;
      var which=['getDate','getDay','getFullYear','getHours',/*...*/,'toString'];
      for (i=0;i<which.length;i++) {
         that[which[i]]=_d[which[i]]; 
      }
   }
   init(this);
   this.doSomething=function() {
    console.log("DO");
   }
}
```

上述代码仅是距离，实际上可以结合原型，总的来说，相当于是把Date原有的方法全部代理一遍。

- 可以通过原型链欺骗方式（核心是原型链的指向），如下

```js
    /**
     * Date无法被直接继承，需要用些技巧
     * 参考：https://stackoverflow.com/questions/6075231/how-to-extend-the-javascript-date-object
     */
    function MyDate() {
        var dateInst = new (Function.prototype.bind.apply(
            Date,
            [Date].concat(Array.prototype.slice.call(arguments))
            ));
        
        // 更改原型指向，否则无法调用MyDate原型上的方法
        Object.setPrototypeOf(dateInst, MyDate.prototype);
        
        return dateInst;
    }
    
    // 原型重新指回Date，否则根本无法算是继承
    Object.setPrototypeOf(MyDate.prototype, Date.prototype);
    
    MyDate.prototype.format = function(fmt) {
        ...
    };

    var myDate = new MyDate();
    
    myDate.getFullYear();
    myDate.format();
```


核心思路是：

```js
- 返回的对象仍然是Date（相当于是寄生模式），所以符合底层的类型判断

- 然后这个Date的原型指向了SubDate，所以它可以调用到SubDate原型上的方法

- 然后SubDate的原型又指回了Date，这样的话Date又回到了原型上（判断类型也方便，看起来也更像继承了）

- 有一个缺点是无法覆盖date原有方法（不过看起来并不是缺点，因为本来就不应该覆盖）
```

## innerHtml设置脚本会有什么效果？

除了IE8及更早版本，现代浏览器中通过innerHTML插入的脚本元素并不会执行。（dom对象已经插入了，但是不会执行这个脚本）

```html
1. div.innerHTML = "<script defer> alert('hello!');<\/script>";

2. div.innerHTML = "_<script defer> alert('hello!');<\/script>";

3. div.innerHTML = "<div></div><script defer> alert('hello!');<\/script>";

4. div.innerHTML = "<div>&nbsp;</div><script defer> alert('hello!');<\/script>";

5. div.innerHTML = "<input type=\"hidden\"/><script defer> alert('hello!');<\/script>";
```

譬如上述的一系列设置都不会执行（chrome等一系列现代浏览器中的效果）

IE8中则是只要脚本加上了defer属性，并且前面有一个“有作用域元素”，就可以正常执行。（这里不过度描述ie8）

'无作用域的元素'(NoScope element):

如`style`，`script`元素或注释类似。
有作用域则相反


