<?php
ini_set('error_reporting', E_STRICT);
include ("conn.php");
$action=$_GET['action'];

if($action=='addNewOrder'){
	$data = json_decode(file_get_contents("php://input"));
	$addProds="INSERT INTO `sales_master`(`order_no`, `client_id`, `sale_date`, `quantity`, `sale_status`) VALUES ('".$data->orderNo."','".$data->clientId."','".$data->orderDate."','".$data->quantity."','open')";
	$resProds=mysql_query($addProds);
	if($resProds){
		$obj->status=true;
		header(' ', true, 200);
	}
	else{
		$obj->status=false;
		header(' ', true, 500);
	}
	echo json_encode($obj);
}