# viewport

## css的@viewport？

可以实现 meta标签中的viewport同样的效果，但是现在的浏览器很多都不兼容
（如Safari和Firefox根本就未实现）

### 安卓上如何实现1px像素线？

先看看按照正常思路如何实现这个逻辑：

```css
border:1px solid #000
```

但是，用这个后，会发现在高分辨率的手机中，线会变胖，并不是1px

原理如下：

iPhone 3GS 和 iPhone 4 的像素分别是 320px 和 640px，但是显示屏的宽度却却都是相同的，
所以为了在所有设备上渲染出的显示效果相同，CSS 中的 1px 映射到 iPhone 4 的物理像素上，就会是 2px
同样的道理，在 iPhone 5、6 上 CSS 的 1px 对应物理像素 2px，6plus 则是 3px

上述的描述就是：逻辑分辨率和物理分辨率的区别，一般通过设置下面的meta实现（设置后视口中的像素和物理像素就又一个比例了）

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

所以当我们设置 1px 时，实际的显示效果其实是由两个甚至三个像素点所绘制的

那么如何设置真实的1px线？（注意，android中，直接0.5px并不适应-或许未来可以，但现在还是不能这样）

- 先放大，然后利用transform(scale(0.5));缩小（一般不会单独兼容3倍像素的，兼容2devicePixelRatios就可以了）
即构建1个伪元素, 将它的长宽放大到2倍, 边框宽度设置为1px, 再以transform缩放到50%.
（为什么放大200%，因为，需要缩小0.5，否则的话可能长度就不对了，比如绘制100px的1px宽线，先绘制200px的2px，然后缩小一半）
-1csspx(实际两像素),缩小0.5后就是实际一像素

- 或者通过设置对应viewport的rem基准值，这种方式就可以像以前一样轻松愉快的写1px了。
(2的时候，viewport缩放为0.5,3的时候，viewport缩放为0.33，然后这样就1px就是实际的像素了（不过和viewport为1时的像素大小是不一样的，注意）)
或者用对多背景渐变实现的也有

## viewport的理解？

`layout viewport`（布局视口）
移动设备浏览器一般都会默认设置一个viewport标签
它的作用是定义一个虚拟的`layout viewport`，用于解决早期的页面在手机显示问题

譬如默认情况下iOS,android中将这个视口分辨率设置为`980px`
所以，pc端网页基本能在手机上展示，只不过元素看起来很小（默认可以通过手指缩放）

当然也可以自己设定一个宽-一般会取`device-width`，这也是下面会提到的。

- visual viewport（视觉视口）和物理像素
visual viewport（视觉视口）为物理屏幕的可视区域
屏幕显示器的物理像素，同样尺寸的屏幕，像素密度大的设备，硬件像素会更多
例如iPhone的物理像素：

```js
    iPhone5 ：640 * 1136
    iPhone6：750 * 1334
    iPhone6 Plus：1242 * 2208
```

- ideal viewport（理想视口）和 dip （设备逻辑像素）

    - ideal viewport（理想视口）通常是我们说的屏幕分辨率。
    
    - dip （设备逻辑像素）跟设备的硬件像素无关的。一个 dip 在任意像素密度的设备屏幕上都占据相同的空间。

比如MacBook Pro的 Retina （视网膜）屏显示器硬件像素是：2880 * 1800。
当你设置屏幕分辨率为 1920 * 1200 的时候，ideal viewport（理想视口）的宽度值是1920像素，
那么 dip 的宽度值就是1920。设备像素比是1.5（2880/1920）。
设备的逻辑像素宽度和物理像素宽度（像素分辨率）的关系满足如下公式：

```js
    逻辑像素宽度*倍率 = 物理像素宽度
```

而移动端手机屏幕通常不可以设置分辨率，一般都是设备厂家默认设置的固定值
，换句话说 dip 的值就是 ideal viewport（理想视口）（也就是分辨率）的值

譬如，iPhone的屏幕分辨率：

```js
    iPhone5 ：分辨率 320 * 568，物理像素 640 * 1136，@2x
    iPhone6：分辨率 375 * 667，物理像素 750 * 1334，@2x
    iPhone6 Plus ：分辨率 414 *  736，物理像素1242 * 2208，@3x，（
    注意，实际显示图像等比降低至1080×1920，具体原因查看：http://www.css88.com/archives/5972）
```

更多设备的 ideal viewport（理想视口）可以查看http://viewportsizes.com/

- css像素

    - CSS像素（px）用于页面布局的单位。样式的像素尺寸（例如 width: 100px）是以CSS像素为单位指定的。
    
    - CSS像素与 dip 的比例即为网页的缩放比例，如果网页没有缩放，那么一个CSS像素就对应一个 dip（设备逻辑像素）    
    （譬如为device-width时，css像素与逻辑像素一样）

使用viewport元标签控制布局，通常使用如下标签

```html
<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1; user-scalable=no;">
```

`width`属性被用来控制`layout viewport`（布局视口）的宽度，layout viewport（布局视口）宽度默认值是设备厂家指定的。

iOS, Android基本`默认`都将这个视口分辨率设置为 `980px`。
我们可以 `width=320` 这样设为确切的像素数，也可以设为`device-width`这一特殊值
一般为了自适应布局，普遍的做法是将width设置为device-width

`width=device-width` 也就是将layout viewport（布局视口）的宽度设置 ideal viewport（理想视口）的宽度。
网页缩放比例为100%时，一个CSS像素就对应一个 dip（设备逻辑像素）
，而layout viewport（布局视口）的宽度，ideal viewport（理想视口）的宽度（通常说的分辨率），
dip 的宽度值是相等的。

height与width类似，但实际上却不常用。

viewport中的其它几个属性：

- initial-scale用于指定页面的初始缩放比例：
initial-scale=1 表示将layout viewport（布局视口）的宽度设置为 ideal viewport（理想视口）的宽度，
initial-scale=1.5 表示将layout viewport（布局视口）的宽度设置为 ideal viewport（理想视口）的宽度的1.5倍。

- maximum-scale用于指定用户能够放大的最大比例，例如

- minimum-scale是用来指定页面缩小比例的。通常情况下，不会定义该属性的值，页面太小将难以阅读。

- user-scalable来控制用户是否可以通过手势对页面进行缩放。该属性的默认值为yes，可被缩放，你也可以将该值设置为no，表示不允许用户缩放网页。



## meta viewport minimum-scale无效？

```html
<meta name="viewport" content="width=device-width, minimum-scale=0.5, initial-scale=1.0, maximum-scale=3.0">
```

这样声明时会发现页面只能放大不能缩小

可能与兼容性有关，譬如有一种说法是：
Android WebKit内核和IE浏览器的layout viewport永不会小于`320px`。