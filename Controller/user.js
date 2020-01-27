/**
 * @description 用于操作user数据
 */
const User = require("../db/model/user");
const { SucceedModel, FailureModel } = require("../Model/index");

/* 封装查询数据库方法 */
const getUserInfo = async username => {
  const result = await User.findOne({
    where: {
      username
    },
    attributer: ["username", "password"]
  });

  return result;
};

/* 封装存储数据库的方法 */
const storeUserInfo = async ({ username, password, phone }) => {
  await User.create({
    username,
    password,
    phone
  });
};

/* 封装注册响应 */
const reqRegister = async ({username,password,phone}) => {
  /* 判断用户名是否存储过 */
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
};

/* 封装登入响应 */
const reqLogin = async ({username,password}) => {
  /* 判断用户名是否存储过 */
  /* 去数据库中查找用户是否存在 */
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
};

module.exports = {
  reqRegister,
  reqLogin
};
