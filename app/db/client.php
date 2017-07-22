<?php
ini_set('error_reporting', E_STRICT);
include ("conn.php");
$action=$_GET['action'];

/* Client Master */
if($action=='addClient'){
		$data = json_decode(file_get_contents("php://input"));
		$insClients="INSERT INTO `client_master`(`client_name`, `address`, `city`, `state`, `contact_no`, `contact_person`, `vat_no`, `client_status`) VALUES ('".$data->name."','".$data->address."','".$data->city."','".$data->state."','".$data->contactno."','".$data->contactperson."','".$data->vat."','active')";
		$resClients=mysql_query($insClients);
		if($resClients){
			$obj->status=true;
			var_dump(http_response_code(200));
		}
		else{
			$obj->status=false;
			var_dump(http_response_code(500));
		}
		echo json_encode($obj);
	}
?>