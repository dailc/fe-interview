# 更多

## 一道常被人轻视的前端JS面试题

http://www.cnblogs.com/xxcanghai/p/5189353.html

## requireJS的核心原理是什么？（如何动态加载的，如何避免多次加载，如何缓存？）

```js
核心是js的加载模块，通过正则匹配模块以及模块间的依赖关系，保证文件的先后加载顺序
根据文件路径对加载过的文件进行缓存

http://www.cnblogs.com/yexiaochai/p/3961291.html
```

## require.ensure

它的作用是代码分割，异步加载

场景：

```js
譬如首页中某个功能有用到百度地图，需要引入js库，
这时候，如果把这个库一起打包进去，就会显得太大

于是需要分开加载，在对应的条件下再引入这个库
（特定条件下加载，譬如点击后再检查是否加载）
```

## JS模块加载器的轮子怎么造，也就是如何实现一个模块加载器？

```js
http://www.jianshu.com/p/0505b1718dab
https://www.zhihu.com/question/21157540
http://annn.me/how-to-realize-cmd-loader/
```

## JQuery的源码看过吗？能不能简单概况一下它的实现原理？

```js
核心是对`DOM`操作进行的封装，以避免单独实现不同浏览器的兼容代码

譬如里面的代理就用的很巧妙。
通过代理对象，给不同的对象监听事件。进行管理

同时它的可拓展性也是它的突出优点
```

## Node.js的适用场景？

```js
总结：（老版本的）
适合IO密集型，而非计算密集型
高并发，微数据的情景（在长链接推送这块比较适合）

特别是高并发中，JS的异步天生适合与并发，随着并发数上升，相比其它server端，node.js的性能衰减的较慢

当然，性能方面，虽然有v8加持，会好于一些python语言，但由于V8有最大1G堆的限制，相比java/c++等语言，在高负载下不够给力
Node中通过JavaScript使用内存时就会发现只能使用部分内存（64位系统下约为1.4 GB，32位系统下约为0.7 GB），
其深层原因是 V8 垃圾回收机制的限制所致（如果可使用内存太大，V8在进行垃圾回收时需耗费更多的资源和时间，严重影响JS的执行效率）。
http://kb.cnblogs.com/page/573533/
```

## (如果会用node)知道route, middleware, cluster, nodemon, pm2, server-side rendering么?

```js
route
路由，譬如express中，通过不同的路由调用不同的接口功能

middleware
中间件
譬如express中就提供各种中间件
譬如给接口做跨域处理，只需要过一个cors中间件即可

cluster
Node.js从v0.6.0开始，新增cluster模块
让node.js开发服务时利用多核机器
充分利用多核的思路是：使用多个进程处理业务。cluster模块封装了创建子进程、进程间通信、服务负载均衡。
有两类进程，master进程和worker进程，master进程是主控进程，它负责启动worker进程，worker是子进程、干活的进程。

nodemon
代码自动重启
开发时，动态部署时都方便

无须手动重启，发现文件变化后会自动重启
或者意外错误崩溃后也会自动重启

pm2
是可以用于生产环境的Nodejs的进程管理工具，并且它内置一个负载均衡（使用 Node cluster 集群模块）。
它不仅可以保证服务不会中断一直在线，并且提供0秒reload功能，还有其他一系列进程管理、监控功能
让node.js集群更容易
以前用的是forever之类

server-side rendering
服务端渲染，解决SPA应用的SEO问题
能够直接把一个 SPA 应用输出成 HTML 字符串吧
而且首屏渲染速度更快（重点），无需等待js文件下载执行的过程
简单说就是nodejs这一层就将html页面组装好了，然后交给浏览器渲染。
```

## 知道各种JS框架(Angular, Backbone, Ember, React, Meteor, Knockout...)么? 能讲出他们各自的优点和缺点么?

```js
Backbone与Angular（有时算到mvvm），Ember
是mvc框架
Angular大而全
Backbone只提供核心的mvc模式

Backbone的Model把服务器端的数据模型映射到浏览器端，绑定数据验证机制，并与相应的REST操作绑定，
这样每个数据模型都变成了独立体，方便REST操作，却限制REST的灵活性。比如我要将10个todo批量标记成已完成，它会发出10个REST请求。
Backbone的Model没有与UI视图数据绑定，而是需要在View中自行操作DOM来更新或读取UI数据，这点很奇怪。

AngularJS与此相反，Model直接与UI视图绑定，Model与UI视图的关系，
通过directive封装，AngularJS内置的通用directive，就能实现大部分操作了，
也就是说，基本不必关心Model与UI视图的关系，直接操作Model就行了，UI视图自动更新。

Ember上手难度和Angular有得一拼，是有两位大佬开发的，不是大公司推行，社区可能不足


https://www.zhihu.com/question/21170137

Meteor是基于node.js的一个web开发框架，包揽了传统 web 开发的后端数据处理和前端的视图展现。主要特点是实时性。

而 angular 和 vue 、React是纯粹的前端框架，mvvm 架构，只需获得数据之后，做各种处理。

Knockout在.net界有点名气
几乎是纯粹的dom绑定，没有一个默认的组织程序的架构。

react最大的特点就是万物皆js，组件化，以及轻量
社区好，当下最热门的前端框架

React是目标是UI组件，通常可以和其它框架组合使用，目前并不适合单独做一个完整的框架
```

## 解释一下 Backbone 的 MVC 实现方式？

