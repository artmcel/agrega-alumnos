<?php
/* work
*/

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "OPTIONS") {
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
    header("HTTP/1.1 200 OK");
    die();
}

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

    public function saveAlumno( $args = array() ){
        //return print_r( $args);

        $idAlumno = $args['idAlumno'];
        $nombre = $args['nombre'];
        $idCarrera = $args['carrera'];
        $idEstado = $args['edocivil'];
        $idNivel = $args['nivel'];

        $this->conn = parent::__construct();

        $query = "INSERT INTO Alumnos.dbo.Alumnos (alumno_id, nombre, carrera_id, edocivil_id, nivel_id) VALUES (?, ?, ?, ?, ?)";

        //$this->conn->prepare( $query )->execute( [ $args['nombre'], $args['carrera'], $args['edocivil'], $args['nivel'] ] );
        $params = array($nombre, $idCarrera, $idEstado, $idNivel);
        $pre = $this->conn->prepare( $query );
        $ex =  $pre->execute( [$idAlumno, $nombre, $idCarrera, $idEstado, $idNivel] );

        if($ex){
            return ["result" => true];
        }else {
            return ["result" => false];
        }

        //if( !$args ) throw 'argumentos vacios';


    }

    public function ultimoId (){

        $query = "SELECT TOP 1 * FROM Alumnos ORDER BY alumno_id DESC";
        $getId = $this->conn->prepare( $query );
        $getId->execute();

        $lastId = $getId->fetchAll(PDO::FETCH_ASSOC);
        return $lastId;
    }

    
}



?>