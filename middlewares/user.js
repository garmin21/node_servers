/**
 * @description 应用级中间件，用于复用代码
 */
const { FailureModel } = require("../Model");

const userCheck = (req, res, next) => {
  const { username, password, repPassword, phone } = req.body;
  /* 判断是否是注册路由 */
  const isRegister = req.url === "/register";
  /* 定义一个 响应数据对象，进行统一返回错误的响应 */
  const message = {};

  const userReg = /^\w{5,8}$/; // 用户名必须是数字字母下划线，{5，8}
  const passReg = /^\w{5,13}$/; // 密码必须是数字字母下划线，{5，13}
  const phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/; // 匹配手机号

  if (!userReg.test(username)) {
    message.userError = "用户名必须是数字字母下划线，5到8位";
  }
  if (!passReg.test(password)) {
    message.passError = "密码必须是数字字母下划线，5到13位";
  }
  if (isRegister && !phoneReg.test(phone)) {
    message.phoneError = "手机号不正确";
  }
  if (isRegister && repPassword !== password) {
    message.repPassError = "两次输入的密码不一致";
  }

  const len = Object.keys(message).length;

  if (len) {
    const err = new FailureModel({
      errCode: 5,
      message
    });
    /* 将错误统一返回 */
    res.json(err);

    return;
  }

  next();
};

module.exports = userCheck;
