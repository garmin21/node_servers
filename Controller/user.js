/**
 * @description 用于操作数据库，返回成功\失败的响应
 */
const { SucceedModel, FailureModel } = require("../Model/index");
const { getUserInfo, storeUserInfo } = require("../services/user");

/* 封装注册响应 */
const reqRegister = async ({ username, password, phone }) => {
  /* 异步代码有可能会出错 */
  try {
    const result = await getUserInfo(username);

    if (result) {
      return new FailureModel({
        errCode: 1,
        message: "用户已存在"
      });
    }
    /* 校验成功后存储数据库 */
    await storeUserInfo({ username, password, phone });

    return new SucceedModel({
      errCode: 0,
      data: "用户注册成功"
    });
  } catch (err) {
    return new FailureModel({
      errCode: 3,
      message: "网络错误，重连试试"
    });
  }
};

/* 封装登入响应 */
const reqLogin = async ({ username, password }) => {
  /* 判断用户名是否存储过 */
  /* 去数据库中查找用户是否存在 */
  try {
    const result = await getUserInfo(username);

    if (!result) {
      return new FailureModel({
        errCode: 2,
        message: "用户名不存在"
      });
    }

    if (password !== result.password) {
      return new FailureModel({
        errCode: 3,
        message: "两次密码输入不一致"
      });
    }
    return new SucceedModel({
      errCode: 0,
      data: "登入成功"
    });
  } catch (error) {
    return new FailureModel({
      errCode : 3,
      message : '网络错误，重连试试'
    })
  }
};

module.exports = {
  reqRegister,
  reqLogin
};
