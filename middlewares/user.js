/**
 * @description 应用级中间件，用于复用代码
 */

 const userCheck = (req,res,next) => {
    const { username, password, repPassword, phone } = req.body;

    const isRegister = req.url === '/register'
  
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
    if (isRegister && !phoneReg.test(phone)) {
      res.send("手机号不正确");
      return;
    }
    if (isRegister && repPassword !== password) {
      res.send("两次输入的密码不一致");
      return;
    }
  
    next();
 }

 module.exports = userCheck;