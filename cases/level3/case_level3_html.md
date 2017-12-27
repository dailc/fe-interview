# 难度等级3，进阶高阶需掌握，不一定都是难点，也有可能是很偏僻

## noscript标签知道么？

这是为了解决早起浏览器不兼容javascript或者脚本被禁用后的问题而创造出的标签

```html
<noscript>
<p>本页面需要浏览器支持（启用）javascript</p>
</noscript>
```

示例如上
只是为了提升用户体验，现在一般用不到

## 加载远程脚本时，script标签中嵌入执行代码会怎么样？

例如

```html
<script src="xxx.jd">
alert('hello world');
</script>
```


JavaScript高级程序设计中有提到过：

带有src属性的script标签中嵌入的任何代码都会被忽略（也就是说这个标签只会去加载src，不会执行中间的代码），
所以上述的alert无效