```js
Backbone为复杂WEB应用程序提供模型(models)、集合(collections)、视图(views)的结构。
其中models用于绑定键值数据和自定义事件；
collections附有可枚举函数的丰富API；
views可以声明事件处理函数，并通过RESRful JSON接口连接到应用程序。

Backbone将数据呈现为模型, 你可以创建模型、对模型进行验证和销毁，甚至将它保存到服务器。
当UI的变化引起模型属性改变时，模型会触发"change"事件；
所有显示模型数据的视图会接收到该事件的通知，继而视图重新渲染。
你无需查找DOM来搜索指定id的元素去手动更新HTML。 — 当模型改变了，视图便会自动变化。

里面的集合器Collection是对单独的数据模型进行统一控制
```

## 什么是“前端路由”?什么时候适合使用“前端路由”? “前端路由”有哪些优点和缺点?

```js
譬如单页面应用
a.com
但是它做了几个url
a.com/a
a.com/b
...

输入／a，其实就是触发了路由，然后跳转到相应功能

比如vue做出来的就是前端路由

相比后端路由
用户体验好，不需要每次都从服务器全部获取，快速展现给用户

https://segmentfault.com/q/1010000005336260
```

## 如何测试前端代码？知道BDD,TDD，Unit Test么？ 知道怎么测试你的前端工程么(mocha, sinon, jasmin, qUnit..)?

```js
一般是指程序开发完后开发人员的自动测试，而不是后期测试人员的测试

TDD: 测试驱动开发
简单的理解，开发功能前，先根据需求，写一个测试案例，然后开发功能，直到能正常通过
并不是只有单纯的测试，而是把需求分析，设计，质量控制量化的过程
TDD指的是在单元测试级别，也即函数级别进行测试驱动开发。

BDD:行为驱动开发
一种敏捷开发模式
主要是从用户的需求出发，强调系统的行为
它包括验收测试和客户测试驱动等的极限编程的实践，作为对测试驱动开发的回应。
使用BDD可以解决需求和开发脱节的问题

BDD，不是跟TDD一个层级的，B是说代码的行为，或许比单元测试高那么一点点吧，
主要是跟ATDD（接收测试驱动开发）、SBE（实例化需求）等实践一并提及的，
因为他们都是对应到传统测试理论里面，高于单元和模块测试，
从功能测试、集成到系统、性能等这些高级别测试的范围。
```

## 前端templating(Mustache, underscore, handlebars)是干嘛的, 怎么用?

```js
模版映射引擎

简单的说，将html模版（譬如{{name}}）
和对象({name: 'ss'})

映射，然后{{name}}就可以映射成'ss'了

底层基本都会用正则进行分析匹配

兼容mustache语法
可以循环映射
有if-else等语句
空白处理等等

处理流程：
1.获取模版-可以是jq获取
2.Handlebars.compile(tpl);编译模版
3.模版匹配json:var html = template(data);
4.添加到dom中

http://www.cnblogs.com/hustskyking/p/principle-of-javascript-template.html
```

## react-router 路由系统的实现原理？

```js
https://segmentfault.com/a/1190000004527878

react引入第三方库：
https://www.v2ex.com/t/237501
```

## gulp和webpack的区别

gulp是构建工具，webapck是模块依赖解决方案

Gulp类似于一个产品流水线，对配置文件gulpfile.js中的task配置路径下所有文件进行相关的操作。

webpack对于一切文件视为模块，根据配置文件webpack.config.js中的entry入口文件的依赖文件层层递归并静态分析，运用相对应的规则转换为静态资源。


## pwa

增强式web应用，依赖于：Service Worker（应该是属于tab页进程的）

一个 service worker 是一段运行在浏览器后台进程里的脚本，它独立于当前页面，提供了那些不需要与web页面交互的功能在网页背后悄悄执行的能力。

在将来，基于它可以实现消息推送，静默更新以及地理围栏等服务，但是目前它首先要具备的功能是拦截和处理网络请求，包括可编程的响应缓存管理。

service worker：

- 它是JavaScript Worker，所以它不能直接操作DOM

- 但是service worker可以通过postMessage与页面之间通信，把消息通知给页面，如果需要的话，让页面自己去操作DOM。

- Service worker是一个可编程的网络代理，允许开发者控制页面上处理的网络请求。

- 在不被使用的时候，它会自己终止，而当它再次被用到的时候，会被重新激活，所以你不能依赖于service worker的onfecth和onmessage的处理函数中的全局状态
（如果你想要保存一些持久化的信息，你可以在service worker里使用IndexedDB API）

- Service worker大量使用promise

## 公钥与私钥

```js
一般情况下私钥用于对数据进行签名，公钥用于对签名进行验证
HTTP网站一般在浏览器端用公钥加密敏感数据，然后在服务器端用私钥解密（譬如常见的RSA加密）
```

## 平时如何管理你的项目？（***一些规范整理）

```js
先期团队必须确定好全局样式（globe.css），编码模式(utf-8) 等；

  编写习惯必须一致（例如都是采用继承式的写法，单样式都写成一行）；

  标注样式编写人，各模块都及时标注（标注关键样式调用的地方）；

  页面进行标注（例如 页面 模块 开始和结束）；

  CSS跟HTML 分文件夹并行存放，命名都得统一（例如style.css）；

  JS 分文件夹存放 命名以该JS功能为准的英文翻译。

  图片采用整合的 images.png png8 格式文件使用 尽量整合在一起使用方便将来的管理

```

## 排序算法的稳定性

排序的稳定性，就是指在排序过程中，在对a关键字排序后会不会改变其他关键字的顺序。

譬如

```js
（38，49，49，20，97，76）
```

它的快速排序就是不稳定的。（假设小于基准值会放到左边数组）

因为如果选择`arr[1]`（第一个49）作为基准值，那么排序完后的相对序列是`arr[1], arr[2]`

但如果选择`arr[2]`（第二个49）作为基准值，那么排序完后的序列是`arr[2]，arr[1]`

因此它并不稳定。相反的，它的冒泡排序则是稳定的