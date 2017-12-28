# 难度等级2，进阶需掌握


## Doctype的作用？Doctype的来由？

doctype用来决定页面以什么样的方式渲染，位于文档的最前面的位置(<html>标签前)

如HTML5中的头部是`!doctype html`

如HTML4.01中DTD可以决定以什么样的格式来渲染

起的作用：

如果没有doctype声明或者格式不正确会就是混杂模式（兼容模式），混杂模式兼容老版本的浏览器显示，
否则标准模式的排版和JS运作模式都是以改浏览器支持的最高标准运行

DOCTYPE的来由：

- 在很久以前的页面都是没有DOCTYPE的（也就是现在所说的非标准页面，怪异渲染模式/混杂模式）

- 后来，在加入新的标准后，为了和以前的页面版本区分，就想到了加上DOCTYPE（最初IE加上的，那时还IE代表业内先进水准）

- 所以就有了这个约定，如果有DOCTYPE，就解析对应的标准，并按对应标准解析，否则就是怪异模式下渲染

## 常见的几种`DOCTYPE`声明

常用的几种DOCTYPE声明：

- HTML 5

```html
<!DOCTYPE html>
```

- HTML 4.01 Strict

该 DTD 包含所有 HTML 元素和属性，但不包括展示性的和弃用的元素（比如 font）。不允许框架集（Framesets）。

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
```

- HTML 4.01 Transitional

该 DTD 包含所有 HTML 元素和属性，包括展示性的和弃用的元素（比如 font）。不允许框架集（Framesets）。

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
```

- HTML 4.01 Frameset

该 DTD 等同于 HTML 4.01 Transitional，但允许框架集内容。
（frameset-框架集的使用。能够将一个窗口按要求分割，并写出对应代码）

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">
```

- XHTML 1.0 Strict

该 DTD 包含所有 HTML 元素和属性，但不包括展示性的和弃用的元素（比如 font）。不允许框架集（Framesets）。必须以格式正确的 XML 来编写标记。
（必须严格闭合）

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
```

- XHTML 1.0 Transitional

该 DTD 包含所有 HTML 元素和属性，包括展示性的和弃用的元素（比如 font）。不允许框架集（Framesets）。必须以格式正确的 XML 来编写标记。
（必须严格闭合）

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
```

- XHTML 1.0 Frameset

该 DTD 等同于 XHTML 1.0 Transitional，但允许框架集内容。
（必须严格闭合）

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
```

- XHTML 1.1

该 DTD 等同于 XHTML 1.0 Strict，但允许添加模型（例如提供对东亚语系的 ruby 支持）。
（必须严格闭合）

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
```

## 详解下script标签中defer和async的区别？

- async：异步加载脚本

用了它后的作用就是：

立即加载脚本，但是异步加载，也就是说页面的其它操作并不会暂停，并且只对外部脚本生效

一般设置async="async"（古老的XHTML更是严格要求）

一些注意的地方：

异步加载的脚本并不确保执行顺序（所以建议异步脚本不要再加载期间修改dom），
异步脚本一定会在load事件前执行，但是可能在DOMContentLoaded事件的前面或后面

- defer：延迟执行脚本

用了它后的作用就是：

立即下载，但延迟执行（同样异步加载），这个脚本会被等到文档完全解析和显示后再执行，并且只对外部脚本生效

一般设置defer="defer"（古老的XHTML更是严格要求）

一些注意的地方：

html5规范要求，延迟加载的执行顺序是和引入顺序一样的，而且脚本执行顺序先于DOMContentLoaded事件
（但是实际上不一定按这个顺序，而且也不一定在DOMContentLoaded事件执行-浏览器的实现问题）

按规范来说，defer应该是立即异步下载并延迟执行，
但是实际实现来说，譬如chrome中defer是和将script放到body底部一样的效果。
（相当于延迟下载了-浏览器优化的结果）

- 如果同时使用async和defer，一般表现和async一致（如chrome中的实际效果）

- 否则，如果普通的script，下载和执行时都会阻塞文档解析


一般的使用常见：

在webkit引擎下，建议的方式仍然是把<script>写在<body>底部，
如果需要使用百度谷歌分析或者谷歌分析等独立库时可以使用async属性，
若<script>标签必须写在<head>头部内可以使用defer属性，

兼容性：

async在IE<=9时不支持，其他浏览器OK；defer在IE<=9时支持但会有bug，其他浏览器OK

按mdn中的说明，这两个属性是h5中规范的（其中async明确是属于h5，defer在html4.01可能已经存在，但目前基本都是h5，所以都有这两个属性的）