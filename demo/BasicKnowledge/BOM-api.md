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
location.href-- 返回或设置当前文档的 URL 
location.search -- 返回 URL 中的查询字符串部分。例 如 http://www.dreamdu.com/dreamdu.php?id=5&name=dreamdu 返回包括(?)后面的内 容?id=5&name=dreamdu 
location.hash -- 返回 URL#后面的内容，如果没有#，返回空 
location.host -- 返回一个URL的主机名和端口，例如 www.dreamdu.com:8080
location.hostname -- 返回URL的主机名，例如 www.dreamdu.com
location.pathname -- 返回 URL 的域名后的部分。例如 http://www.dreamdu.com/xhtml/ 返 回/xhtml/ 
location.port -- 返回 URL 中的端口部分。例如 http://www.dreamdu.com:8080/xhtml/ 返回 8080 
location.protocol -- 返回 URL 中的协议部分。例如 http://www.dreamdu.com:8080/xhtml/ 返 回(//)前面的内容 http: 
location.assign -- 设置当前文档的 URL
```

```
例子：
assign: ƒ assign()
hash: ""
host: "juejin.cn"
hostname: "juejin.cn"
href: "https://juejin.cn/user/2524134427600551/books?type=bought"
origin: "https://juejin.cn"
pathname: "/user/2524134427600551/books"
port: ""
protocol: "https:"
reload: ƒ reload()
replace: ƒ replace()
search: "?type=bought"
```

* navigator：对象提供浏览器的相关信息
```
userAgent:可以判断用户浏览器的类型
platform:判断浏览器所在的系统平台类型
cookieEnabled:是否支持启用cookie
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