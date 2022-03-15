import Swal from "sweetalert2";
import axios from "axios";

const btn_eliminar = document.querySelector('#eliminar_proyecto');


if(btn_eliminar){
    btn_eliminar.addEventListener('click', evento =>{

        const url_proyecto = evento.target.dataset.url;

        Swal.fire({
            title: '¿Estás seguro de eliminar este proyecto?',
            text: "Una vez eliminado, el proyecto no se podra recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borrar',
            cancelButtonText: 'No, Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                //Enviar peticion a axios para poder eliminar
                const url = `${location.origin}/proyectos/${url_proyecto}`;

                axios.delete(url, {
                  params: {
                    url_proyecto
                  }
                })
                .then(function(result){
                  Swal.fire(
                    'Borrado!',
                    'El proyecto fue borrado de forma existosa.',
                    'success'
                  )
                }).catch(()=>{
                  Swal.fire({
                    type: 'error',
                    title: 'Hubo un error interno',
                    text: 'Error al eliminar el proyecto'
                  })
                });

             
    
              setTimeout(() =>{
                  window.location.href = '/'
              }, 3000);
    
            }
          })
    });
}

export default btn_eliminar;