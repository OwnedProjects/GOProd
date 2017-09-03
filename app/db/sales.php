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

if($action=='addSalesBatches'){
	$data = json_decode(file_get_contents("php://input"));
	$flag = false;
	//Adding batches data to sales batch register;
	$sqlTpl = 'INSERT INTO `sales_batch_register`(`order_no`, `batch_no`) VALUES ("%s","%s")';
	foreach( $data->batchArr as $key => $value ){
		$sqlStr = sprintf( $sqlTpl , ( $data->orderNo ) , $value->batch_no );
		if( !mysql_query( $sqlStr ) ){
		  $flag = true;
		}
	}

	if($flag == false){
		$obj->status=true;
		header(' ', true, 200);
	}
	else{
		$obj->status=false;
		header(' ', true, 500);
	}
	echo json_encode($obj);
	// header(' ', true, 200);
	// echo json_encode($obj);
	// exit;
	/*$addProds="INSERT INTO `sales_master`(`order_no`, `client_id`, `sale_date`, `quantity`, `sale_status`) VALUES ('".$data->orderNo."','".$data->clientId."','".$data->orderDate."','".$data->quantity."','open')";
	$resProds=mysql_query($addProds);
	if($resProds){
		$obj->status=true;
		header(' ', true, 200);
	}
	else{
		$obj->status=false;
		header(' ', true, 500);
	}
	echo json_encode($obj);*/
}

if($action=='getOrderNoForDespatches'){
	$data = json_decode(file_get_contents("php://input"));
	$getOrders="SELECT * FROM `sales_master` WHERE `dc_no` IS NULL";
	$resOrders=mysql_query($getOrders);
	$count = mysql_num_rows($resOrders);
	if($count>0){
		$cnt=0;
		while($row = mysql_fetch_array( $resOrders )) {
			$tmpRes[$cnt]->order_no=$row['order_no'];
			$tmpRes[$cnt]->quantity=$row['quantity'];
			$cnt++;
		}
		$obj->Orders=$tmpRes;
		header(' ', true, 200);
	}
	else{
		$obj->status=false;
		header(' ', true, 500);
	}
	echo json_encode($obj);
}