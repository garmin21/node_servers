/**
 * @description 用于操作数据库
 */
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
      password,
      phone
    });
  };

module.exports = {
    getUserInfo,
    storeUserInfo
}