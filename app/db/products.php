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
?>