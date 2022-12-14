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

    public function ultimoId(){

        $query = "SELECT TOP 1 * FROM Alumnos ORDER BY alumno_id DESC";
        $getId = $this->conn->prepare( $query );
        $getId->execute();

        $lastId = $getId->fetchAll(PDO::FETCH_ASSOC);
        return $lastId;
    }

    public function getAlumnos(){

        $query = "SELECT * FROM Alumnos";
        $getAlum = $this->conn->prepare( $query );
        $getAlum->execute();

        $alumnos = $getAlum->fetchAll(PDO::FETCH_ASSOC);
        return $alumnos;

    }

    public function deleteAlumno( $idAlumno ){

        $query = "DELETE FROM Alumnos WHERE Alumno_id = ? ";
        $deleteAlumno = $this->conn->prepare( $query );
        $delete =  $deleteAlumno->execute([$idAlumno]);

        if( $delete ){
            return ["result" => true ];
        }else {
            return ["result" => false];
        } 
    }

    public function getGrupos(){

        $query = "SELECT * FROM grupos";
        $getGrupos = $this->conn->prepare( $query );
        $getGrupos->execute();

        $grupos = $getGrupos->fetchAll(PDO::FETCH_ASSOC);
        return $grupos;
    }

    public function addGrupoAlumno( $args = array() ){

        $idGrupo = $args['idGrupo'];
        $idAlumno = $args['idAlumno'];

        //return [ $idGrupo ];

        $query = "INSERT INTO Alumnos.dbo.listas (grupo_id, alumno_id) VALUES (?, ?)";
        $insertListas = $this->conn->prepare( $query );
        $exe =  $insertListas->execute( [$idGrupo, $idAlumno]);

        if($exe){
            return ["result" => true];
        }else {
            return ["result" => false];
        }

    }

    /**
     * query to get grupo segun el id del alumno
     * Select grupo_descripcion, nombre from Alumnos.dbo.Alumnos, Alumnos.dbo.listas, Alumnos.dbo.grupos where listas.grupo_id = grupos.grupo_id  and listas.alumno_id = Alumnos.alumno_id;
     */
}



?>