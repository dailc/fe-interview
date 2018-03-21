# bom

## location.assign知道么？

它的作用是打开新的URL并在浏览器的历史记录中生成一条记录。

以下效果等同：

```js
window.location = 'http://www.google.com';
location.href = 'http://www.google.com';
location.assign('http://www.google.com');
```

`location.href`底层就是调用的`location.assign`

## 如何跳转到新的页面并不产生历史记录？

使用:（可以调整所有）

```js
location.replace('http://www.google.com');
```

或者：（同源限制）

```js
// 改变历史记录，但并不会主动去访问
// 如果调整跨域地址，会报错，history api不会允许
1. history.replaceState(null, document.title, 'http://192.168.x.x/xxx/xx.html');

2. location.replace('');
```

## location.reload?

作用是重载当前显示的页面，可接受一个参数

```js
// 重新加载（有可能从缓存中加载）
location.reload();

// 重新加载（从服务器重新加载）
location.reload(true);
```
