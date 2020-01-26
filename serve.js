const express = require('express')

const app = express();








app.listen(8000,(err) => {
    if(!err) console.log('服务器启动成功8000');
    else console.log(err)
})