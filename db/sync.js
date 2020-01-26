const sequelize = require("./sequelize");
const User = require("./model/user");

sequelize
  .authenticate()
  .then(() => {
    console.log("连接成功");
  })
  .catch(err => {
    console.log(err + "连接失败");
  });

User.sync({
  force: true
})
  .then(() => {
    console.log("创建成功");
  })
  .catch(() => {
    console.log("创建失败");
  });
