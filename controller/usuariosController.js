const Usuarios = require('../models/Usuarios');

exports.crearCuentas = (req, res, next) => {
    res.render('crearCuentas',{
        nombrePagina: 'Crear Cuenta Usuario'
    })
}

exports.crearCuenta = async(req, res, next) => {
    
    const {email, password} = req.body;
    try{
        await Usuarios.create({
            email: email, 
            password: password
        });
        res.redirect('/iniciar_sesion');
    }catch(e){
        res.render('crearCuentas',{
            nombrePagina: 'Crear Cuenta Usuario',
            errores: e.errors,
            email : email,
            password: password
        })
    }
   
}

exports.inicarSesion = (req, res, next) => {
    const {error} = req.flash();

   
    res.render('iniciarSesion', {
        nombrePagina: 'Iniciar Sesion',
        error
    })
}

exports.reestablecerContraseña = (req, res, next) => {

    res.render('reestablecerPassword', {
        nombrePagina: 'Reestablecer Contraseña'
    });

}