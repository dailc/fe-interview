# promise与运行机制

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