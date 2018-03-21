# html代码题

## 实现不使用border画出1px高的线，在不同浏览器的标准模式和怪异模式下都能保持一致的效果

使用div（主要是考虑怪异模式下-那个模式非常的古老）

```html
<div style="height:1px;overflow:hidden;background:black"></div>
```

如果兼容性没有这么多要求的话，方式更多

譬如after可以插入伪元素（较常用），然后定义高度为1px，content为''，可以进行绝对定位，再设置背景色

## 如何在页面实现一个圆形的可点击区域？

1.border-radius 属性矩形区域变成圆形

2.圆形的svg

3.使用map+area，img标签usemap，area区域约定圆形区域

```html
<img src="xxx.png" width="1366" height="768" border="0" usemap="#Map" />  
<map name="Map" id="Map">  
<area shape="circle" coords="100,100,50" href="https://www.baidu.com" target="_blank" />  
</map>
```

map + area可以让一张图片拥有多个超链接(也可以监听实现自定义事件)

4.纯JS实现，譬如获取鼠标坐标，通过算法判断是否在目标圆形之内（不建议）
