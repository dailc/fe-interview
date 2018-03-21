# AMD与CMD

## AMD(Modules/Asynchronous-Definition)、CMD(Common-Module-Definition)规范的区别?

- AMD:
异步模块定义，所有模块异步加载，模块加载不影响后续运行，所以依赖模块的语句必须写在回调函数中
提前执行
依赖前置
主要应用于require.js
一个当多个用

- CMD：
同步加载
延迟执行
依赖就近
as lazy as possible
主要应用于sea.js
推荐每一个模块职责单一