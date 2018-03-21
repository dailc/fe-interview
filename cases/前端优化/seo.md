# seo

## 前端需要注意那些seo?

```html
<meta content="xxxx" name="keywords">
<meta content="xxx" name="description">
```

1.合理的title,description,keywords
引擎搜索对三项的权重逐渐减小，
title强调重点即可(重点关键词出现不要超过2次，而且要靠前)，不同页面title要不同
description把页面内容高度概括，长度合适，不可过分堆砌关键词，不同页面的description要有所区分
keywords列举出重点关键词

2.语义化html，符合w3c规范，语义化让搜索引擎容易理解网页

3.重要的html内容放在最前方，搜索引擎抓取html顺序是从上到下，
有得搜索引擎长度有限制，因此要确保重要内容被抓取

4.重要内容不要用js输出（爬虫不会执行js获取内容）

5.避免iframe,爬虫不会抓取iframe中的内容

6.非装饰性图片必须加alt(图片无法显示时替代，图片内容的等价描述，读屏器会阅读图片，搜索引擎重点分析)

7.提高网站访问速度，网站速度是搜索引擎排序的一个重要指标
