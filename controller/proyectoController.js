const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');

//Muestra la pagina de Home con todos los proyectos en la barra lateral
exports.proyectoHome = async (req, res, next) => {
    const usuarioId = req.user.id;
    //Permite obtener los proyectos de la base de datos y mostralos en la barra lateral
    const proyectos = await Proyectos.findAll({
        where: {
            usuarioId: usuarioId
        }
    });
   
    res.render("index", {
        nombrePagina : 'Proyectos',
        proyectos
    });

    next();
}
/**---------------------------------------------------------------- */

//Permite mostrar la pagina de nuevos proyectos, con la barra lateral donde se muestran los proyectos
exports.proyectoNuevos = async (req, res) => {
    const usuarioId = req.user.id;
    const proyectos = await Proyectos.findAll({
        where:{
            usuarioId: usuarioId
        }
    });
    res.render("nuevos_proyectos",{
        nombrePagina : 'Nuevos Proyectos',
        proyectos
    });
}
/*----------------------------------------------------------------*/

//Agregar nuevos proyectos
exports.nuevosProyectos = async(req, res) => {
    //console.log(req.body);
    const usuarioId = req.user.id;
    const proyectos = await Proyectos.findAll({
        where: {
            usuarioId: usuarioId
        }
    });

    const { nombre } = req.body;

    let errores = [];

    if(!nombre) {
        errores.push({'mensaje': 'Error, Agregue nombre a nuevo proyecto'});
    }
    console.log(errores);
    //Si hay errores
    if(errores.length > 0) {
        res.render('nuevos_proyectos',{
            nombrePagina: 'Nuevos Proyectos',
            errores,
            proyectos
        });
    }else{
        const usuarioId = req.user.id;
        await Proyectos.create({ nombre, usuarioId });
        res.redirect('/');
    }
}
/*---------------------------------------------------*/

//Permite extraer la informacion del proyecto por la url del mismo
exports.proyectoPorUrl = async(req,res, next) => {
    const usuarioId = req.user.id;
    const proyectos = await Proyectos.findAll({
        where: {
            usuarioId: usuarioId
        }
    });
    
    const proyecto = await Proyectos.findOne({
        where: {
            url: req.params.url,
            usuarioId: usuarioId
        }
    });
    const tareas = await Tareas.findAll({
        where: {
            proyectoId: proyecto.id
        }
    });


    if(!proyecto) {
        return next();
    }
    
    //Render hacia las vistas

    res.render('tareas',{
        nombrePagina : 'Tareas',
        proyecto,
        proyectos,
        tareas
    });
}

/** ---------------------------------------------------------------- */

//Permite editar el proyecto por la id
exports.editarProyectoId = async (req, res) => {
    const usuarioId = req.user.id;
    const proyectosProm = Proyectos.findAll({
        where: {
            usuarioId: usuarioId
        }
    });
    const proyectoProm = Proyectos.findOne({
        where: {
            id: req.params.id
        }
    });

    const [proyectos, proyecto] = await Promise.all([proyectosProm, proyectoProm]);

    res.render('nuevos_proyectos',{
        nombrePagina : 'Editar Proyecto',
        proyectos,
        proyecto
    });
}
/**---------------------------------------------------------------- */

//Permite actualizar los datos del proyecto mediante la id
exports.actualizarProyectosId = async (req, res) => {
     //console.log(req.body);
     const usuarioId = req.user.id;
     const proyectos = await Proyectos.findAll({
         where: {
            usuarioId: usuarioId
         }
     });

     const { nombre } = req.body;
 
     let errores = [];
 
     if(!nombre) {
         errores.push({'mensaje': 'Error, Agregue nombre a nuevo proyecto'});
     }
     console.log(errores);
     //Si hay errores
     if(errores.length > 0) {
         res.render('nuevos_proyectos',{
             nombrePagina: 'Nuevos Proyectos',
             errores,
             proyectos
         });
     }else{
         await Proyectos.update({ nombre : nombre },
            {
              where: {
                id: req.params.id,
                usuarioId: usuarioId
              }  
            }
            );
         res.redirect('/');
     }
}
/**---------------------------------------------------------------- */

exports.eliminarProyectosUrl = async (req, res, next) => {
        const url = req.params.url;
        const usuarioId = req.user.id;
        const proyectos = await Proyectos.findAll({
            where: {
                usuarioId: usuarioId
            }
        });
        const resultado = await Proyectos.destroy({
            where: {
                url : url,
                usuarioId: usuarioId
            }
        });

        if(!resultado) {
            return next();
        }

        res.render('nuevos_proyectos', {
            nombrePagina: 'Nuevos Proyectos',
            proyectos
        });
}