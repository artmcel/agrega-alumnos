<?php

header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

$req = $_GET['req'];
$method = $_SERVER['REQUEST_METHOD'];

$getCarreras = function(){
    require("./req.php");

    $query = new Inscripcion();
    $carreras = $query->getCarreras();
    echo json_encode($carreras);

};

$getEstadoCivil = function(){
    require("./req.php");

    $query = new Inscripcion();
    $estadoCivil = $query->getEstadoC();
    echo json_encode($estadoCivil);

};

$getNivel = function(){
    require("./req.php");

    $query = new Inscripcion();
    $nivelEstudios = $query->getNivel();
    echo json_encode($nivelEstudios);

};

$saveAlumno = function( $args = array() ){

    //print_r( $args );

    require("./req.php");
    $query = new Inscripcion();
    $guardaAlumno = $query->saveAlumno($args);
    echo json_encode($guardaAlumno);
    //return $guardaAlumno;
    
};

$lastId =  function(){
    require("./req.php");
    $query = new Inscripcion();
    $getId = $query->ultimoId();

    echo json_encode($getId);
};

$getAlumnos = function(){

    require("./req.php");
    $query = new Inscripcion();
    $getAllAlumnos = $query->getAlumnos();

    echo json_encode($getAllAlumnos);
};

$deleteAlumno = function( $idAlumno ){

    require("./req.php");
    $query = new Inscripcion();
    $deleteAlumno = $query->deleteAlumno( $idAlumno );
    echo json_encode($deleteAlumno);

};

if( $req == 'ca'){
    
    $getCarreras();
}
if( $req == 'ec'){
    
    $getEstadoCivil();
}
if( $req == 'ne'){
    
    $getNivel();
}

if( $req == 'ia' && ( ($method == 'OPTIONS') || ($method == 'POST')) ) {

    $recibeJson = json_decode(file_get_contents('php://input'), false);
    $datos = (array)$recibeJson;
    //print_r( $datos );

    $args = array(
        "idAlumno" => $datos['getId'],
        "nombre" => $datos['nom'],
        "carrera" => $datos['idCar'],
        "edocivil" => $datos['idCivil'],
        "nivel" => $datos['idNivel']
    );

    $saveAlumno( $args );

}

if( $req == 'id'){
    $lastId();
}

if( $req == 'gal'){
    $getAlumnos();
}

if( $req == 'dal'){
    $deleteAlumno();
}


?>