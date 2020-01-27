const express = require("express");

const app = express();
const User = require("./db/model/user");

app.use(express.urlencoded({ extended: true }));
// 解析POST请求体数据

/* 注册 */
app.post("/register", async (req, res) => {
  /* 获取表单数据 */
  const { username, password, repPassword, phone } = req.body;
  console.log(username, password, phone);
  /* 对表单数据进行校验 */
  const userReg = /^\w{5,8}$/; // 用户名必须是数字字母下划线，{5，8}
  const passReg = /^\w{5,13}$/; // 密码必须是数字字母下划线，{5，13}
  const phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/; // 匹配手机号

  if (!userReg.test(username)) {
    res.send("用户名必须是数字字母下划线，5到8位");
    return;
  }
  if (!passReg.test(password)) {
    res.send("密码必须是数字字母下划线，5到13位");
    return;
  }
  if (!phoneReg.test(phone)) {
    res.send("手机号不正确");
    return;
  }
  if (repPassword !== password) {
    res.send("两次输入的密码不一致");
    return;
  }
  /* 判断用户名是否存储过 */
  const result = await User.findOne({
    where: {
      username
    },
    attributer: ["username"]
  });
  if (result) {
    res.send("用户名已存在");
    return;
  }
  /* 校验成功后存储数据库 */
  await User.create({
    username,
    password,
    phone
  });
  res.send("用户注册成功");
});

/* 登入 */
app.post("/login", async (req, res) => {
  /* 获取表单数据 */
  const { username, password } = req.body;
  /* 对用户数据进行校验 */
  const userReg = /^\w{5,8}$/; // 用户名必须是数字字母下划线，{5，8}
  const passReg = /^\w{5,13}$/; // 密码必须是数字字母下划线，{5，13}

  if (!userReg.test(username)) {
    res.send("用户名必须是数字字母下划线，5到8位");
    return;
  }
  if (!passReg.test(password)) {
    res.send("密码必须是数字字母下划线，5到13位");
    return;
  }
  /* 去数据库中查找用户是否存在 */
  const result = await User.findOne({
      where : {
          username
      },
      attributer : ['username','password']
  })
  if(!result){
      res.send('用户名不存在')
      return
  }

  if(password !== result.password){
    res.send('密码不正确');
    return
  }

  res.send('登入成功')

});

app.listen(8000, err => {
  if (!err) console.log("server启动村成功,8000");
  else console.log(err);
});
