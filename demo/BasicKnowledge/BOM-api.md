# BOM浏览器对象模型
## window
* document：对象窗口中加载的文档处理
* frames：对象窗口的多个框架布局
* history：对象处理浏览器的浏览历史
```
history.back();
history.forward();
//
history.go(-1);
history.go(2);
history.go("www.baidu.com");
```
* location：对象处理当前文档的URL
```
例子：scheme://host:port/path?query#fragment
scheme:通信协议。常用的http,ftp,maito等
host:主机。服务器域名系统 (DNS) 主机名或 IP 地址。
port:端口号。整数，可选，省略时使用方案的默认端口，如http的默认端口为80。
path:路径。由零或多个'/'符号隔开的字符串，一般用来表示主机上的一个目录或文件地址。
query:查询。可选，用于给动态网页传递参数，可有多个参数，用'&'符号隔开，每个参数的名和值用'='符号隔开。
fragment:信息片断

原文链接：https://blog.csdn.net/qq_42952262/article/details/104176410
```
* navigator：对象提供浏览器的相关信息
```
userAgent:可以判断用户浏览器的类型
platform:判断浏览器所在的系统平台类型
```
* screen：对象提供显示器的信息（窗口大小，分辨率）
```
availHeight: 736
availLeft: 0
availTop: 0
availWidth: 414
colorDepth: 24
height: 736
orientation: ScreenOrientation {angle: 0, type: "portrait-primary", onchange: null}
pixelDepth: 24
width: 414
```