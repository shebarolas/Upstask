import axios from "axios";
import Swal from "sweetalert2";
import {actualizarBarra} from '../funciones/barra_avance';

const tareas = document.querySelector(".listado-pendientes");

if(tareas){
    tareas.addEventListener('click', e => {
        if(e.target.classList.contains('completar_tarea')){
            console.log(e.target)
            const iconos = e.target;

            const idTareas = iconos.parentElement.parentElement.dataset.tareaid;

            const url = `${location.origin}/tareas/${idTareas}`
            
            axios.patch(url,{idTareas})
            .then(function (res) {
                if(res.status === 200) {
                    iconos.classList.toggle('completo');

                    actualizarBarra();
                }
            });

            
        }

        if(e.target.classList.contains('eliminar_tarea')){

            const tarea = e.target.parentElement.parentElement;
            const idTarea = tarea.dataset.tareaid;

            const url = `${location.origin}/tareasEliminar/${idTarea}`

            Swal.fire({
                title: '¿Estás seguro de eliminar esta tarea?',
                text: "Una vez eliminado, la tarea no se podra recuperar!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Borrar',
                cancelButtonText: 'No, Cancelar'
              }).then(result =>{
                  if(result.isConfirmed){

                    axios.delete(url)
                    .then(result =>{
                        if(result.status === 200){
                            //Remover el bloque que contiene la tarea
                            tarea.parentElement.removeChild(tarea);

                            //opcion de alerta
                            Swal.fire(
                                'Tarea Eliminada',
                                'Su tarea a sido eliminada con exito',
                                'success'
                            )

                            actualizarBarra();
                        }
                    });

                  }
              })
        }
    });
}

export default tareas;