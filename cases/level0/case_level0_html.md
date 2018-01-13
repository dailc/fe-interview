# 难度等级0，小白须知

## html5的头部声明？

```html
<!DOCTYPE html >
```

页面如果以这个头部声明开始，浏览器就会以html5模式显示

## 如何区分 HTML 和 HTML5

1. 通过doctype声明，H5是`DOCTYPE html`

2. 通过DOM架构中的一些标签，很多都是H5中才有

## 网页验证码是干嘛的，是为了解决什么安全问题？

主要作用是：区分是计算机程序自动操作还是人为手工操作

可以防止恶意破解密码，刷票，论坛灌水等

在国内，最早应该是为了防止暴力穷举密码，最主要是防止机器人

## 知道什么是webkit么? 知道怎么用浏览器的各种工具来调试和debug代码么?

Chrome（现在是blink）,safari浏览器的内核

准确的说，chrome是基于chromium引擎，而使用webkit内核

weblit是当初苹果开源的
google在次基础上开发了chromium（现在内核变为了blink）

chrome中的devtools的调试工具