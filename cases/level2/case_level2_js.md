# 难度等级2，进阶需掌握

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

## 基本包装类型String和基础型字符串的区别？

基础包装型String是对象
typeof 返回object
instanceof String 为true
所有的自动转换为布尔都为true

基础型字符串不是对象
typeof 返回string
instanceof String 为true
可以按照约定规则转为布尔

## 基础数据类型（如string, number）为何能调用一些方法？

示例：

```js
'123'.substr(1);
```

按照JS中的定义，'123'属于基础数据类型，在栈内存中，不属于对象，从逻辑上将它不应该有方法。
但为何实际上，上述的代码调用可以正常运行，并不会报错？

解答：

理论上来说，基础数据类型不是对象（数字，布尔也一样），没有方法。但是为了能让开发者更直观的操作。程序后台会对基础类型操作时进行自动封装处理。即：

1. 基于的基本包装类型：String，Number，Boolean（这个是对象）

2. 当代码访问到'123'时，访问过程处于一种读取模式，也就是要从内存中读取这个字符串的值。而在读取模式中访问字符串时，后台会进行如下处理

```js
1. 创建String类型的一个实例

2. 在实例上调用指定方法

3. 销毁这个实例
```

所以，它可以调用方法，但是，需要注意，这个实例只存在于这一行的一瞬间，在下一行中就被销毁了，所以不能给基础型赋值。

上述相当于

```js
var tmp = new String('123');

tmp.substr(1);
tmp = null;
```


## ECMAScript的单体内置对象？

1. Global
在浏览器中变为window的一部分（注意，window不止有global对象，除了这个还有一些其它的内容）

2. Math

定义了两个不依赖于宿主环境的对象。其中

math定义了一些数学公式的使用

global在浏览器中是window形式表现，作为兜底对象，
譬如undefined，Date，Boolean等都属于global。也就是：

**所有在全局作用域中定义的属性和函数，都是global对象的属性**

一些注意：

- 给eval重新赋值会报错

- ECMAScript5中明确禁止给undefined，NaN，Infinity赋值（即使在非严格模式）

## 分别介绍js中的几种基本数据类型

1. `number`-数字

2. `string`-字符串

3. `undefined`-未定义，默认都是这个值

4. `boolean`

5. `null`，空对象，原型链的尽头，`typeof`的结果为`object`

6. `object`，复杂对象

7. `symbol`，`es6`新增，表示独一无二


__null__

null型也只有一个值,即null，从逻辑角度来看，null值表示一个空指针
(这也是使用typeof操作符检测返回object的原因)。

如果定义的变量准备在将来用于保存对象，那么最好将该变量初始化为null而不是其它值。
这样只要直接检测null值就可以知道相应的变量是否已经保存了一个对象的引用了。

(undefined==null但是undefined!==null)

__boolean__

boolean型只有两个字面值true,false。但是这两个值和数字值不是一回事
true不一定等于1,而false也不一定等于0。
对象在判断时，比如”if(booleanObj)”会自动将它类型转为boolean值

转换规则：

| 类型 | 转为true的值 | 转为false的值 |
| :------------- |:-------------:|-------------:|
| Boolean | true | false |
| String | 任何非空字符串 | 空字符串（"",''） |
| Number | 任意非零数字（包括无穷大） | 0和NAN |
| Object | 任意非空对象 | null |
| Undefined | 不适用 | undefined |

__number__

number类型用来表示整型和浮点数字
还有一种特殊的数值NaN-not a number,
(这个数值用于表示一个本来要返回数值的操作数未返回数值得情况-防止抛出错误)

比如在其它语言中数值÷0都会导致错误，停止运行，
但是在JS中。0/0、NaN/0会返回NaN，其它数字/0会返回Infinity，不会报错。

NaN与任何值都不相等，包括NaN本身
任何涉及与NaN的操作都会返回NaN，
JS有一个isNaN()函数，可以判断接收的参数是否为NaN,或者参数转化为数字后是否为NaN

注意:typeof Infinity的类型是number

有两种方法可以将非number类型的值转换为number类型

```js
// 一种是隐式转换,如进行(*、/)操作时,会自动其余类型的值转为number类型

console.log("1" * 2); // 12
console.log("1" / 2); // 0.5
console.log("1a" / 2); // NaN

一种是显示转换-调用Number()、parseInt()、parseFloat()方法转换
```

Number()函数的转换规则如下：

