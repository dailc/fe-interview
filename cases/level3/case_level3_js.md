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

所以，其实v8并不允许让Date被继承。另外，进一步，你会发现，
就算改变`Object.prototype.toString.call`的值，仍然无效。这是因为它依赖于内部属性`[[Class]]`的缘故，这个属性不是`Date`，就无效

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

## 范围选择range和selection了解么？

JavaScript提到过的知识点，比较冷门，常用有`contentEditable`的可编辑DOM中，譬如下述代码是让某个可编辑的DOM自动聚焦

```js
    function RichEditor(options) {
        options = options || {};
        this.editor = Util.selector(options.container);
    }

    RichEditor.prototype.focus = function() {
        // 创建一个range对象
        var range = document.createRange();
        
        // 将于range对象起点指定为该节点中的所有内容的起点，将range对象终点指定为该节点中的所有内容的终点
        // 使range对象代表的区域中包含该节点所有内容。
        // 类似的还有selectNode，这个是作用于某节点，而不是某节点的内容
        range.selectNodeContents(RE.editor);
        // 向边界点折叠该 Range
        // 折叠后的 Range 为空，不包含节点内容，
        // true折叠到 Range 的 start 节点，false 折叠到 end 节点。如果省略，则默认为 false .
        range.collapse(false);
        
        // 返回一个Selection对象，表示用户选择的文本范围或光标的当前位置。
        // 如果想要将 selection 转换为字符串，可通过连接一个空字符串（""）或使用 String.toString() 方法
        var selection = window.getSelection();
        
        // 会从当前selection对象中移除所有的range对象,取消所有的选择只 留下anchorNode 和focusNode属性并将其设置为null。
        selection.removeAllRanges();
        // 向选区（Selection）中添加一个区域（Range）
        // 结合上面的collapse，这样做就是相当于内容最末处加入了选区，方便后续focus
        selection.addRange(range);
        this.editor.focus();
    };
```

## HTML元素的contentEditable？

常用于在某 DIV中设置，这样就能支持富文本编辑了。

否则必须用iframe+设置DesignMode才能进行富文本编辑

HTMLElement.contentEditable 属性用于表明元素是否是可编辑的。该枚举属性有以下几个值：

- "true" 表明该元素可编辑。

- "false" 表明该元素不可编辑。

- "inherit" 表明该元素继承了其父元素的可编辑状态。

```js
editable = element.contentEditable
element.contentEditable = "true"
```

## Webview加载网页，如果用户更改了手机系统字体，网页字体会被放大，怎么解决？

就算你写死的是  16px之类的固定的像素，
但是，如果用户手动更改了系统字体大小，最终显示的网页字体仍然会被放大。

如何解决呢？这里Android和iOS中有区别

- ios中，通过给 body 设置 `-webkit-text-size-adjust` 属性实现的：

强行将body.style的-webkit-text-size-adjust设为100%即可

（如果不处理，可以看到系统字体放大是，adjust也被放大了，-body.getAttribute('style')可以看出）

- android中，通过给webview设置字体的缩放来完成，`setTextZoom`（需要原生容器完成）

```js
// 新版
webview.getSettings().setTextZoom(200);
// 旧版
webview.getSettings().setTextSize(WebSetting.TextSize.LARGEST);
```

可以设置文本的缩放

实际上，如果不自己处理，系统字体缩放后， Android webview 放大文字的原理：

- 在CSS解析之后，渲染之前，将所有的字体大小的值进行缩放，后面的排版和渲染都会直接使用缩放后的CSS值。

所以看出android和iOS的不同，ios中只改变`size-adjust`，但是android中渲染时确实是实实在在的字体被改了



## WebWorker与SharedWorker？

Web Worker（Dedicated Worker）只属于某个页面，不会和其他页面的Render进程共享，所以Chrome在Render进程中创建一个新的线程来运行Worker中的JavaScript程序。

SharedWorker是浏览器所有页面共享的，不能采用与Worker同样的方式实现，因为它不隶属于某个Render进程，可以为多个Render进程共享使用，
所以Chrome浏览器为SharedWorker单独创建一个进程来运行JavaScript程序，在浏览器中每个相同的JavaScript只存在一个SharedWorker进程，不管它被创建多少次。

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

## JS复合事件

DOM3级别中的一类事件，譬如

IME: Input Method Editor

```js
compositionstart（IME文本复合系统打开时触发）
compositionupdate（在向输入字段中插入新字符时触发）
compositionend（IME文本复合系统关闭时触发，表示返回正常键盘输入状态）
```

常用于筛选输入，在现代浏览器中，都支持的不错（而且IE9居然是率先支持的）