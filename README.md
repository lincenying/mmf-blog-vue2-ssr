# mmf-blog vuejs 2.0 服务端渲染 v2版

demo: [http://www.mmxiaowu.com](http://www.mmxiaowu.com)

## 目录结构

```
├─build // webpack 相关配置文件
│
├─dist  // webpack 生成文档存放目录
│  │
│  ├─server
│  │
│  └─static
│      ├─css
│      │
│      ├─images
│      │
│      ├─img
│      │
│      └─js
│
├─server    // 服务端目录
│  │
│  ├─api    // api 相关处理文件
│  │
│  ├─config // api 配置文件
│  │
│  ├─models // mongoose 的相关 model
│  │
│  ├─routes // 路由文件
│  │
│  └─utils  // 实用工具
│
├─src           // 客户端程序目录
│  │
│  ├─api        // api 配置文件
│  │
│  ├─assets     // 静态文件文件夹
│  │  ├─css
│  │  │
│  │  └─images
│  │
│  ├─components // 组件文件夹
│  │
│  ├─filters    // 过滤器
│  │
│  ├─pages      // 路由组件
│  │
│  ├─polyfill   // ├─polyfill
│  │
│  ├─router     // 路由配置文件夹
│  │
│  ├─store      // vuex 相关文件夹
│  │  │
│  │  └─modules // vuex 模块文件夹
│  │
│  ├─template   // 初始模版
│  │
│  └─utils      // 实用工具
│
└─static
    ├─editor.md
    │
    ├─images

```

---

#### 其他版本

react版本: [https://github.com/lincenying/mmf-blog-react](https://github.com/lincenying/mmf-blog-react)

react(dva)版本: [https://github.com/lincenying/mmf-blog-dva](https://github.com/lincenying/mmf-blog-dva)

vue1版本: [https://github.com/lincenying/mmf-blog-vue](https://github.com/lincenying/mmf-blog-vue)

vue2版本: [https://github.com/lincenying/mmf-blog-vue2](https://github.com/lincenying/mmf-blog-vue2)

vue2(jsx语法)版本: [https://github.com/lincenying/mmf-blog-vue2-jsx](https://github.com/lincenying/mmf-blog-vue2-jsx)

vue2(jsx语法,leancloud)版本: [https://github.com/lincenying/mmf-blog-vue2-jsx-lc](https://github.com/lincenying/mmf-blog-vue2-jsx-lc)

vue2 服务端渲染版本: [https://github.com/lincenying/mmf-blog-vue2-ssr](https://github.com/lincenying/mmf-blog-vue2-ssr)

---

```
配置文件: src/api/config-client.js (浏览器端)
api: api地址 (如果 api 服务器和网站服务器是同一个域名, 或者用了反向代理, 可以直接用省去域名的绝对路径, 如: /api/)
配置文件: src/api/config-server.js (服务器端)
api: api地址 (如果 api 服务器 和网站服务器在同一台主机, 可以用本地地址, 如: http://localhost:8080)
port: 启动端口
```

```
// 安装依赖
npm install      or      yarn

// 生成静态文件
npm run build

// 开发模式
npm run dev

或者

npm run start
```

首页
http://localhost:8080

登录
http://localhost:8080/backend

添加管理员
http://localhost:8080/api/backend

管理员添加成功后, 会自动生成 admin.lock 文件锁定, 如果需要继续添加, 请把该文件删除
