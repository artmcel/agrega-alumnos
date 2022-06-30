<?php


require("./req.php");
$query = new Combos();
$carreras = $query->getCarreras();
$estadoCivil = $query->getEstadoC();
$nivelEstudios = $query->getNivel();
echo $carreras;
echo "<br>";
echo $estadoCivil;
echo "<br>";
echo $nivelEstudios;


?>