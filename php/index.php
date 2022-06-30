
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

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inscripcion alumnos</title>
</head>
<body>

    
</body>
</html>