# 一些简洁的算法

## Hacker News投票算法

基于投票数，投稿时间计算

```js
Score = (P - 1) / (T + 2) ^ G
```

其中`a ^ b`代表`a`的`b`次方

- P表示帖子的得票数，减去1是为了忽略发帖人的投票。

- T表示距离发帖的时间（单位为小时），加上2是为了防止最新的帖子导致分母过小。
（之所以选择2，可能是因为从原始文章出现在其他网站，到转贴至Hacker News，平均需要两个小时）

- G表示"重力因子"（gravityth power），即将帖子排名往下拉的力量，默认值为1.8。
（G的值越大，随着时间下降的越快）


http://www.ruanyifeng.com/blog/2012/02/ranking_algorithm_hacker_news.html