<?php
    ini_set('error_reporting', E_STRICT);
    include ("conn.php");
    $action=$_GET['action'];

    
if($action=='getUsers'){
    $data = json_decode(file_get_contents("php://input"));
    $insUsers="SELECT `fullname` FROM `user_master` WHERE `username`='".$data->username."' AND `password`='".$data->password."'";
    $resUsers=mysql_query($insUsers);
    $rowUsers = mysql_fetch_array($resUsers,MYSQL_BOTH);
    if($resUsers){
        if($rowUsers['fullname'] != null){
            $obj->user = $rowUsers['fullname'];
            $obj->status = true;
            header(' ', true, 200);
        }
        else{
            $obj->status = false;
            header(' ', true, 500);    
        }
    }
    else{
		$obj->status = false;
		header(' ', true, 500);
    }
	echo json_encode($obj);
}


?>