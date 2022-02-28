# chrome-extension-react-cli

本地调试：

1. npm run watch
2. 将build文件夹拖入拓展程序即可，支持热更新

打包发布：npm run build

项目架构
```
my-extension
├── README.md
├── node_modules
├── package.json
├── package-lock.json
├── babel.config.json
├── .gitignore
├── config                    // Webpack配置
│   ├── paths.js
│   ├── webpack.common.js
│   └── webpack.config.js
├── public                    // 静态资源
│   ├── icons
│   │   ├── icon_16.png
│   │   ├── icon_32.png
│   │   ├── icon_48.png
│   │   ├── icon_128.png
│   ├── iframe.html           // iframe基础页面，无需修改
│   └── manifest.json         // chrome-extensions配置
└── src
    ├── background.js         // backgound入口    
    ├── iframe.js             // iframe嵌入页面样式及消息转发（因为iframe渲染需要时间）       
    ├── contentScript.js      // contentScript内嵌iframe入口
    ├── background
    └── iframe
```


Q:为什么要在页面嵌入iframe而不是用popup.html？

A:失去焦点popup.html会消失，我去查阅了官方issue发现这是官方强制的。而且oneNote官方插件也是通过iframe的方式展示，所以这应该是最佳解决方案

webpack配置在/config下

tip:暂不支持node17.0以上版本

chrome.runtime.sendMessaage用于向background发送消息

chrome.tabs.sendMessaage用于向页面发送消息

chrome.runtime.addListener用于接收所有消息

contentScript中操作DOM，但是无法调用任何js，包括window
想要操作JS，在iframe中操作
