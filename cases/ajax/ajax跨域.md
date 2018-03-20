# ajax跨域

## 如何解决跨域问题？

这个范围很大，包括js跨域，ifram跨域，ajax跨域等

如ajax跨域一般是用jsonp(old)或者(cors)方案-需要后台进行配合配置

或者用websocket等请求来进行数据交互

另外window.postMessage也可跨域跨窗口传递消息（应该属于宏任务级别）