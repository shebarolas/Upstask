const Sequelize = require('sequelize');
const db = require('../config/database');
const Proyectos = require('../models/Proyectos');
const bcrypt = require('bcrypt-nodejs');

const Usuarios = db.define('usuarios', {
    id: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Error!, Debe ingresar un E-mail Válido'
            },
            notEmpty: {
                msg: 'Por favor, Ingrese E-mail'
            }
        },
        unique: {
            args: true,
            msg: 'Usuario Ya Registrado'
        }

    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate:{
            notEmpty:{
                msg : 'Por favor Ingrese Contraseña'
            }
        }
    },
    token:{
        type: Sequelize.STRING
    },
    expiracion: {
        type: Sequelize.DATE
    }
},{
    hooks: {
        beforeCreate(Usuarios){
            Usuarios.password = bcrypt.hashSync(Usuarios.password, bcrypt.genSaltSync(10));
        }
    }
});

Usuarios.prototype.verificarPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

Usuarios.hasMany(Proyectos);

module.exports = Usuarios;