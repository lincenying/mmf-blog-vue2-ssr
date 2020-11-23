@[toc]

# 1. 首先你得有台服务器

# 2. 推荐安装 linux 系统

本文以 CentOS 7.2 为例

# 3. 更换 yum 为国内镜像

1. 备份你的原镜像文件，以免出错后可以恢复。
```bash
# mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
```
2. 下载新的CentOS-Base.repo 到/etc/yum.repos.d/
```bash
// CentOS 5
# wget -O /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-5.repo
// CentOS 6
# wget -O /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-6.repo
// CentOS 7
# wget -O /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo
// CentOS 8
# wget -O /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-8.repo
```
3. 生成缓存
```bash
# yum makecache
```

# 4. 安装 Nodejs

### 方法1: 用 yum 安装
```bash
// nodejs 8.x
# curl --silent --location https://rpm.nodesource.com/setup_8.x | bash -
// ...
// nodejs 12.x
# curl --silent --location https://rpm.nodesource.com/setup_12.x | bash -
// ...
// nodejs 15.x
# curl --silent --location https://rpm.nodesource.com/setup_15.x | bash -
```
具体所有版本见:
https://github.com/nodesource/distributions/tree/master/rpm
根据自己需要安装的 nodejs 版本, 选一个命令执行
开始安装: `yum install -y nodejs`
测试是否成功: `node -v`, 如果出现对应的版本号, 则安装成功

### 方法2:

```bash
// 1. 下载 nodejs
# cd ~
# wget https://nodejs.org/dist/v12.14.0/node-v12.14.0-linux-x64.tar.gz
// 其他版本: https://nodejs.org/dist/v(版本号)/node-v(版本号)-linux-x64.tar.gz
// https://nodejs.org/dist/ 可以看到所有版本

// 2. 解压
# tar -xvf node-v12.4.0-linux-x64.tar.xz

// 3. 创建软链结
# ln -s /root/node-v12.4.0-linux-x64/bin/node /usr/bin/node
# ln -s /root/node-v12.4.0-linux-x64/bin/npm /usr/bin/npm

# ln -s /root/node-v12.4.0-linux-x64/bin/node /usr/local/bin/node
# ln -s /root/node-v12.4.0-linux-x64/bin/npm /usr/local/bin/npm
```
测试是否成功: `node -v`, 如果出现对应的版本号, 则安装成功

# 5. 安装 nginx

1. 添加 Nginx 到 yum 源
```bash
# sudo rpm -Uvh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
```
其他源地址见: http://nginx.org/packages/
centOS7 原地址: http://nginx.org/packages/centos/7/x86_64/RPMS/

2. 安装 Nginx
```bash
# sudo yum install -y nginx
```
3. 启动 Nginx
```bash
# sudo systemctl start nginx.service
```
4. 开机启动 Nginx
```bash
# sudo systemctl enable nginx.service
```
5. Nginx 配置信息
```bash
// 网站默认站点配置
# vi /etc/nginx/conf.d/default.conf
// 自定义 Nginx 站点配置文件存放目录
# vi /etc/nginx/conf.d/
// Nginx 全局配置
# vi /etc/nginx/nginx.conf
```

# 6. 安装 git

## 方法一、yum 安装

```bash
# yum install git
```
通过yum方式安装，版本比较旧，CentOS 7.2上安装好是1.8版。如果想安装最新版或其他版本，需要使用方法二或三。

## 方法二、第三方仓库安装方式（IUS）
ius 官方的 [安装说明](https://ius.io/setup "安装说明") 及 [使用说明](https://ius.io/usage "使用说明")
```bash
# curl https://setup.ius.io | sh
// 卸载老版本
# yum remove -y git
// 安装新版本
yum -y install git2u
```

## 方法三、源码包安装

1. 安装依赖包
```bash
# yum install curl-devel expat-devel gettext-devel openssl-devel zlib-devel
# yum install  gcc perl-ExtUtils-MakeMaker
```
2. 卸载旧的git版本（如果之前有安装rpm包）
```
# yum remove git
```
3. 下载&解压
```
# cd /usr/src
# wget https://github.com/git/git/archive/v2.24.1.tar.gz
# tar -zxvf v2.24.1.tar.gz
```
或到 https://github.com/git/git/releases 选择一个版本
4. 编译安装
```
# cd v2.24.1
# make prefix=/usr/local/git all
# make prefix=/usr/local/git install
# echo "export PATH=$PATH:/usr/local/git/bin" >> /etc/bashrc
# source /etc/bashrc
```
5. 检查git版本
```
# git --version
// git version 2.24.1
```

# 7. 安装 mongoDB

```
# vi /etc/yum.repos.d/mongodb-org-3.2.repo // 3.x
# vi /etc/yum.repos.d/mongodb-org-4.0.repo // 4.x
```
写入以下内容
```
// 3.x
[mongodb-org-3.2]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.2/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-3.2.asc

// 4.x
[mongodb-org-4.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/4.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.0.asc
```
保存并退出
开始安装:
```
# yum install -y mongodb-org
```
配置文件：`/etc/mongod.conf`
数据文件：`/var/lib/mongo`
日志文件：`/var/log/mongodb`
相关命令:
```
// 启动
# service mongod start
// 停止
# service mongod stop
// 重启
# service mongod restart
// 增加开机启动
# chkconfig mongod on
```

# 8. api 服务器

vue2 ssr 不管是服务端还是浏览器端, 都是通过 api 来获取数据的, 所以我们需要先搭 api 服务器
安装 pm2, 让 nodejs 服务可以在后台运行
```
npm install -g pm2
```
从 github 克隆一个项目
```
# cd /home
# mkdir web
# cd web
# git clone https://github.com/lincenying/mmf-blog-api-v2.git
# cd mmf-blog-api-v2
# yarn
# pm2 start ./bin/www
```
这样, api 服务器就起来了

# 9. SSR 服务器
```
# cd /home/web
# git clone https://github.com/lincenying/mmf-blog-vue2-pwa-ssr.git
# cd mmf-blog-vue2-pwa-ssr
# yarn
```
构建 vue2 项目
```
# yarn build
```
启动服务
```
# pm2 start yarn -- ssr:start
```

# 10. 利用 nginx 反向代理来绑定域名

```
# vi /etc/nginx/conf.d/ssr.conf
```
写入以下内容:
```
server {
            listen 80;
            server_name xxxx.com www.xxxx.com; // 你的域名
            location / {
                    proxy_set_header X-Real-IP $remote_addr;
                    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                    proxy_set_header Host  $http_host;
                    proxy_set_header X-Nginx-Proxy true;
                    proxy_set_header Connection "";
                    proxy_pass  http://127.0.0.1:8080; // 代理到 nodejs 网站服务器
            }
}
```
保存并退出
重新加载 nginx
```
nginx -t // 测试 nginx 配置文件
nginx -s reload
```

到此, 基本配就结束了...
