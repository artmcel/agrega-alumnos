import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@popperjs/core';

const loadModule     = import( /*webpackChunkName: "peticiones" */ "./services/peticiones"),
      tableAlumnos =  document.getElementById( 'table-alumnos');

let btnEliminar = '';

const $getAlumnos =  (async()=>{

    loadModule.then( module => {
        const allAlumnos = module.getAllAlumnos();

        allAlumnos.then( alumnos =>{

            alumnos.forEach( ({alumno_id, apellido_paterno, apellido_materno, nombre, fecha_nacimiento}) => {

                let table =  `
                    <tr id="table-alumnos" class="text-center">
                        <td>${alumno_id}</td>
                        <td>${nombre} ${apellido_paterno} ${apellido_materno}</td>
                        <td>${fecha_nacimiento}</td>
                        <td class="row">
                            <button id="eliminarAlumno" class="col btn btn-danger m-1" value="${alumno_id}">Eliminar</button>
                            <button class="col btn btn-info m-1">Agregar Grupo</button>
                        </td>
                    </tr>`;
                
                tableAlumnos.insertAdjacentHTML( 'beforeend',  table);
                
            });
            
        }).then( ()=>{
            
            btnEliminar = document.querySelectorAll( '#eliminarAlumno' );
            //return btnEliminar;
            
            btnEliminar.forEach( boton =>{
                
                boton.addEventListener('click', ()=>{
                    //console.log( boton.value );
                    $deleteAlumno( boton.value );

                });
            });

        });
    });

})();


const $deleteAlumno =  async( idAlumno )=>{

    loadModule.then( module => {

        const deleteAlum = module.deleteAlumno( idAlumno );
        deleteAlum.then( alumno =>{

            if(alumno.result == true){
                alert('registro eliminado'); 
                location.reload();
            }else {
                alert('hubo un error en la trasacción');
            }
            
        });
    });


};

