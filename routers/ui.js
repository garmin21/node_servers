const express = require("express");
const { resolve } = require("path");
const Router = express.Router;
const uiRouter = new Router();

uiRouter.get('/user.html',(req,res) => {
    /* 只有登入过好，才能访问 用户中心界面*/
    if(req.session.user){
      res.sendFile(resolve(__dirname,'../Views/user.html'))
      return;
    }
    // 没登录过，去登入页面
    res.redirect('/login.html')
  })

module.exports = uiRouter;
