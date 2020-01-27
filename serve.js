const express = require("express");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);

const app = express();
const userRouter = require("./routers/user");
const redisClient = require("./redis");
const uiRouter = require('./routers/ui')

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // 解析POST请求体数据

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
// 配置路由中间件
app.use(uiRouter)
app.use(userRouter);

app.listen(8000, err => {
  if (!err) console.log("server启动村成功,8000");
  else console.log(err);
});
