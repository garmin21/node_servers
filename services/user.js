/**
 * @description 用于操作数据库
 */
const md5 = require('md5')
const User = require("../db/model/user");
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
      password : md5(password), // 对存储密码进行加密
      phone
    });
  };

module.exports = {
    getUserInfo,
    storeUserInfo
}