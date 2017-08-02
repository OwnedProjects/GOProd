<?php
ini_set('error_reporting', E_STRICT);
include ("conn.php");
$action=$_GET['action'];

/* Products Master */
if($action=='getProducts'){
	$getProds="SELECT * FROM `product_master`";
	$resProds=mysql_query($getProds);
	$count = mysql_num_rows($resProds);
	if($count>0){
		$cnt=0;
		while($row = mysql_fetch_array( $resProds )) {
			$tmpRes[$cnt]->prod_id=$row['prod_id'];
			$tmpRes[$cnt]->prod_name=$row['prod_name'];
			$cnt++;
		}
		$obj->Products=$tmpRes;
		header(' ', true, 200);
	}
	else{
		header(' ', true, 500);
	}
	echo json_encode($obj);
}

if($action=='updateProduct'){
	$data = json_decode(file_get_contents("php://input"));
	$getProds="UPDATE `product_master` SET `prod_name`='".$data->prod_name."' WHERE `prod_id`=".$data->prod_id;
	$resProds=mysql_query($getProds);
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

if($action=='getSupplierWithProducts'){
	$data = json_decode(file_get_contents("php://input"));
	$getSupProds="SELECT * FROM `supplier_master` s, `product_master` p WHERE s.prod_id=p.prod_id AND s.supplier_status='active'";
	$resSupProds=mysql_query($getSupProds);
	$count = mysql_num_rows($resSupProds);
	if($count>0){
		$cnt=0;
		while($row = mysql_fetch_array( $resSupProds )) {
			$tmpRes[$cnt]->supplier_id=$row['supplier_id'];
			$tmpRes[$cnt]->supplier_name=$row['supplier_name'];
			$tmpRes[$cnt]->prod_id=$row['prod_id'];
			$tmpRes[$cnt]->prod_name=$row['prod_name'];
			$tmpRes[$cnt]->vat=$row['vat'];
			$tmpRes[$cnt]->contact_person=$row['contact_person'];
			$tmpRes[$cnt]->city=$row['city'];
			$tmpRes[$cnt]->contactno=$row['contactno'];
			$tmpRes[$cnt]->address=$row['address'];
			$cnt++;
		}
		$obj->SupProd=$tmpRes;
		header(' ', true, 200);
	}
	else{
		header(' ', true, 500);
	}
	echo json_encode($obj);
}

if($action=='addNewProduct'){
	$data = json_decode(file_get_contents("php://input"));
	$addProds="INSERT INTO `purchase_master`(`supplier_id`, `purchase_date`, `bill_date`, `bill_no`, `lorry_no`, `weight`, `rate`, `lorryfreight`) VALUES ('".$data->supplier_id."','".$data->purchase_date."','".$data->bill_date."','".$data->billno."','".$data->lorryNo."','".$data->weight."','".$data->rate."','".$data->lorryfreight."')";
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

if($action=='getLorries'){
	$getLorries="SELECT DISTINCT(`lorry_no`) FROM `purchase_master`";
	$reslorry=mysql_query($getLorries);
	$count = mysql_num_rows($reslorry);
	if($count>0){
		$cnt=0;
		while($row = mysql_fetch_array( $reslorry )) {
			$tmpRes[$cnt]->lorry_no=$row['lorry_no'];
			$cnt++;
		}
		$obj->Lorries=$tmpRes;
		header(' ', true, 200);
	}
	else{
		$obj->status=false;
		header(' ', true, 500);
	}
	echo json_encode($obj);
}
?>