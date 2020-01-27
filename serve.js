const express = require("express");

const app = express();
const userRouter = require('./routers/user')

app.use(express.urlencoded({ extended: true }));
// 解析POST请求体数据

app.use(userRouter)

app.listen(8000, err => {
  if (!err) console.log("server启动村成功,8000");
  else console.log(err);
});
