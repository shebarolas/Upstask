const passport = require('passport');
const Usuarios = require('../models/Usuarios');
const crypto = require('crypto');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const bcrypt = require('bcrypt-nodejs');


exports.autenticarUsuario = passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/iniciar_sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos no deben ir vacios!'
});

exports.usuarioAutenticado = (req, res, next) => {
    if (req.isAuthenticated()){
        next();
    }else{
        res.redirect('/iniciar_sesion');
    }

}

exports.cerrarSesion  = (req, res, next) => {
    req.session.destroy(()=>{
        res.redirect('/iniciar_sesion');
    });
}

exports.tokenContraseña = async (req, res, next) => {
    const {email} = req.body;

    const usuario = await Usuarios.findOne({
        where: {
            email: email
        }
    });

    let errores = [];

    if(!usuario){
        
        errores.push({'mensaje': 'El usuario no existe'});
        res.render('reestablecerPassword', {
            nombrePagina: 'Reestablecer Contraseña',
            errores
        });
        

    }
        //Si el usuario existe
        usuario.token = crypto.randomBytes(20).toString('hex');
        usuario.expiracion = Date.now() + 3600000;

        await usuario.save();
        const urlReset = `http://${req.headers.host}/reestablecer/${usuario.token}`;
        res.redirect(urlReset);
        

}

exports.validarToken = async(req, res) => {
    const {token} = req.params;
    const usuario = await Usuarios.findOne({
        where: {
            token: token
        }
    });

    if(usuario){
        res.render('resetPassword',{
            nombrePagina: 'Recupera tu Constraseña'
        })
    }

}

exports.cambiarPassword = async(req, res) => {
    const {token} = req.params;
    const usuario = await Usuarios.findOne({
        where: {
            token: token,
            expiracion:{
                [Op.gte]: Date.now()
            }
        }
    })

    if(usuario){
        const {password} = req.body;
        usuario.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        usuario.token = null;
        usuario.expiracion = null;

        usuario.save();

        let exito = [];

        exito.push({'mensaje': 'La constraseña se ha modificado corectamente'})

        res.render('iniciarSesion',{
            nombrePagina: 'Iniciar Sesion',
            exito
        })
    }else{
        let errores = [];

        errores.push({'mensaje': 'No valido'});

        res.render('iniciarSesion',{
            nombrePagina: 'Iniciar Sesion',
            errores
        });
    }
    
    console.log(usuario);
}

