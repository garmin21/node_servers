/**
 * @description 用于处理 用户登入和注册路由
 */
const {reqRegister,reqLogin} = require('../Controller/user')
const userCheck = require('../middlewares/user')

const express = require("express");
const Router = express.Router;

const userRouter = new Router();


userRouter.use(userCheck);

/* 注册 */
userRouter.post("/register", async (req, res) => {
  /* 获取表单数据 */
  const { username, password, phone } = req.body;
  const result = await reqRegister({ username, password, phone });
  res.json(result);
});

/* 登入 */
userRouter.post("/login", async (req, res) => {
  /* 获取表单数据 */
  const { username, password } = req.body;
  const result = await reqLogin({ username, password });
  res.json(result);
});


module.exports = userRouter
