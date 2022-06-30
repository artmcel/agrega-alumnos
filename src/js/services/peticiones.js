/**
 * archivo para peticiones fetch...
 */

const url = `http://192.168.1.123/examen/php/functions`;

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


export{
    carreras,
    estadoCivil,
    nivel
}

