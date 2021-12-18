# webpack的使用总结
* 入口(entry)

入口起点(entry point) 指示 webpack 应该使用哪个模块，来作为构建其内部 依赖图(dependency graph) 的开始。

默认值是 ./src/index.js，但你可以通过在 webpack configuration 中配置 entry 属性，来指定一个（或多个）不同的入口起点。例如：

```
module.exports = {
  entry: './path/to/my/entry/file.js',
};
```

* module

模块，在 Webpack里一切皆模块，一个模块对应一个文件。 Webpack 会从配置的 Entry 开始递归找出所有依赖的模块

* Chunk

代码块，一个Chunk由多个模块组合而成，用于代码合并与分割。

* 输出(output)

output 属性告诉 webpack 在哪里输出它所创建的 bundle，以及如何命名这些文件。主要输出文件的默认值是 ./dist/main.js，其他生成文件默认放置在 ./dist 文件夹中。

你可以通过在配置中指定一个 output 字段，来配置这些处理过程：

```
const path = require('path');
module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js',
  },
};
```

* loader
webpack开箱即用的能力是解析JavaScript 和 JSON 文件.loader 让 webpack 能够去处理其他类型的文件，并将它们转换为有效的模块，以供应用程序使用，以及被添加到依赖图中.

loader 有两个属性：

1、test 属性，识别出哪些文件会被转换。

2、use 属性，定义出在进行转换时，应该使用哪个 loader。

```
const path = require('path');

module.exports = {
  output: {
    filename: 'my-first-webpack.bundle.js',
  },
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  },
};
```

* 插件(plugin)

loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。

```
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件

module.exports = {
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
};
```


在上面的示例中，html-webpack-plugin 为应用程序生成一个 HTML 文件，并自动将生成的所有 bundle 注入到此文件中。

> plugin插件列表：https://webpack.docschina.org/plugins

* 模式(mode)
通过选择 development, production 或 none 之中的一个，来设置 mode 参数，你可以启用 webpack 内置在相应环境下的优化。其默认值为 production。

* 浏览器兼容性(browser compatibility)
Webpack 支持所有符合 ES5 标准 的浏览器（不支持 IE8 及以下版本）。webpack 的 import() 和 require.ensure() 需要 Promise。如果你想要支持旧版本浏览器，在使用这些表达式之前，还需要 [提前加载 polyfill](https://webpack.docschina.org/guides/shimming/)。

* 环境(environment)
Webpack 5 运行于 Node.js v10.13.0+ 的版本

* 内部原理
https://webpack.docschina.org/concepts/under-the-hood/

```
Webpack 在启动后会从Entry里配置的 Module 开始，递归解析 Entry 依赖的所有 Module。
每找到一个 Module ，就会根据配置的 Loader 去找出对应的转换规则，对 Module 进行转换后，
再解析出当前 Module 依赖的 Module.这些模块会以Entry为单位进行分组，一个Entry及其
所有依赖的 Module 被分到一个组也就是 Chunk 。最后， Webpack会将所有 Chunk 转换成
文件输出。在整个流程中，Webpack会在恰当的时机执行Plugin定义的逻辑。
```
> 参考链接：https://webpack.docschina.org/
