/**
 * @description 用于处理 用户登入和注册路由
 */
const { reqRegister, reqLogin } = require("../Controller/user");
const userCheck = require("../middlewares/user");

const express = require("express");
const Router = express.Router;

const userRouter = new Router();

userRouter.use(userCheck);

/* 注册 */
userRouter.post("/register", async (req, res) => {
  /* 获取表单数据 */
  const { username, password, phone } = req.body;
  const result = await reqRegister({ username, password, phone });

  /* 
    注册成功，跳转到 登入页面
    注册失败，返回失败数据
  */
  if (result.errCode === 0) {
    res.redirect("/login.html");
    return;
  }

  res.json(result);
});

/* 登入 */
userRouter.post("/login", async (req, res) => {
  /* 获取表单数据 */
  const { username, password } = req.body;
  const result = await reqLogin({ req,username, password });

  /* 
    需求： 登入功能后，重定向到 用户中心 界面
           登入失败，返回登入失败的数据
  */
  if (result.errCode === 0) {
    // 登入成功
    res.redirect("/user.html");
    return;
  }
  res.json(result);
});


module.exports = userRouter;
