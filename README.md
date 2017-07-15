# mmf-blog vuejs 2.0 SSR v2         [中文说明](https://github.com/lincenying/mmf-blog-vue2-ssr/blob/master/README_CN.md)

demo: [http://www.mmxiaowu.com](http://www.mmxiaowu.com)

## notice

A blog built with Vue 2.0, vue-router & vuex, with server-side rendering

The main technical stack: express, mongoose, vue2, vue2-router, vuex, webpack, babel, eslint

## The directory structure

```
├─build // Webpack related configuration file
│
├─dist  // Webpack generated document storage directory
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
├─server    // The server directory
│  │
│  ├─api    // API related processing files
│  │
│  ├─config // API configuration file
│  │
│  ├─models // mongoose model
│  │
│  ├─routes // The routing file
│  │
│  └─utils  // tools
│
├─src           // The client program directory
│  │
│  ├─api        // API configuration file
│  │
│  ├─assets     // Static file folder
│  │  ├─css
│  │  │
│  │  └─images
│  │
│  ├─components // Component folder
│  │
│  ├─filters    // The filter
│  │
│  ├─pages      // Routing component
│  │
│  ├─polyfill   // polyfill
│  │
│  ├─router     // The routing configuration folder
│  │
│  ├─store      // Vuex related folder
│  │  │
│  │  └─modules // Vuex modules folder
│  │
│  ├─template   // The initial template
│  │
│  └─utils      // tools
│
└─static
    ├─editor.md
    │
    ├─images

```

---

#### Other versions

react(spa): [https://github.com/lincenying/mmf-blog-react-v2](https://github.com/lincenying/mmf-blog-react-v2)

vue2(spa): [https://github.com/lincenying/mmf-blog-vue2](https://github.com/lincenying/mmf-blog-vue2)

vue2(ssr): [https://github.com/lincenying/mmf-blog-vue2-ssr](https://github.com/lincenying/mmf-blog-vue2-ssr)

vue2(pwa ssr): [https://github.com/lincenying/mmf-blog-vue2-pwa-ssr](https://github.com/lincenying/mmf-blog-vue2-pwa-ssr)

---

```
The configuration file: src/api/config-client.js (The browser)
api: Address of the API (For example: /api/)
The configuration file: src/api/config-server.js (The server side)
api: Address of the API (For example: http://localhost:8080)
port: Start the port
```

## Start:
install NodeJS:
https://nodejs.org/zh-cn/

install Mongodb:
https://www.mongodb.com/download-center#community

```shell
# Install dependencies
$ yarn  #or  npm install
# Note: do not install with CNPM dependency

# Develop
$ npm run dev

# Product
$ npm run build

# Start (need to generate a static file)
$ npm run start
```

Home Site
http://localhost:8080

Login
http://localhost:8080/backend

Add Administrator
http://localhost:8080/api/backend

After the success of the administrator to add, will automatically generate the `admin.lock` file locking, if you need to continue to add, please just delete the file

# notice:
Because ` babelrc ` configuration

```javascript
"presets": [
    ["env", {
        "targets": {
            "chrome": 52
        }
    }]
]
```
So, in the development environment, please use chrome52 + open, if you need other low browser version, please modify the root directory of the `.Babelrc ` file

# LICENSE

MIT
