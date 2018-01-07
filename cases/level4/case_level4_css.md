# 难度等级4，难点或深度知识

## 回流与重绘

页面显示过程分为以下几个阶段：
1.生成dom树(包括display:none的节点)
2.在dom树的基础上根据节点的集合属性(margin,padding,width,height等)生成render树（不包括display:none，head节点，但是包括visibility:hidden的节点）
3.在render树的基础上继续渲染颜色，背景色等样式

reflow：当render树的一部分或者全部因为大小边距等问题发送变化而需要重建的过程，叫回流
repaint：当诸如颜色背景等不会引起页面布局变化，而只需要重新渲染的过程叫做重绘

改变结构都将导致回流，重绘代价要远远小于回流。

什么会引起回流
1.页面渲染初始化
2.DOM结构改变，比如删除了某个节点
3.render树变化，比如减少了padding
4.窗口resize
5.最复杂的一种：获取某些属性，引发回流
    很多浏览器会对回流做优化，会等到数量足够时做一次批处理回流
    但是除了render树的直接变化，当获取一些属性时，浏览器为了获得正确的值也会触发回流，这样使得浏览器优化无效，包括
    （1）offset(Top/Left/Width/Height)
     (2) scroll(Top/Left/Width/Height)
     (3) cilent(Top/Left/Width/Height)
     (4) width,height
     (5) 调用了getComputedStyle()或者IE的currentStyle
     
回流一定伴随着重绘，重绘却可以单独出现

减少回流
减少逐项更改样式，最好一次性更改style，或者将样式定义为class并一次性更新
避免循环操作dom，创建一个documentFragment或div，在它上面应用所有DOM操作，最后再把它添加到window.document。
避免多次读取offset等属性。无法避免则将它们缓存到变量
将复杂的元素绝对定位或固定定位，使得它脱离文档流，否则回流代价会很高

注意：改变字体大小会引发回流

示例

```js
var s = document.body.style;
s.padding = "2px"; // 回流+重绘
s.border = "1px solid red"; // 再一次 回流+重绘
s.color = "blue"; // 再一次重绘
s.backgroundColor = "#ccc"; // 再一次 重绘
s.fontSize = "14px"; // 再一次 回流+重绘
// 添加node，再一次 回流+重绘
document.body.appendChild(document.createTextNode('abc!'));
```

### css加载是否会阻塞dom树渲染

css加载不会阻塞DOM树解析（异步加载），但会阻塞DOM树渲染（渲染时需等css）

这可能也是浏览器的一种优化机制。
因为你加载css的时候，可能会修改下面DOM节点的样式，
如果css加载不阻塞DOM树渲染的话，那么当css加载完之后，
DOM树可能又得重新重绘或者回流了，这就造成了一些没有必要的损耗。
所以干脆就先把DOM树的结构先解析完，把可以做的工作做完，然后等你css加载完之后，
在根据最终的样式来渲染DOM树，这种做法性能方面确实会比较好一点。

css加载也会阻塞后面的js语句的执行
因此，为了避免让用户看到长时间的白屏时间，我们应该尽可能的提高css加载速度