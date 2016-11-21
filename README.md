# mmf-blog vuejs 2.0 服务端渲染版

demo: [http://www.mmxiaowu.com](http://www.mmxiaowu.com)

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

先安装 api server: https://github.com/lincenying/mmf-blog-api

```
配置文件: src/api/config-client.js (浏览器端)
api: api地址
配置文件: src/api/config-server.js (服务器端)
api: api地址
proxy: 反向代理地址
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
http://localhost:8080/login
