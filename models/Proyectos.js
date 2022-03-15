const Sequelize = require('sequelize');

const db = require('../config/database');
const slug = require('slug');
const shortid = require('shortid');

const Proyectos = db.define('proyectos',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING(60),
        notNull : true
    },
    url: {
        type: Sequelize.STRING,
        notNull : true
    }
    
},{
    hooks: {
        beforeCreate(proyectos){
            const url = slug(proyectos.nombre+" "+shortid.generate()).toLocaleLowerCase();

            proyectos.url = url;
        }
    }
});

module.exports = Proyectos;