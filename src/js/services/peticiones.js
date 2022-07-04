/**
 * archivo para peticiones fetch...
 */

const url = 'http://192.168.1.123/examen/php/functions.php';

/**
 * call carreras
 */

const carreras = async()=>{

    const resp = await fetch( `${url}?req=ca` );

    const datos = await resp.json();
    return datos;



};

const estadoCivil = async()=>{

    const resp = await fetch( `${url}?req=ec`);
    const datos = await resp.json();
    return datos;
};

const nivel = async()=>{

    const resp = await fetch( `${url}?req=ne`);
    const datos = await resp.json();
    return datos;
};

const saveData = async( alumno )=>{

    const resp = await fetch(`${url}?req=ia`, {

        method : 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body : JSON.stringify(alumno)
    });

    const datos = await resp.json();
    return datos;
    
};

const getId = async()=>{

    const resp = await fetch(`${url}?req=id`);
    const datos = resp.json();
    return datos;

};

const getAllAlumnos = async()=>{

    const resp = await fetch( `${url}?req=gal`);
    const datos = resp.json();
    return datos;
};

const deleteAlumno = async( idAlumno )=>{

    const resp = await fetch( `${url}?req=dal`, {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body : idAlumno
    });
    const datos = resp.json();
    return datos;
};

const getGrupos = async()=>{

    const resp = await fetch( `${url}?req=ggr`);
    const datos = await resp.json();
    return datos;

};


export{
    carreras,
    estadoCivil,
    nivel,
    saveData,
    getId,
    getAllAlumnos,
    deleteAlumno,
    getGrupos
}