- 如果是boolean值，true和false将分别被替换为1和0
- 如果是数字值，只是简单的传入和返回
- 如果是null值，返回0
- 如果是undefined，返回NaN
- 如果是字符串，遵循下列规则：
    如果字符串中只包含数字，则将其转换为十进制数值，即”1“会变成1，”123“会变成123，而”011“会变成11（前导的0被忽略）
    如果字符串中包含有效的浮点格式，如”1.1“，则将其转换为对应的浮点数（同样，也会忽略前导0）
    如果字符串中包含有效的十六进制格式，例如”0xf“，则将其转换为相同大小的十进制整数值
    如果字符串是空的，则将其转换为0
    如果字符串中包含除了上述格式之外的字符，则将其转换为NaN
- 如果是对象，则调用对象的valueOf()方法，然后依照前面的规则转换返回的值。
- 如果转换的结果是NaN，则调用对象的toString()方法，然后再依次按照前面的规则转换返回的字符串值。

```js
console.log(Number('')); // 0
console.log(Number('a')); // NaN
console.log(Number(true)); // 1
console.log(Number('001')); // 1
console.log(Number('001.1')); // 1.1
console.log(Number('0xf')); // 15
console.log(Number('000xf')); // NaN
var a = {};
console.log(Number(a)); // NaN
a.toString = function(){return 2};
console.log(Number(a)); // 2
a.valueOf = function(){return 1};
console.log(Number(a)); // 1  
```

parseInt()常常用于将其它类型值转化为整形。parseInt转换与Number()有区别，具体规则如下

- parseInt(value,radius)有两个参数，第一个参数是需要转换的值，第二个参数是转换进制
(该值介于 2 ~ 36 之间。如果该参数小于 2 或者大于 36，则 parseInt() 将返回 NaN。)

- 如果不传(或值为0)，默认以10为基数(如果value以 “0x” 或 “0X” 开头，将以 16 为基数)

- 注意在第二个参数默认的情况下，如果需要转换的string值以0开头,
如'070',有一些环境中,会自动转化为8进制56，有一些环境中会自动转化为10进制70。
所以为了统一效果，我们在转换为10进制时，会将第二个参数传10

parseInt转换示例

```js
console.log(parseInt('')); // NaN
console.log(parseInt('a')); // NaN
console.log(parseInt('1234blue')); // 1234
console.log(parseInt(true)); // NaN
console.log(parseInt('070')); // 70,但是有一些环境中会自动转换为8进制56
console.log(parseInt('070',8)); // 56
console.log(parseInt('001.1')); // 1
console.log(parseInt('0xf')); // 15,16进制
console.log(parseInt('AF',16)); // 175，16进制
console.log(parseInt('AF')); // NaN
console.log(parseInt('000xf')); // 0
var a = {};
console.log(parseInt(a)); // NaN
a.toString = function(){return 2};
console.log(parseInt(a)); // 2
a.valueOf = function(){return 1};
console.log(parseInt(a)); // 2                            
```

parseFloat()转换规则基本与parseInt()一致，只有如下不同点

parseFloat()遇到浮动数据时，浮点有效(但是只有第一个.有效)，如"10.1"会被转为10.1；'10.1.1'会被转为10.1
parseFloat()只会默认处理为10进制，而且会忽略字符串前面的0，所以不会有在默认情况下转为8进制的情况

```js
console.log(parseFloat('1234blue')); // 1234
console.log(parseFloat('1234blue',2)); // 1234
console.log(parseFloat('0xA')); // 0
console.log(parseFloat('10.1')); // 10.1
console.log(parseFloat('10.1.1')); // 10.1
console.log(parseFloat('010')); // 10     
```

由于Number()函数在转换字符串时比较复杂而且不够合理，因此在处理整数的时候更常用的是parseInt()函数
-需注意最好第二个参数传10，处理浮点数时更常用parseFloat()

另外注意,浮点数直接的计算存在误差,所以两个浮点数无法用"=="进行判断

```js
var a=10.2;
var b= 10.1;

console.log(a - b === 0.1); // false
console.log(a - 10.1 === 0.1); // false,实际是0.09999999999999964
console.log(a - 0.1 === 10.1); // true    
```

__string__

string类型用于表示由零或多个16位Unicode字符组成的字符序列，即字符串。
字符串可以由单引号('')或双引号("")表示。任何字符串的长度都可以通过访问其length属性取得。
要把一个值转换为一个字符串有两种方式。
第一种是使用几乎每个值都有的toString()方法(null和undefined没有)；
第二种是通过加上一个空字符串。

