/**
 * logica del proyecto
 */
const loadModule     = import( /*webpackChunkName: "peticiones" */ "./services/peticiones"),
      selectCarreras = document.getElementById( 'carreras' ),
      selectEstado = document.getElementById( 'estado-civil' ),
      selectNivel = document.getElementById( 'nivel' ),
      nombre = document.getElementById( 'nombre' ),
      boton = document.getElementById( 'boton' ),
      inputId =  document.getElementById( 'id' );


let datos = {};

/**
 * functin to load combos...
 */

window.addEventListener( 'load', ()=>{

    $getCarreras();
    $getEstadoCivil();
    $getNivel();
    $getId();
    
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

boton.addEventListener( 'click', (event)=>{

    event.preventDefault();

    const nom = nombre.value,
          car = selectCarreras.value,
          civil = selectEstado.value,
          niv = selectNivel.value,
          getId = inputId.value;

          const idCar = parseInt( car ),
          idCivil = parseInt( civil ),
          idNivel =parseInt(niv);

    datos = {... datos, getId, nom, idCar, idCivil, idNivel};
    //datos = { ...datos, getId, nom, car, civil, niv};

    $guardaAlumno( datos );

    
});


const $guardaAlumno = async( datosAlumno )=>{
    
    await loadModule.then( module => {
        
        const guardar = module.saveData( datosAlumno );
        guardar.then( guarda => {

            if(guarda.result === true ){

                alert('registro exitoso');
            }else {

                alert(' fallo registro')
                window.location.href = "./";
            }

        });


    });


};

const $getId = async()=>{

    loadModule.then( module => {

        const id = module.getId();
        id.then( data => {

            data.forEach( ({alumno_id}) => {

                let setId = alumno_id;
                parseInt(setId);
                setId++;
                inputId.setAttribute('value', `${setId}`);
            })


        });
    });

};