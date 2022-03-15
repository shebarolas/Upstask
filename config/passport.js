const passport = require('passport');
const Local = require('passport-local').Strategy;

//Referenciar al modelo que vamos a autenticar
const Usuarios = require('../models/Usuarios');

//Login con las credeciales que nosotros queremos en este caso Email y Password
passport.use(
    new Local(
        //Por defecto, passport pide nombre de usuario y contraseña
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async(email, password, done, req)=> {
            try {
                const usuario = await Usuarios.findOne({
                    where:{
                        email: email
                    }
                });
                //Usuario existe, pero la password esta incorrecta
                if(usuario.verificarPassword(password)) {
                    console.log("Entrando");
                    return done(null, usuario, {
                        message: 'Inicio de Sesion exitosa!!!'
                    });
                }else{
                    return done(null, false,{
                        message: "Error! Contraseña Incorrecta"
                    });
                }
            }catch(e){
                return done(null, false,{
                    message: "El usuario no existe!"
                });
            }

        }
    )
)

//Serializar el Usuario
passport.serializeUser((usuario, callback) =>{
    callback(null, usuario);
});

//Deserializar Usuario
passport.deserializeUser((usuario, callback) =>{
    callback(null, usuario);
});

module.exports = passport;