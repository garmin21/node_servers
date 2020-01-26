const Sequelize = require('sequelize')

const sequelize = new Sequelize('book','root','root',{
    host : 'localhost', // ip地址
    dialect : 'mysql' // 指定mysql 服务
});




module.exports = sequelize
