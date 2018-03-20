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

## null，undefined 的区别？

- null表示一个“为空”的值，typeof null 为 object

- undefined表示一个变量声明了但是没有初始化（缺省值），typeof undefined 为 undefined

- 原型链的尽头是null

```js
null == undefined;  // true
null === undefined; // false
```

- null转数字时为0
- undefined转数字时为NAN

JS最初只有一个null表示无，根据c语言传统，可以自动转为0，但是js设计者觉得这样还不够（小道传闻）

- null在java中被当初一个对象，但是js中分为原始型和合成类型，作者觉得无的值最好不是对象

- 最初js中没有错误处理机制，发生数据类型不匹配时，往往会自动转换类型或失败，但是如果null自动转成0时，不容易找出这个错误

因此又设计了一个undefined

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
    // subClass的构造中，需要
    superClass.apply(this, arguments);
    
    ...
    
    function inherit(subClass, superClass) {  
        function F() {}
        F.prototype = superClass.prototype;
        // 将实例作为子类的原型
        // 为什么不直接 new superClass()，因为new superClass消耗的内存更多，而一个空对象消耗的较少
        subClass.prototype = new F();
        subClass.prototype.constructor = subClass;
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

注意：浏览器的优化，如果队列中已经有setInterval事件了（未执行的），不会再重复添加了


__推荐使用requestAnimationFrame替代setTimeout__

- requestAnimationFrame会把每一帧中的所有DOM操作集中起来，
在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率，
一般来说，这个频率为每秒60帧。

- 在隐藏或不可见的元素中，requestAnimationFrame将不会进行重绘或回流，这当然就意味着更少的的cpu，gpu和内存使用量


所以最佳实践应该是requestAnimationFrame，其次才是setTimeout模拟，避免直接使用setInterval

## 对象到字符串的转换步骤

1.如果对象有toString()方法，javascript调用它。如果返回一个原始值（primitive value如：string number boolean）,将这个值转换为字符串作为结果
如果tostring返回{}，算有效

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

## 连等号赋值顺序

注意，**不推荐使用连等赋值**

```js
var a = {n: 1}
var b = a;
a.x = a = {n: 2}
console.log(a); // {n: 2}
console.log(a.x); // undefined
console.log(b); // {n: 1, x: {n: 2}}
console.log(b.x) // {n: 2}
```

因为连等号这个语句中会**先确定所有遍历的指针**，然后才会去对于赋值

其中

```js
a.x = a = {n: 2} 
```

- 指针确定如下
a.x的指针已经确定了，指向了原始a的（因为原始a没有x，因此创建了一个指向null的指针）
a指向也是原始a

- 赋值如下
a重新指向到了新的地址 {n: 2}（栈中的指针指向了堆中新的对象）
原始a.x的指向到了 {n: 2}

- 因此最后
a指向到了新的{n: 2}
a.x为undefined

b指向原始a
b.x = {n: 2}

简单的理解，因为js中是值传递模式，所以在连等开始赋值之前，以及分别有`a.x`和`a`这两个指针的值的。
最初时，`a`和`a.x`分别指向堆内存中的`{n: 1, x: null}`以及里面的`x`。
然后赋值阶段，`a`重新换了一个指向，指向了`{n: 2}`，而`a.x`仍然是原始的a（也就是和另一个备份的`b`指向一样）

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

同时，第二个参数可以传入一个对象（会自动调用对象的handleEvent方法）

```js
document.body.addEventListener('click',
    {
        handleEvent: function() {
            alert('body clicked');
        }
    }, false);
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

## 移动端的点击事件的有延迟(click的300毫秒延迟)，时间是多久，为什么会有？ 怎么解决这个延时？

click 有 300ms 延迟,为了实现safari的双击事件的设计，浏览器要知道你是不是要双击操作。

一般采用touch方式模拟点击可以去除延迟
或者直接采用fastclick等第三方库

移动端浏览器的默认显示宽度是980px(不同机型各异，但相差不大)，而不是屏幕的宽度(320px或其他)。
为了对早期普通网页更好的体验，iphone设计了双击放大显示的功能--这就是300ms延迟的来源：
如果用户一次点击后300ms内没有其他操作，则认为是个单击行为；否则为双击放大行为。

解决：

1.user-scalable=no。 
不能缩放就不会有双击缩放操作，因此click事件也就没了300ms延迟，这个是Chrome首先在Android中提出的。
2.设置显示宽度：width=device-width。
Chrome 开发团队不久前宣布，在 Chrome 32 这一版中，
他们将在包含 width=device-width 或者置为比 viewport 值更小的页面上禁用双击缩放。
当然，没有双击缩放就没有 300 毫秒点击延迟。
3.直接采用fastclick等第三方库
简而言之，FastClick 在检测到 touchend事件的时候，
会通过 DOM 自定义事件立即触发一个模拟click事件，并把浏览器在 300 毫秒之后真正触发的 click事件阻止掉。


事件执行顺序：
touchstart->-touchmove（如果有的话）>touchend
->mousedown->mousemove（如果有的话）->mouseup
->click->dblckick（如果有的话，IOS上不支持dblclick事件，Android支持dblclick事件）

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

## String()与toString()的区别

String()转换规则：

1.如果值有toString()，调用值的toString-不带参

2.如果值是null，返回'null'

3.如果值是undefined，返回'undefined'

除了null与undefined外的值都有toString()

而且toString(基数)可以接收一个基数，譬如传8代表8进制输出

但是注意：

```js
console.log(('11').toString()); // 合法输出11
console.log((true).toString()); // 合法输出true
console.log((22).toString()); // 合法输出22

console.log('11'.toString()); // 合法输出11
console.log(true.toString()); // 合法输出true
console.log(22.toString()); // 报错Uncaught SyntaxError: Invalid or unexpected token
console.log(null.toString()); // 报错Cannot read property 'toString' of null
console.log(undefined.toString()); // 报错Cannot read property 'toString' of undefined
```

## js的浮点误差？

```js
var a=10.2;
var b= 10.1;

console.log(a - b === 0.1); // false
console.log(a - 10.1 === 0.1); // false,实际是0.09999999999999964
console.log(a - 0.1 === 10.1); // true
```

一般比较方法是判断两个浮点数的误差不大于某个极小数即可，如
`a - b < 1e-7`

或者.toFixed(10)
在判断浮点运算结果前对计算结果进行精度缩小，因为在精度缩小的过程总会自动四舍五入: 
这样

```js
parseFloat((1.0-0.9).toFixed(10)) === 0.1 // true
parseFloat((1.0-0.8).toFixed(10)) === 0.2 // true

(a - 10.1).toFixed(10) // 0.1000000000（自动四舍五入了）
```

不光是js，只要采用IEEE754浮点数标准(由电气电子工程师学会定义的浮点数在内存中的算法规范。)的语言都存在这个问题。
（由美国电气电子工程师学会（IEEE）计算机学会旗下的微处理器标准委员会（Microprocessor Standards Committee, MSC）发布）
IEEE754浮点数主要有单精度（32位）和双精度（64位），js采用双精度。
有些浮点数比如0.1转化为二进制是无穷的，而64位的浮点数表示法尾数位只允许52位，
超出的部分进一舍零，会造成浮点数精度丢失，两个浮点数转化二进制相加后的结果，也遵循这个原则。

譬如：
    十进制           二进制
    0.1              0.0001 1001 1001 1001 ...
    0.2              0.0011 0011 0011 0011 ...
    0.3              0.0100 1100 1100 1100 ...
    0.4              0.0110 0110 0110 0110 ...
    0.5              0.1
    0.6              0.1001 1001 1001 1001 ...
    
所以比如 1.1，其程序实际上无法真正的表示 ‘1.1'，而只能做到一定程度上的准确，这是无法避免的精度丢失：`1.09999999999999999`

## getComputedStyle

DOM2级样式中增强了`document.defaultView`，提供了getComputedStyle方法。

接收两个参数：要取得计算样式的元素，和一个伪元素字符串（如:after，可以为null）

返回一个CSSStyleDeclaration对象（与Style属性的类型相同）

譬如

```js
var computedStyle = document.defaultView.getComputedStyle(myDiv, null);

computedStyle.width; // 100px
computedStyle.color; // red
...
```

作用是用来动态计算，因为默认的style对象获取的信息不包括那些从其它样式表层叠而来并影响到当前元素的样式信息。

老版本IE不支持这个方法，它可以通过`myDiv.currentStyle`来达到类似效果

另外，计算样式是只读的。无法通过修改带来影响

另外，不同浏览器的表现可能会有差异，需要多测试，譬如有的浏览器`visibility`为`visible`，有的为`inherit`，因为任何具有默认值的css属性都会表现在计算后的样式中。

## 考察promise与settimeout的时机，以下代码的执行顺序？

```js
setTimeout(function() {
  console.log(1)
}, 0);
new Promise(function executor(resolve) {
  console.log(2);
  for( var i=0 ; i<10000 ; i++ ) {
    i == 9999 && resolve();
  }
  console.log(3);
}).then(function() {
  console.log(4);
});
console.log(5);
```

- 答案是： `23541`

理由：

`new Promise(executor);`

中是立即执行函数，会立即执行，所以最先是:`2,3`
注意，这里执行resolve时，需要等到下一轮A类循环（先于settimeout）才会去执行then

所以接下来先是 5，然后是4，最后才是1

主要观察的是执行顺序

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

## javascript中的`"user strict";`是什么意思？使用它区别是什么？

`use strict`是ECMAscript 5中的严格运行模式

如严格模式是ECMAScript 5 中的一种模式，ECMAScript 5中有两种模式，一种是正常模式，一种是“严格模式(strict mode)”，
使用这种模式使得Javascript在更严格的条件下运行。

设立“严格模式”的目的主要有:

1.  消除JS语法的不合理，不严谨之处，减少一些怪异行为
譬如不能用with,不能给未声明的全局变量赋值，不能callee，不允许直接操作argument等

2.  消除代码运行的不安全之处，保证代码运行的安全

3.  提高编译器效率，增加运行速度

4.  为新版本做铺垫，如ES6中全面使用了严格模式

注意，在正常模式下可以运行的代码很有可能严格模式下运行出错。而且ES6中只允许严格模式的用法。

严格模式有两种用法:

1. 在脚本文件(或`<script>`脚本片段)的第一行，使用`'use strict';` 可以将整个脚本文件(片段)以严格模式运行
(注意，如果前面是一些不产生实际运行结果的语句，可以不再第一行-如在开头注释后面,
注意,前面有;号也会取消严格模式；但是如果前面的语句有效-如输出语句，这样则严格模式无效，整个片段会以正常模式运行)

2. 在函数体的第一行使用`'use strict';`则整个函数以严格模式运行
(这种是最常用的写法，通常会将这句话放在一个立即执行的匿名函数中)

使用严格模式后，JS语法和行为与正常模式有所区别:

1. 全局变量显示声明(正常模式下，如果一个变量没有声明就赋值，默认是全局变量，而在严格模式下，会报错)

2. 静止使用with语句(with语句主要用于设置代码在特定对象中的作用域，严格模式下禁用with语句)

3. 创设eval作用域，ES5中，正常模式下，JS语言中有两种变量作用域:全局作用域和函数作用域。
严格模式创设了第三种作用域:eval作用域(这样,eval里面不能再生成全局变量了-正常模式中eval会生影响外部作用域)。

4. 禁止this关键字指向全局对象。在正常情况下,一个普通函数内部的this会指向一个全局对象window,但是严格模式下禁止了这种用法，
严格模式下,普通函数内部的this为undefind，注意：通过new 出来的对象除外，new 出来的会指向自身

5.禁止在函数内部遍历调用栈。正常情况下函数内部可以通过caller等方法调用自身,但是严格模式下禁止了这种用法

6. 禁止删除变量（严格模式下无法删除var显示声明的变量，只能删除属性）
注意,` [object Object]`的属性只有configurable设置为true才能被删除（不过默认隐式创建的一般都是为true），否则无法删除

7. 显式报错。
正常模式下，对于一个对象的只读属性进行赋值，不会报错，只会默默失败，严格模式下，会报错
严格模式下，对于一个使用getter方法读取的属性进行赋值，会报错
严格模式下，对禁止拓展的对象添加新属性（Object.preventExtensions(o)），会报错
严格模式下，删除一个不可删除的属性，或报错（如删除Object.prototype）
严格模式下，删除一个不可删除的属性，或报错
对象不能有重名的属性(正常模式下，如果对象有多个重名属性，最后赋值的那个属性会覆盖前面的值，严格模式下，这属于语法错误)
函数不能有重名参数(正常模式下，如果函数有多个重名参数，可以用argument[i]读取。严格模式下，属于语法错误)

8. 禁止八进制表示法
严格模式下，整数的第一位如果是0，表示这是八进制，比如0100等于十进制的64。但是严格模式下禁止这种写法，证书第一位为0，会报错

9. Arguments对象的限制。
不允许对arguments赋值
Arguments不再追踪参数的变化（如果形参a被改变，对应的arguments是不会改变的）
禁止使用arguments.callee。严格模式下，无法使用caller,也就是说匿名函数内部无法调用自身了

10. 函数必须声明在顶层
严格模式下只允许在全局作用域和函数作用域的顶层声明函数。
不允许在非函数的代码块内声明函数(ES6中会加入块级作用域概念)

11. 保留字。严格模式下，新增了一些保留字:
implements, interface, let, package, private, protected, public, static, yield
使用这些词作为变量或参数将会报错
另外,ES5本身也有些保留字:
class, enum, export, extends, import, super
以及各大浏览器自行增加的 const保留字。这些保留字都不能作为变量名或参数

## new操作符具体干了什么呢？

1.创建一个空对象，并且this变量引用该对象，同时继承该对象的原型

2.属性和方法被加入到this引用的对象中

2.新创建的对象由this引用，并且最后隐式返回this

```js
var obj = {};

obj.__proto__ = Base.prototype;
Base.call(obj);
```

### Object.create()的作用？

`Object.create(proto[,propertiesObject])`是ES5中提出的一种新对象创建方式

- 第一个参数是：要继承的原型，可以传null

- 第二个参数是：对象的属性描述符，可选
可选属性包括：
数据属性-
    包含value(值),writable(是否可任意写),
    enumerable(是否能用for in枚举),
    configurable(是否能被删除,修改)特性(后面三个默认为false)
访问器属性-包含set/get特性


注意:当满足以下任一条件时，则会引发TypeError异常:

1. prototype参数不是对象而且不是null

2. descriptors参数中的描述符具有value或writable特性，并且具有get或set特性(value或writable与get或set不能同时存在)

3. descriptors参数中的描述符具有不为函数的get或set特性(get或set必须是函数)

```js
// 此时b.__proto__=== a.prototype
// 创建了一个新的对象，只不过[[prototype]]指向了传入的a.prototype
var b = Object.create(a.prototype);
```

关键点:可以创建一个继承某对象的对象

## new、new Object()和Object.create(proto,[propertiseObject]之间者的异同?

相同点:

- new和Object.create()都可以用来创建一个新的对象。new Object()当参数为空时也是创建一个新的对象

不同点:

- 本质不同,new 一般配合类的构造函数使用，new的时候，是先创建一个对象，然后将对象的__proto__属性指向该类的prototype。
(obj.__proto__ = Base.prototype)

- Object.create(proto…)一般第一个参数直接传入一个对象，然后创建出来新对象就直接显示指向该对象了。
(obj.__proto__ = Base)

- new Object()当传入参数为一个object时不会创建新对象，而是直接引用传递，
(obj === Base)
当参数不存在时，才创建一个新的{}(此时obj为{})

关键点:创建对象时 _proto_和prototype有区别
javascript使用__proto__指向对象的原型。
另外，需要知道__proto__([[prototype]])是隐式原型链追溯的关键

## JS中有一个函数，执行时对象查找时，永远不会去查找原型，这个函数是？

- `hasOwnProperty`

js中hasOwnProperty函数是返回一个布尔值，
指出一个对象是否具有指定名称的属性
此方法无法检查该对象的原型链中是否具有该属性
该属性必须是该对象本身的成员，不能是原型链上的

使用：

```js
Object.hasOwnProperty.call(object, proName);
```

object必须是对象，proName必须是属性名称的字符串形式

有则返回true,否则false


## JavaScript中的作用域与变量声明提升?

ES6之前没有块级作用域，var等声明会提前

例如

```js
console.log(a); // undefined
console.log(b); // ReferenceError
var a = 1;
let b = 2;
```

等同于：

```js
var a;
console.log(a); // undefined
console.log(b); // ReferenceError
a = 1;
let b = 2; 
```

另外

```js
function xxx() {}
```

函数声明也会提升，顺序是：

- 先函数声明

- 如果没有声明，则进行变量声明，如果有，变量声明无效

- 变量赋值

```js
var myName;
function myName () {...};
console.log(typeof myName); // function

var myName = 'hello';
function myName () {...};
console.log(typeof myName); // String
```

## onclick和addEventListener('click')的区别？

onclick属于DOM0级的事件处理，
譬如如果使用HTML指定事件处理程序，那么onclick属性就是一个包含着同名HTML特性中指定的代码的函数，
（每一个元素都有自己的事件处理程序属性-包括window和document）

addEventListener是DOM2级的事件处理，事件流中的监听（冒泡或捕获），而且可以阻止继续冒泡或捕获的传递

## 事件中的currentTarget与target

currentTarget指向绑定事件的对象

target指向触发事件的对象

譬如绑定到document.body中

currentTarget一直都是document.body，而target可以是里面任意一个触发事件的元素（譬如只不过是最后冒泡出来而已）

另外，一旦事件执行完毕，event就被销毁了

## 事件中的stopImmediatePropagation与stopPropagation

stopImmediatePropagation方法作用在当前节点以及事件链上的所有后续节点上，
目的是在执行完当前事件处理程序之后，停止当前节点以及所有后续节点的事件处理程序的运行

stopPropagation方法作用在后续节点上，
目的在执行完绑定到当前元素上的所有事件处理程序之后，停止执行所有后续节点的事件处理程序

## 什么是闭包(closure)，为什么要用它？

**闭包是指有权访问另一个函数作用域中的变量的函数**（JavaScript高程也这样定义）

创建闭包的最常用方式：在一个函数内创建另一个函数，通过另一个函数访问这个函数的局部变量
利用闭包可以突破作用域链，将函数内部的变量和方法传递到外部
不过也经常会容易造成内存泄漏问题（无法自动回收）

特性：

1.函数内再嵌套函数
2.内部函数引用外层的参数和变量
3.参数和变量不会被垃圾回收机制回收

譬如

```js
function sayHello() {
    // 函数内部变量
    var word = 'hello,world!';
    var index = 0;
    
    return function() {
        console.log(word + (index++));  
    };
}

var say = sayHello();

say(); // hello,world!0
say(); // hello,world!1
```

上面的通俗点将，那个被return的匿名函数就是一个闭包（因为它有访问另一个函数作用域（sayHello函数）中的变量的能力）。
而且可以看到，如果匿名函数没有引用外部函数作用域的变量，正常情况下外部函数执行完后相关内存就销毁了，但是由于它引用了，
并且被外界持有了引用`say`，所以形成了闭包，无法回收内存。

## 前端性能优化的方法？

- （1） 减少http请求次数：CSS Sprites, JS、CSS源码压缩、图片大小控制合适；网页Gzip，CDN托管，data缓存 ，图片服务器。

- （2） 前端模板 JS+数据，减少由于HTML标签导致的带宽浪费，前端用变量保存AJAX请求结果，每次操作本地变量，不用请求，减少请求次数

- （3） 用innerHTML代替DOM操作（innerHTML浏览器有优化），减少DOM操作次数，优化javascript性能。

- （4） 当需要设置的样式很多时设置className而不是直接操作style。

- （5） 少用全局变量、缓存DOM节点查找的结果。减少IO读取操作。

- （6） 避免使用CSS Expression（css表达式)又称Dynamic properties(动态属性)。

- （7） 图片预加载，将样式表放在顶部，将脚本放在底部  加上时间戳。

- （8） 避免在页面的主体布局中使用table，table要等其中的内容完全下载之后才会显示出来，显示比div+css布局慢。


对普通的网站有一个统一的思路，就是尽量向前端优化、减少数据库操作、减少磁盘IO。

    向前端优化指的是，在不影响功能和体验的情况下，能在浏览器执行的不要在服务端执行，
    能在缓存服务器上直接返回的不要到应用服务器，程序能直接取得的结果不要到外部取得，
    本机内能取得的数据不要到远程取，内存能取到的不要到磁盘取，缓存中有的不要去数据库查询。
    减少数据库操作指减少更新次数、缓存结果减少查询次数、将数据库执行的操作尽可能的让你的程序完成
    （例如join查询），减少磁盘IO指尽量不使用文件系统作为缓存、减少读写文件次数等。
    程序优化永远要优化慢的部分，换语言是无法“优化”的。
    
    






## JSON.stringify

接收三个参数：（后两个可以不传）

- 第1个参数是需要转化的对象

- 第2个参数可以是数组或者函数-过滤器

- 第3个参数表示是否在json字符串中保留缩紧

    - 如果是数字，则代表每一层级的缩进空格数
    
    - 如果是字符串，则会用这个字符串替代原有的空格缩进
    （每一层级，原有的多个空格缩进不再用，用这个字符串替代）

```js
JSON.stringify(json, ["title", "name"], 4);

JSON.stringify(json, function(key, value) {
    if (key === 'title') {
        return key + '-hello';
    }
    
    return value;
}, 4);
```

## JSON.parse

除了第一个是字符串，同样接收第2个参数

该参数是一个函数（还原函数），同样用来过滤（接收key-value）



## 隐式转换

隐式转换是按ECMAScript规范定义来进行的，但是规则很多，不好记，最好从实践出发，
如果下述示例都知道，应该掌握的差不多了（参考了github文章，在refer的参考来源）

```js
// []的tostring会调用元素的tostring然后拼接，空元素默认为空字符串
[].toString(); // 空字符串

// 转为字符串然后拼接
[1, 2].toString(); // 1,2

// 子元素转为字符串然后拼接
[{}, {}].toString(); // [object Object],[object Object]

// 默认返回它本身
[].valueOf(); // []

// valueof如果不是原始值就会去找tostring，然后转为数字，所以是0
+[]; // 0

// valueof不为原始值，转为字符串为1，然后转数字
+[1]; // 1

// valueof不为原始值，转为字符串为1,2，然后转数字NaN
+[1, 2]; // NaN

// 默认返回它本身
{}.valueOf(); // {}

// 分别是原始值转字符串让拼接
{}+{}; // [object Object][object Object]

// 隐式转换时[]转成了字符串
{}+[]; // [object Object]

// 隐式转换时[]转成了字符串
[]+{}; // [object Object]

// 隐式转换时{}转成了字符串
{}+1; // [object Object]1

// 隐式转换时{}转成了字符串
({}+1); // [object Object]1

// 隐式转换时{}转成了字符串
1+{}; // 1[object Object]

// 隐式转换时[]valueof不为原始值，所以转成了字符串，然后再转数字，为0
[]+1; // 1

// 隐式转换时[]valueof不为原始值，所以转成了字符串，然后再转数字，为0
1+[]; // 1

// 隐式转换时[]valueof不为原始值，所以转成了字符串，然后再转数字，为0
1-[]; // 1

// {}会调用valueof，valueof不为原始值后再调用tostring，然后由于无法转换成数字（[object Object]），所以NAN
+{}; // NAN

//先接以上（因为-号会先尽量转为数字），NAN，然后NAN和任何数都是NAN
1-{}; // NaN

// !{}为false，然后转为数字计算
1-!{}; // 1

// !{}为false，然后转为数字计算
1+!{}; // 1

// 字符串拼接
1+"2"+"2"; // 122

// +"2"的优先级高，然后数字的1+2为3，然后再字符串拼接
1+ +"2"+"2"; // 32

1++"2"+"2"; // 会报错：Invalid left-hand side expression in postfix operation

// 先计算![]为false，然后[]和false比，隐式转换成数字比较，因此相等（都是0）
[]==![]; // true

// 因为类型不匹配，所以直接就是false
[]===![]; // false

const obj = [];

obj.valueOf = function() {
    return 22;
};

obj.toString = function() {
    return '11';
};

// 转为数字时，会优先valueOf，所以是22
console.log(+obj); // 22
```

## promise的顺序

```js
new Promise(resolve => {
    console.log(1);
    resolve(3);
    Promise.resolve().then(()=> console.log(4))
}).then(num => {
    console.log(num)
});
console.log(2)
```

顺序是：

```js
1
2
4
3
```

解析：

```js
总体顺序：
宏任务->微任务->浏览器->下一轮宏任务

同步输出1（promise的函数默认执行）
mictask队列延后添加（在函数执行完毕后，resolve(3)-会在下一次then时生成一个新的promise，进入链式调用）
Promise.resolve().then，mictask直接添加这个任务（顺序比下一次then时早）
同步输出2

执行mictask，
里面依次是Promise.resolve().then，resolve对应的then
```

关键：

- Promise.resolve生成一个解析特定值后的promise对象

- 顺序为，先将Promise.resolve().then加入mictask，然后函数执行完毕后，then时才会将resolve转换为promise，加入mictask

## addEventlistener的传入参数

```js
dom.addEventlistener('click', func, options, useCapture, wantsUntrusted);

options包括：
capture:  Boolean（表示 listener 会在该类型的事件捕获阶段传播到该 EventTarget 时触发）
once:  Boolean（表示 listener 在添加之后最多只调用一次）
passive: Boolean（表示 listener 永远不会调用 preventDefault()）

useCapture：
是否使用捕获事件，true为捕获，false为冒泡，默认冒泡

wantsUntrusted：
如果为 true , 则事件处理程序会接收网页自定义的事件（此参数只适用于 Gecko）
```

## 是否所有的dom事件都会冒泡

并不是，譬如focus之类的就不会

判断：每个 event 都有一个event.bubbles属性，可以知道它可否冒泡（W3C定义）

