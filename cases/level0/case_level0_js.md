# 难度等级0，小白须知

## documen.write和 innerHTML的区别

document.write只能重绘整个页面

innerHtml可以重绘页面的一部分

加入页面已经加载完毕（HTML解析完毕），再调研documen.write的话，会将整个页面重置

## 什么是window对象? 什么是document对象?

window对象指浏览器打开的窗口，在浏览器中，window对象就是相当于ECMAScript中定义的`Global`对象-而且功能更多，还包括BOM等

document是当前窗口中Document对象的一个只读引用（属于window对象的一个属性）

## DOM操作，怎么添加、移除、移动、复制、创建和查找节点？

1.创建

```js
createDocumentFragment() // 创建一个dom片段
createElement() // 创建一个具体元素
createTextNode() // 创建一个文本节点
```

2.添加，移除，替换，插入

```js
appendChild()
removeChild()
replaceChild()
insertBefore()
```

3.查找

```js
getElementsByTagName()
getElementsByClassName()
getElementsByName()
getElementById()
document.querySelector()
```


## 同步和异步的区别？

同步->顺序执行

譬如 a -> b -> c

异步，回调执行

譬如

一轮循环  a -> c

循环结束后 b触发回调

## 检测浏览器版本版本有哪些方式？

一般通过useragent检测
譬如：navigator.userAgent

```js
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36
    (KHTML, like Gecko) Chrome/41.0.2272.101 Safari/537.36"
```

如webview容器一般会加上自己特色的头部

不过，在早期（那时候各种标准都不完善或没执行到位），
经常是利用功能检测来判断的（譬如判断某个功能变量是否存在，如果存在就是xx环境等）

