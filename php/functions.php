<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
header('Content-Type: application/json');

$req = $_GET['req'];

require("./req.php");


$getCarreras = function(){

    $query = new Combos();
    $carreras = $query->getCarreras();
    echo json_encode($carreras);

};

$getEstadoCivil = function(){

    $query = new Combos();
    $estadoCivil = $query->getEstadoC();
    return $estadoCivil;

};

$getNivel = function(){

    $query = new Combos();
    $nivelEstudios = $query->getNivel();
    return $nivelEstudios;

};

if( $req == 'ca') $getCarreras();
if( $req == 'ec') $getEstadoCivil();
if( $req == 'ne') $getNivel();



?>