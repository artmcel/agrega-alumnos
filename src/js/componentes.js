/**
 * logica del proyecto
 */
const loadModule     = import( /*webpackChunkName: "peticiones" */ "./services/peticiones");

/**
 * functin to load combos...
 */

window.addEventListener( 'load', ()=>{

    $getCarreras();

    
});


const $getCarreras = async()=>{
    const selectCarreras = document.getElementById( 'carreras' );
    
    loadModule.then( module => {
    
        const carreras = module.carreras();
    
        carreras.then( carrera => {
            carrera.forEach( ({carrera_id, carrera_descripcion}) => {
                selectCarreras.insertAdjacentHTML('beforeend', `<option value="${carrera_id}">${carrera_descripcion}</option>`);
            })
        });
    });
    
};

const $getEstadoCivil =  async()=>{

    const selectEstado = document.getElementById( 'estado-civil' );

    loadModule.then( module => {
        
        const estadoCivil = module.estadoCivil();

        estadoCivil.then( edo => {
            edo.forEach( ({edocivil_id, edocivil_descrip}) => {
                selectEstado.insertAdjacentHTML('beforeend', ` <option value="${edocivil_id}">${edocivil_descrip}</option>`);
            });
        })
    });
};