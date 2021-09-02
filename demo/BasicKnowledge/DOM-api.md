## Node
* appendChild：将child追加到parent的子节点的最后面
```
parent.appendChild(child);
```
* insertBefore:将某个节点插入到另外一个节点的前面
> parentNode.insertBefore(newNode, refNode);
* removeChild:删除指定的子节点并返回子节点
> var deletedChild = parent.removeChild(node);
* replaceChild:用于将一个节点替换另一个节点
> parent.replaceChild(newChild, oldChild);

* compareDocumentPosition:比较两个节点中关系
* contains 
* isEqualNode 检查两个节点是否完全相同
* isSameNode 检查两个节点是否是同一个节点
* cloneNode 克隆一个节点，node.cloneNode(true/false) ，它接收一个bool参数，用来表示是否复制子元素

____________________________________________

## 元素属性型API
* setAttribute:给元素设置属性
> element.setAttribute(name, value);
* getAttribute:返回指定的特性名相应的特性值
> var value = element.getAttribute("id");
## 样式相关API
```
elem.style.color = 'red';
elem.style.setProperty('font-size', '16px');
elem.style.removeProperty('color');
```
_____________________________________________
## DOM操作
* createElement：创建元素
* createTextNode：创建文本节点
* createCDATASection
* createComment
* createProcessingInstruction
* createDocumentFragment：创建一个 DocumentFragment ，也就是文档碎片。主要是用来存储临时节点，大量操作DOM时用可以大大提升性能
* createDocumentType

* querySelector：返回单个Node，如果匹配到多个结果，只返回第一个
* querySelectorAll：返回一个 NodeList
* getElementById：根据ID查找元素，大小写敏感，如果有多个结果，只返回第一个
* getElementsByName
* getElementsByTagName：根据标签查找元素， * 表示查询所有标签，返回一个 HTMLCollection
* getElementsByClassName：根据类名查找元素，多个类名用空格分隔，返回一个 HTMLCollection 