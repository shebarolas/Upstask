import Swal from "sweetalert2";

export const actualizarBarra = () => {
    
    const tareas = document.querySelectorAll('li.tarea');

    if (tareas.length){
        const tareas_completadas = document.querySelectorAll('i.completo');

        const avance = Math.round(tareas_completadas.length* 100 )/ tareas.length;

        const porcentaje = document.querySelector('#porcentaje');

        porcentaje.style.width = avance+'%';

        if(avance === 100){
            Swal.fire(
                'Proyecto Finalizado',
                'Enhorabuena, has finalizado tu proyecto!',
                'success'
            )
        }
      

    }
    

}