__object__

除去简单数据类型，其它类型都是基于Object类型拓展的。

这种类型有一种笼统的称呼为引用类型(因为指向的栈内存去为指针、引用，指向的是堆内存区的实际内容)。
该类型的实例化对象时一组数据和功能(函数)的集合，实例化对象的过程有两种，
一种是通过new操作符，一种是通过对象字面量表示法。

像一些常见的类型如Array,Date,Function等都是基于Object进行拓展的。所以它们的本质都是Object型。

__symbol__

es6引入的一种新的基本类型，由全局Symbol()函数创建，每次调用Symbol()函数，都会返回一个唯一的Symbol,
因为每个 Symbol 值都是唯一的，因此该值不与其它任何值相等。

```js
let symbol1 = Symbol();
let symbol2 = Symbol();
 
console.log(symbol1 === symbol2); // false
console.log(typeof symbol1); // "symbol"
```

它常常用于充当唯一的对象键。

JavaScript中最常见的对象检查的特性会忽略symbol键。
例如，for-in循环只会遍历对象的字符串键，symbol键直接跳过，
Object.keys(obj)和Object.getOwnPropertyNames(obj)也是一样。
但是symbols也不完全是私有的：
用新的API Object.getOwnPropertySymbols(obj)就可以列出对象的symbol键。
另一个新的API，Reflect.ownKeys(obj)，会同时返回字符串键和symbol键。

注意：symbol不能被自动转换为字符串，这和语言中的其它类型不同。尝试拼接symbol与字符串将得到TypeError错误。
通过String(sym)或sym.toString()可以显示地将symbol转换为一个字符串，从而回避这个问题。

获取symbol的三种方法
1.调用Symbol()。这种方式每次调用都会返回一个新的唯一symbol。
2.调用Symbol.for(string)。这种方式会访问symbol注册表，其中存储了已经存在的一系列symbol。
这种方式与通过Symbol()定义的独立symbol不同，symbol注册表中的symbol是共享的。
如果你连续三十次调用Symbol.for("cat")，每次都会返回相同的symbol。
注册表非常有用，在多个web页面或同一个web页面的多个模块中经常需要共享一个symbol。
3.使用标准定义的symbol，例如：Symbol.iterator。
标准根据一些特殊用途定义了少许的几个symbol。

应用：
1.使instanceof可扩展。
在ES6中，表达式object instanceof constructor被指定为构造函数的一个方法：
constructor[Symbol.hasInstance](object)。这意味着它是可扩展的。
2.消除新特性和旧代码之间的冲突。
这一点非常复杂，但是我们发现，添加某些ES6数组方法会破坏现有的Web网站。
其它Web标准有相同的问题：向浏览器中添加新方法会破坏原有的网站。
然而，破坏问题主要由动态作用域引起，
所以ES6引入一个特殊的symbol——Symbol.unscopables，Web标准可以用这个symbol来阻止某些方法别加入到动态作用域中。
3.支持新的字符串匹配类型。
在ES5中，str.match(myObject)会尝试将myObject转换为正则表达式对象（RegExp）。
在ES6中，它会首先检查myObject是否有一个myObject[Symbol.match](str)方法。
现在的库可以提供自定义的字符串解析类，所有支持RegExp对象的环境都可以正常运行。

还可以用来模拟私有变量
可以用来创建枚举类型


实际上，symbol是PHP和Python中的__doubleUnderscores在JavaScript语言环境中的改进版。
symbol在Firefox 36和Chrome 38中均已被实现。

## ES5中js经典的继承代码（最公认有效的那个）

```js
    function inherit(subClass, superClass) {  
        function F() {}
        F.prototype = superClass.prototype;
        // 将实例作为子类的原型
        // 为什么不直接 new superClass()，因为new superClass消耗的内存更多，而一个空对象消耗的较少
        subClass.prototype = new F();
        subClass.prototype.constructor = subClass.constructor;
    }
```

## setTimeout与setInterval的区别?

```js
setTimeout(function timer() {
    ...
    setTimeout(timer, 1000);
}, 1000);

setInterval(function timer() {
    ...
}, 1000);
```

乍看之下两者的效果应该一样，但实际上细节处理上相差很多。

__实现机制__

而JavaScript是一个单线程解释器，为了控制代码执行，会有一个任务队列

