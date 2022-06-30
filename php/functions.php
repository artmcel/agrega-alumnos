<?php


require("./req.php");


$getCarreras = function(){

    $query = new Combos();
    $carreras = $query->getCarreras();
    return $carreras;

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


?>