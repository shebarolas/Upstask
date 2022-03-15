const express = require('express');
const router = express.Router();
const proyectoController = require('../controller/proyectoController');
const tareasController = require('../controller/tareasController');
const usuariosController = require('../controller/usuariosController');
const autenticacionController = require('../controller/autenticacionController');
//Importamos express-validator
const{ body } = require('express-validator');

module.exports = function () {
    //ruta para el home
    router.get('/',autenticacionController.usuarioAutenticado,proyectoController.proyectoHome);
    router.get('/nuevos_proyectos',autenticacionController.usuarioAutenticado, proyectoController.proyectoNuevos);
    router.post('/nuevos_proyectos', body('nombre').not().isEmpty().trim().escape(),
    proyectoController.nuevosProyectos);

    //Lista de Proyecto
    router.get('/proyectos/:url', proyectoController.proyectoPorUrl);
    
    //Actualizar proyecto
    router.get('/proyecto/editar/:id', proyectoController.editarProyectoId);
    router.post('/nuevos_proyectos/:id',autenticacionController.usuarioAutenticado, body('nombre').not().isEmpty().trim().escape(),
    proyectoController.actualizarProyectosId
    );

    //Eliminar Proyectos
    router.delete('/proyectos/:url',autenticacionController.usuarioAutenticado, proyectoController.eliminarProyectosUrl);

    //Agregar Tareas al proyecto
    router.post('/proyectos/:url',autenticacionController.usuarioAutenticado, tareasController.agregarTareasUrl);

    //Actualizar Tareas del proyectos Estado
    router.patch('/tareas/:id',autenticacionController.usuarioAutenticado, tareasController.actualizarEstadoTareaPorId);
    //Eliminar tareas del proyecto
    router.delete('/tareasEliminar/:id',autenticacionController.usuarioAutenticado, tareasController.eliminarTarea);

    //Ir a la pantalla de crear cuentas de usuarios.
    router.get('/crear_cuentas', usuariosController.crearCuentas);
    router.post('/crear_cuenta', usuariosController.crearCuenta);

    //Ir a la pantalla de iniciar sesion
    router.get('/iniciar_sesion', usuariosController.inicarSesion);
    router.post('/iniciar_sesion', autenticacionController.autenticarUsuario);
    //Cerrar Sesion
    router.get('/cerrar_sesion', autenticacionController.cerrarSesion);

    //Reestablecer Contraseña  
    router.get('/reestablecer_pass', usuariosController.reestablecerContraseña);
    router.post('/reestablecer', autenticacionController.tokenContraseña);
    router.get('/reestablecer/:token', autenticacionController.validarToken);
    router.post('/reestablecer/:token', autenticacionController.cambiarPassword);


    return router;
}