- setTimeout中，相当于过了1000毫秒后，把timer的执行添加到任务队列中，
也就是说不一定立马执行回调中的代码，
而是会等待队列前面的代码执行完毕后再执行，
当然，如果在延期时间之内调用，clearTimeout，就取消这次延期（超时）调用了。
执行完后，这次延期调用就结束了

- setInterval中，解释器会按照指定的时间间隔重复执行代码，直指间歇调用被取消或者页面被卸载。

一般认为使用超时调用来模拟间歇调用是一种最佳模式，因为：

**后一个间歇调用可能会在前一个间歇调用结束前启动，而超时调用中则没有这个问题**

当然了，对于某些需要更精确的计时类任务另算。（因为函数执行内需要时间，超时调用模拟，不一定每次都是精确的间隔）

而且有一点，不同浏览器中，哪怕你设置间隔时间为0，实质上也会有一个最小间隔时间的，由不同浏览器中实现。
譬如ff1-50ms，ie10下2-5ms，chrome下5-6ms等等

__setInterval的缺点__

- 累计效应，如果定时器代码在（定时函数）再次添加到队列之前还没有完成执行，就会导致定时器代码连续运行好几次，而之间没有间隔。

- 譬如像iOS的webview,或者Safari等浏览器中都有一个特点，**在滚动的时候是不执行JS的**，
如果使用了setInterval，会发现在滚动结束后会执行多次由于滚动不执行JS积攒回调，
如果回调执行时间过长,就会非常容器造成卡顿问题和一些不可知的错误

- 而且把浏览器最小化显示等操作说，setInterval会暂时进入休眠状态，
并不是不执行程序，它会把setInterval的回调函数放在队列中，等浏览器窗口再次打开时，一瞬间全部执行时

- 就算正常间隔执行，多个定时器的代码执行时间可能会比预期小（因为代码执行需要一定时间）


__推荐使用requestAnimationFrame替代setTimeout__

- requestAnimationFrame会把每一帧中的所有DOM操作集中起来，
在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率，
一般来说，这个频率为每秒60帧。

- 在隐藏或不可见的元素中，requestAnimationFrame将不会进行重绘或回流，这当然就意味着更少的的cpu，gpu和内存使用量


所以最佳实践应该是requestAnimationFrame，其次才是setTimeout模拟，避免直接使用setInterval

## 对象到字符串的转换步骤

1.如果对象有toString()方法，javascript调用它。如果返回一个原始值（primitive value如：string number boolean）,将这个值转换为字符串作为结果

2.如果对象没有toString()方法或者返回值不是原始值，javascript寻找对象的valueOf()方法，如果存在就调用它，返回结果是原始值则转为字符串作为结果

3.否则，javascript不能从toString()或者valueOf()获得一个原始值，此时throws a TypeError

## 对象到数字的转换步骤

1.如果对象有valueOf()方法并且返回元素值，javascript将返回值转换为数字作为结果

2.否则，如果对象有toString()并且返回原始值，javascript将返回结果转换为数字作为结果

3.否则，throws a TypeError

## `<,>,<=,>=`的比较规则

所以比较运算符都支持任意类型，但是比较只支持数字和字符串，所以需要执行必要的转换然后进行比较，转换规则如下：

1.如果操作数是对象，转为原始值：如果valueOf方法返回原始值，则使用这个值，否则使用toString方法的结果，如果转换失败则报错

2.经过必要的对象到原始值的转换后，如果两个操作数都是字符串，按照字符串顺序进行比较（它们的16位unicode值的大小）
注意，不是字母表中的位置，是编码，譬如B的编码是66，a的编码是97，所以B < a

3.否则，如果有一个操作数不是字符串，将两个操作数转位数字进行比较

4.NaN与任何结果比较都返回false

## ==运算符判断相等的流程是怎样的

1.如果两个值类型相同，按照===比较方法进行比较

2.如果类型不同，使用如下规则进行比较

3.如果其中一个值是null，另一个是undefined，它们相等

4.如果一个值是数字另一个是字符串，将字符串转换为数字进行比较

5.如果有布尔类型，将true转换为1，false转换为0，然后用==规则继续比较

6.如果一个值是对象，另一个是数字或字符串，将对象转换为原始值然后用==规则继续比较

7.其他所有情况都认为不相等
譬如NaN与任何数都不相等包括它本身
undefined和null两者都与0是不相等的

