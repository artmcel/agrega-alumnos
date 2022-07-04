import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@popperjs/core';

const loadModule     = import( /*webpackChunkName: "peticiones" */ "./services/peticiones"),
      tableAlumnos =  document.getElementById( 'table-alumnos');

window.addEventListener('load', ()=>{

    $getAlumnos();

});


const $getAlumnos =  async()=>{

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
                            <button class="col btn btn-danger m-1">Eliminar</button>
                            <button class="col btn btn-info m-1">Agregar Grupo</button>
                        </td>
                    </tr>`;
                
                tableAlumnos.insertAdjacentHTML( 'beforeend',  table);

            });

        });
    });

};