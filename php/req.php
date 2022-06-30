<?php
/* work
*/

abstract class Connection{

    public $conn;

    public function __construct(){
        
        try {
            $this->conn = new PDO("sqlsrv:Server=192.168.1.34;Database=Alumnos", "examen", "examen" );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
        } catch (\Throwable $th) {
            throw $th;
        }

        return $this->conn;
    }

}

class Inscripcion extends Connection{

    public function getCarreras(){
        
        $query = "SELECT * FROM  carreras";
        
        $getAlumnos = $this->conn->prepare( $query );
        $getAlumnos->execute();
        
        $alumnos = $getAlumnos->fetchAll(PDO::FETCH_ASSOC);
        //print_r( $alumnos );
        return $alumnos;
        
    }

    public function getEstadoC(){

        $query = "SELECT *  FROM cat_estado_civil";

        $getEstado = $this->conn->prepare( $query );
        $getEstado->execute();

        $estadoCivil = $getEstado->fetchAll(PDO::FETCH_ASSOC);
        return $estadoCivil;

    }

    public function getNivel(){

        $query = "SELECT *  FROM cat_nivel_estudios";

        $getNivel = $this->conn->prepare( $query );
        $getNivel->execute();

        $nivelEstudios = $getNivel->fetchAll(PDO::FETCH_ASSOC);
        return $nivelEstudios;

    }

    
}



?>