## ===运算符判断相等的流程是怎样的

1.如果两个值不是相同类型，它们不相等

2.如果两个值都是null或者都是undefined，它们相等

3.如果两个值都是布尔类型true或者都是false，它们相等

4.如果其中有一个是NaN，它们不相等

5.如果都是数值型并且数值相等，他们相等， -0等于0

6.如果他们都是字符串并且在相同位置包含相同的16位值，他它们相等;
如果在长度或者内容上不等，它们不相等；
两个字符串显示结果相同但是编码不同==和===都认为他们不相等

7.如果他们指向相同对象、数组、函数，它们相等；
如果指向不同对象，他们不相等

## ,号操作符

```js
var num = (5, 1, 4, 3, 2); // num的值为2
```

逗号操作符总会返回表达式中最后一项

## ~~和Math.floor()的区别

首先，两者都能实现的功能就是：取整

如

```js
~~1.1; // 1
Math.floor(1.1); // 1
```

区别在于：
javascript内部的数值默认按IEEE-754 64位格式存储

而~~属于位操作，位操作只会在32位上进行，所以会将值先转位32位，执行完操作后再转回去
而Math.floor是直接在64位上操作

所以说，两者的适合精度不一样，Math.floor更通用，但是~~效率更高

## !运算符的工作流程

这是逻辑非操作

1.如果操作数是一个对象，返回false

2.如果操作对象是一个空字符串，返回true

3.如果操作对象是一个非空字符串，返回false

4.如果操作对象是0，返回true

5.如果操作对象是非0数值（包括Infinity），返回false

6.如果操作对象是NaN，返回true

7.如果操作对象是null，返回true

8.如果操作对象是undefined，返回true

### ++和--运算符的工作流程

数值的或直接++或--，其它的

1.如果应用对象是一个包含有效数字的字符串时，会先将其转换为数字，然后++或--，字符串变数值

2.如果不包含有效数字，将变量的值设置为NaN，字符串变数值

3.如果是false，先变为0，然后++或--，布尔变数值

4.如果是true，先变为1，然后++或--，布尔变数值

5.如果是浮点数字，直接++或--

6.应用于对象，先调用对象的valueOf()以取得一个可操作的值，按照前述规则解析，如果是NaN，继续调用toString()，
继续前述规则解析，对象变数值

## +和-运算符的工作流程

该操作符会像Number()一样对值进行转换

1.false,true-0,1

2.字符串按照特殊规则解析

3.对象先调用valueOf()，如果非法则调用toString()

## *运算符工作流程

1.如果操作符都是数值，执行常规的乘法操作，即正负得负，负负得正，
如果乘积超过了ECMAScript数值的表示范围，则返回Infinity或-Infinity

2.如果有一个操作数是NaN，则结果是NaN

3.如果是Infinity与0相乘，结果是NaN

4.如果是Infinity与非0相乘，则结果是Infinity或-Infinity，取决于有符号操作数的符号。

5.如果是Infinity与Infinity相乘，则结果是Infinity

6.如果有一个操作数不是数值，则在后台调用Number()将其转换为数值，然后再应用到上面的规则

## /运算符工作流程

1.如果操作符都是数值，执行常规的除法操作，
如果商超过了ECMAScript数值的表示范围，则返回Infinity或-Infinity

2.如果有一个操作数是NaN，则结果是NaN

3.如果是Infinity被Infinit除，结果是NaN

4.如果是零被零除，则结果是NaN

5.如果是非零的有限数被零除，则结果是Infinity或-Infinity，取决于有符号操作数的符号

6.如果是Infinity被任何非零数值除，则结果是Infinity或-Infinity，取决于有符号操作数的符号。

7.如果有一个操作数不是数值，则在后台调用Number()将其转换为数值，然后再应用于上面的规则。

## 求模运算符工作流程

1.如果两个操作符都是数值，执行常规的除法计算，返回除得的余数

2.如果被除数是无穷大值而除数是有限大的数值，返回NaN

3.被除数是有限大的值，而除数是零，则结果是NaN

4.如果是Infinity被Infinity除，则结果是NaN

5.被除数是有限大的数值而除数是无穷大的数值，则结果是被除数。

6.如果被除数是零，则结果是零

7.如果有一个操作数不是数值，则在后台调用Number()将其转换为数值，然后再应用于上面的我规则

## 加性操作符工作流程

1.如果有一个操作数是NaN，则结果是NaN

