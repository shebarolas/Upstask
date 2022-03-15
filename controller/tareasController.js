const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');


exports.agregarTareasUrl = async(req, res, next) => {


   const proyecto = await Proyectos.findOne({
        where: {
            url: req.params.url
        }
    });


    //Leer valor del input
    const {tarea} = req.body;
    
    //Le pasamos Estado de la tarea es 0 por defecto e la ID del proyecto
        const estado = 0;
        const proyectoId = proyecto.id;

    //Creamos la Tareas
        const resultado = await Tareas.create({tarea, estado, proyectoId});

    if(!resultado) {
        return next();
    }else{
        res.redirect(`/proyectos/${req.params.url}`)
    }
};

exports.actualizarEstadoTareaPorId = async(req, res, next) => {
    const { id } = req.params;
    const tarea = await Tareas.findOne({
        where: {
            id: id
        }
    });

    let estado = 0;

    if(tarea.estado === estado) {
        estado = 1;
    }

    tarea.estado = estado;

    const results = await tarea.save();

    if(!results) {
        return next();
    }

    res.status(200).send("Actualizado");


};

exports.eliminarTarea = async(req, res, next) =>{
    const { id } = req.params;

    const results = await Tareas.destroy({
        where: {
            id: id
        }
    });

    if(!results){
        return next();
    }
    res.send("Eliminando.....");
};