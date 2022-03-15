const Sequelize = require('sequelize');

require('dotenv').config({path: 'variables.env'});

const db = new Sequelize(process.env.BD_Nombre, process.env.BD_Usuario, process.env.BD_Password,{
    host: process.env.BD_Host,
    dialect: 'mysql',
    define: {
        timestamps: false,
    },

    pools: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }


});

module.exports = db;