2.如果是Infinity加Infinity，结果是Infinity

3.如果是-Infinity加-Infinity，结果是-Infinity

4.如果是Infinity加-Infinity，结果是NaN

5.如果是+0加+0，结果是+0

6.如果是-0加-0，结果是-0

7.如果是+0加-0，结果是+0

不过，如果有一个操作符是字符串，则运用一下规则

1.如果两个操作数都是字符串，则将第二个操作数与第一个操作数拼接

2.如果只有一个操作数是字符串，则将另一个操作数转为字符串，然后两个操作数拼接

3.如果有一个操作数是对象，数值或布尔，则调用它们的toString()方法获取相应的字符串值，然后再应用前面关于字符串的规则，
对于undefined和null，分别调用String()函数并取得字符串'undefined'和'null'

注意：

```js
'1' + 2 + 3; // 结果是123
```

## 减性操作符工作流程

1.如果两个操作符都是数值，则执行常规的算数操作符并返回结果

2.如果有一个操作符是NaN，返回NaN

3.如果是Infinity减Infinity，结果是NaN

4.如果是-Infinity减-Infinity，结果是NaN

5.如果是Infinity减-Infinity，结果是Infinity

6.如果是-Infinity减Infinity，结果是-Infinity

7.如果是+0减+0，结果是+0

8.如果是-0减+0，结果是-0

9.如果是-0减-0，结果是+0

10.如果有一个操作符是字符串，布尔值，undefined或null，则在后台先调用Number()转为数值，
然后再根据前面的规则执行减法计算，
如果转换结果是NaN，则减法结果是NaN

11.如果有一个操作符是对象，则调用对象的valueOf()获取改对象的值，如果得到NaN，
那么结果是NaN，
如果对象没有valueOf()，则调用toString()并转为数值

## 为什么说+拼接字符串效率低

因为js中，字符串是原始值，创建后是无法更改的（栈内存中）

```js
var lang = 'hello';

lang = lang + ' world';
```

1.变量lang开始时包含字符串'hello'

2.第二行代码把'hello'重新定义为'hello'与' world'的组合

实现这个操作的过程如下：
1.首先创建一个新的字符串（容纳组合的所有字符）
2.然后这个字符串填充'hello'与' world'的组合
3.销毁原来的字符串'hello'与' world'（因为这两个字符串已经没用了）

这也是为什么某些旧版浏览器字符串拼接时速度很慢

不过，一般新版的浏览器中已经修复了这个问题，当然了，一般情况下我们还是会避免代码拼接字符串的

## Object.is与原来的比较操作符 ===， ==的区别？

ES6才新增
两等号判等，会在比较时进行类型转换；
三等号判等(判断严格)，比较时不进行隐式类型转换,（类型不同则会返回false）；

Object.is 在三等号判等的基础上特别处理了 NaN 、-0 和 +0 ，保证 -0 和 +0 不再相同，
但 Object.is(NaN, NaN) 会返回 true.

Object.is 应被认为有其特殊的用途，而不能用它认为它比其它的相等对比更宽松或严格。


## 给一个dom同时绑定两个点击事件，一个用捕获，一个用冒泡。会执行几次事件，会先执行冒泡还是捕获？

```js
addEventListener(name, func, useCapture);
```

第三个参数是是否冒泡

冒泡意味着从下到上
捕获则相反，从上到下

无论是冒泡事件还是捕获事件，元素都会先执行捕获阶段
从上往下，如有捕获事件，则执行；
一直向下到目标元素后，从目标元素开始向上执行冒泡元素，
即第三个参数为true表示捕获阶段调用事件处理程序，如果是false则是冒泡阶段调用事件处理程序。
(在向上执行过程中，已经执行过的捕获事件不再执行，只执行冒泡事件。)

所以同时监听捕获和冒泡时的顺序：
父级捕获->子级捕获->子级冒泡->父级冒泡

`e.stopPropagation();`可阻止冒泡或捕获的传播

## 事件是？IE与火狐的事件机制有什么区别？ 如何阻止冒泡？

譬如在网页点击一个按钮时会产生一个事件，做xxx操作时也可能会产生xxx事件(有的操作对应多个事件)，这种事件可以被js监听到

一般有两种事件模型：捕获型和冒泡型

ie中支持冒泡型，火狐中两种都支持（默认为支持事件捕获）

