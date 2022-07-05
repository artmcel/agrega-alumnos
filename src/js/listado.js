import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@popperjs/core';

const loadModule   = import( /*webpackChunkName: "peticiones" */ "./services/peticiones"),
      tableAlumnos =  document.getElementById( 'table-alumnos'),
      selectGrupo  = document.getElementById('grupo'),
      inputId      = document.getElementById('idAlumno'),
      botonAgregar = document.getElementById('agregar');

let btnEliminar = '';


const $getAlumnos = async()=>{

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
                            <button id="agregaGrupoAlumno" class="col btn btn-info m-1" data-bs-toggle="modal" data-bs-target="#agregaGrupo" value="${alumno_id}">Agregar Grupo</button>
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

};
window.addEventListener('load', $getAlumnos());


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

const $getGrupos = async()=>{

    loadModule.then( module =>{
        
        const grupos = module.getGrupos();
        grupos.then( grupo => {

            grupo.forEach( ({grupo_id, grupo_descripcion}) => {

                selectGrupo.insertAdjacentHTML('beforeend', `<option value="${grupo_id}">${grupo_descripcion}</option>`)

            });

        }).then( ()=>{
            let botonAgregraGrupo = document.querySelectorAll('#agregaGrupoAlumno');

            botonAgregraGrupo.forEach( boton =>{

                boton.addEventListener( 'click', ()=>{
                    //console.log(boton.value);
                    inputId.setAttribute('value', boton.value);
                })

            });
        });

    });
};

$getGrupos();

botonAgregar.addEventListener('click', ()=>{

    let grupo = {},
        idGr = selectGrupo.value,
        idAl = inputId.value,
        idGrupo = parseInt(idGr),
        idAlumno = parseInt(idAl),
        guardaGrupo = {...grupo, idGrupo, idAlumno};

        //console.log( guardaGrupo);

    loadModule.then( module=> {

        const agregaGrupo = module.addGrupo( guardaGrupo ) ;

        agregaGrupo.then( grupo =>{

            //console.log( grupo );
            if( grupo.result === true){
                alert( 'grupo añadido correctamente');
            }else{
                alert('hubo un error');
            }

        });
    });

});

