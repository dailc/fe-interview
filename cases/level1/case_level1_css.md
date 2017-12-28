# 难度等级1，最常见的一些概念，初级必须了解

## css table的一些属性？

1. border-spacing

控制各个cell之间的间距，如果有border，会特别明显

2.border-collapse

可取`collapse`或`seperate`，合并是可以折叠各个cell的border，避免加粗，
默认情况下border不会合并，中间几个cell会被加粗

3.empty-cells

取`hide`时会隐藏空的cell，避免在空的cell中填充background color，

但是，如果设置了border-collapse，不生效，这个属性会被忽略，空的cell仍然会显示background color

