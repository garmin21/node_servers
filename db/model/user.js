
const sequelize = require('../sequelize')
const Sequelize = require('sequelize')

const User = sequelize.define('user',{
    username : {
        type : Sequelize.STRING,
        allowNull : false,
        unique: true
    },
    password : {
        type : Sequelize.STRING,
        allowNull : false
    },
    phone : {
        type : Sequelize.STRING,
        allowNull : false
    }
});

module.exports = User