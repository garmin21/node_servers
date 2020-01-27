const express = require("express");

const app = express();
const {reqRegister,reqLogin} = require('./Controller/user')
const userCheck = require('./middlewares/user')

app.use(express.urlencoded({ extended: true }));
// 解析POST请求体数据

app.use(userCheck);

/* 注册 */
app.post("/register", async (req, res) => {
  /* 获取表单数据 */
  const { username, password, phone } = req.body;
  const result = await reqRegister({ username, password, phone });
  res.json(result)
 
});

/* 登入 */
app.post("/login", async (req, res) => {
  /* 获取表单数据 */
  const { username, password } = req.body;
  const result = await reqLogin({username,password});
  res.json(result)

});

app.listen(8000, err => {
  if (!err) console.log("server启动村成功,8000");
  else console.log(err);
});