阻止冒泡：event.stopPropagation();(符合W3C标准)
(旧版IE用event.cancelBubble = true)-IE8及以下，但其实chrome和firefox中也支持（只是考虑到非标准，后续迟早要移除）

IE浏览器中:事件从里向外发生，事件从最精确对象(target)开始触发，然后逐步向上级，最终到最不精确的对象(document)触发，即事件冒泡
Netscape：事件从外向里发生，事件从最不精确的最新(document)开始触发，然后到最精确对象(target)触发，即事件捕获

W3C标准将两者进行中和，在任何的w3c的事件模型中，事件先进入捕获阶段，再进入冒泡阶段。
在w3c dom浏览器中，绑定事件为 addeventListener(type,fn,useCapture)。
其中useCapture:布尔值(true或false)，true代表采用事件捕获机制，false代表采用事件冒泡机制，默认为false(一般为了兼容各种浏览器也会设为false)

注意:在ie678中，不支持事件捕获，所以没有addeventListener()方法，IE提供了另一个函数attachEvent(type,fn)。没有第三个参数(移除用的detachEvent)

非IE中阻止事件传播(event.stopPropagation())
IE中阻止事件传播(event.cancelBubble=true;)

## ["1", "2", "3"].map(parseInt) 答案是多少？

```js
parseInt(val, radix);
```

radix的参数范围是[2,36]

map传了三个参数(element, index, array)

所以分别是`10机制的1-传0相当于默认值`，`进制非法，radix超出范围`，`2进制的3，不合法的解析`

结果: [1, NAN, NAN]

## indexof与findindex的区别？

indexOf是es5中的（同批次还有every、some 、forEach、filter 、indexOf、lastIndexOf、isArray、map、reduce、reduceRigh）
findIndex是es6中新增的（与find同批次）
findIndex和find都可以发现NaN，弥补了数组的IndexOf方法的不足。

例如

```js
[NaN].indexOf(NaN)  
// -1  
[NaN].findIndex(y => Object.is(NaN, y))  
// 0  
```

indexOf方法无法识别数组的NaN成员，但是findIndex方法可以借助Object.is方法做到。

另外findIndex传入的是条件函数，
（返回符合测试条件-true，的第一个数组元素索引，如果没有符合条件的则返回 -1。）
而indexOf是直接传入目标

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

## 什么是点透行为?

假设有两个层级，A和B；A在上面，B在下面。
如果A监听touch事件(zepto的tap事件)，而且B上有个链接(或者监听click事件)，
那么当touch A后，先后触发了touchStart和touchEnd事件，touchEnd后A层隐藏，
而此刻会触发在document最前面B的click事件；这就是点透行为。

这是因为在移动端浏览器，事件执行的顺序是touchstart > touchend > click。
而click事件有300ms的延迟，当touchstart事件把B元素隐藏之后，隔了300ms，
浏览器触发了click事件，但是此时B元素不见了，所以该事件被派发到了A元素身上。（除非主动组织事件传递）
如果A元素是一个链接，那此时页面就会意外地跳转。

如上述解决了300ms延迟的方案中，自然也会结局点透。。。
如`user-scalable=no`这个方案就避免了点透（因为避免了300ms延迟）

## 如何实现Tap事件？

利用touch（前提也必需设置<meta>禁止页面缩放才能避免点透）

基于touchstart、touchmove、touchend这三个事件

start记录触发的startX和startY（pageX,pagey）
mouve中记录最后的endX和endY
end中进行判断，是否合法（譬如endX-startX,endY-startY 不能大于25）
并且endTime-startTime <150(防止长按等其它事件)
如果符合要求，就触发tap事件，通过如下触发

```js
var event=new CustomEvent('tap',{
    bubbles: true,
    cancelable: true
});
    
// 触发btn上的tap事件
btn.dispatchEvent(event); 

// 同时，trigger时设置30ms的延迟
setTimeout(function(){
    trigger(target, 'tap');
}, 30);
```

如果要在pc上也兼容可以再通过mousedown、mouseup、mousemove来处理，原理一样，只是做个pc与移动判断

其中给setTimeout()设置了30毫秒的延时，实际上手机浏览器计时并不准确，延时定短了tap有可能就在click前面执行了。
虽然松开手指时touchend和click会一前一后触发，但之间的间隔并不是每次都一样，
少的时候只有几毫米，多的时候有二三十毫秒，因此tap需要延时在30毫秒之后，
保证它在click之后执行。
（因为要确保tap不影响原有的）