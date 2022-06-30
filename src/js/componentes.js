/**
 * logica del proyecto
 */
const loadModule     = import( /*webpackChunkName: "peticiones" */ "./services/peticiones"),
      selectCarreras = document.getElementById( 'carreras' ),
      selectEstado = document.getElementById( 'estado-civil' ),
      selectNivel = document.getElementById( 'nivel' ),
      nombre = document.getElementById( 'nombre' );


let datos = {};

/**
 * functin to load combos...
 */

window.addEventListener( 'load', ()=>{

    $getCarreras();
    $getEstadoCivil();
    $getNivel();

    
});


const $getCarreras = async()=>{
    
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

    loadModule.then( module => {
        
        const estadoCivil = module.estadoCivil();

        estadoCivil.then( edo => {
            edo.forEach( ({edocivil_id, edocivil_descrip}) => {
                selectEstado.insertAdjacentHTML('beforeend', ` <option value="${edocivil_id}">${edocivil_descrip}</option>`);
            });
        })
    });
};

const $getNivel =  async()=>{

    loadModule.then( module => {
        
        const nivel = module.nivel();

        nivel.then( ni => {
            ni.forEach( ({nivel_id, nivel_descrip}) => {
                selectNivel.insertAdjacentHTML('beforeend', ` <option value="${nivel_id}">${nivel_descrip}</option>`);
            });
        })
    });


};


const sendData = () =>{

    const boton = document.getElementById( 'boton' );
    
    
    boton.addEventListener( 'click', (event)=>{

        event.preventDefault();

        const nom = nombre.value,
              car = selectCarreras.value,
              civil = selectEstado.value,
              niv = selectNivel.value; 
        
        datos = {... datos, nom, car, civil, niv};

        event.preventDefault();

    })

}

sendData();