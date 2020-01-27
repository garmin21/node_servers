# 服务器开发基本流程

> 模块化思想：对不同的代码功能，进行单一用途原则，同类型，相似功能的抽取为一个模块

###  MVC 架构模式

```json
* 一种服务器常用的架构模式
* M - Model 数据层(数据库)
* V - View 视图层(页面)
* C - Controller 控制层(操作数据库)
```



1. 完成登入和注册功能

```js
注册：
    1. 获取表单数据
    2. 对用户数据进行校验
    3. 判断用户名是否已存在
    4. 校验成功后存储数据库
    5. 返回注册成功的响应
```

```js
登入： 
    1. 获取表单数据
    2. 对用户数据进行校验
    3. 去数据库中查找用户是否存在
    4. 判断密码是否正确
```

2. 使用 `md5`对数据库中存储的密码进行加密

   一种消息摘要加密算法

    不可逆的方式加密（理论上通过密文没办法破解明文）

    同样的明文加密后输出同样的密文

   加密：`md5(password)`
   
3. 但某些页面需要权限才能，访问，我们就必须有一种方式可以去访问页面，这样的话就必须知道，是哪个用户访问了，由此呢，就诞生的cookie 这个技术，`yarn add redis connect-redis express-session`
    使用 `redis, session` 来帮助保存 cookie 用户信息,从而来知道用户有没有登入过
    
    ```js
    配置 session:
    const redis = require('redis');
    const session = require("express-session");
    const RedisStore = require("connect-redis")(session);
    const redisClient = redis.createClient(6379, 'localhost'); // redis 默认端口为 6379
    redisClient.on('error', err => {
      if (err) {
        console.log('redis出错了', err);
      }
    });
    app.use(
      session({
        store: new RedisStore({
          client: redisClient, // 存储 session 的数据库
          ttl: 7 * 24 * 3600 // session 数据过期时间
        }),
        secret: "KA7}D{*vPb:>Twm%", // 参与 session_id 加密参数
        resave: false, // 如果 session 的数据没有修改，就不会重新存储
        saveUninitialized: false, // 如果 session 没有数据，就不会存储
        cookie: {
          httpOnly: true,
          maxAge: 7 * 24 * 3600 * 1000
        }
      })
    );
    通过: req.session 存储用户信息
    ```
### 项目目录结构

* `serve.js `服务器入口文件
* `public`公共资源文件夹
* `db`数据库代码模块化
* `views`视图层
* `model`返回成功/失败的类
* `controller`通过数据库操作，生成响应数据
* `middlewares`应用级中间件模块
* `services` 操作数据库的方法
* `routers` 分类管理路由
* `redis`redis操作
* `utils`工具函数