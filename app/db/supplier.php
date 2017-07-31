<?php
ini_set('error_reporting', E_STRICT);
include ("conn.php");
$action=$_GET['action'];

/* Supplier Master */
    if($action =='addSupplier'){
        $data = json_decode(file_get_contents("php://input"));
        $insSupplier = "INSERT INTO `supplier_master`(`supplier_name`,`vat`, `prod_id`, `contact_person`, `city`, `contactno`, `address`, `supplier_status`) VALUES ('".$data->name."','".$data->vat."','".$data->prodid."','".$data->contactperson."','".$data->city."','".$data->contactno."','".$data->address."','active')";
        $resSupplier = mysql_query($insSupplier);
        exit;
        if($resSupplier){
            $obj->status=true;
            header(' ', true, 200);
        }
        else{
            $obj->status=false;
            header(' ', true, 500);
        }
        echo json_encode($obj);
    }


    if($action =='getSupplier'){
        $data = json_decode(file_get_contents("php://input"));
		$getSupplier="SELECT * FROM `supplier_master` WHERE `supplier_status` = 'active'";
		$resSupplier=mysql_query($getSupplier);
		$count = mysql_num_rows($resSupplier);
		if($count>0){
			$cnt=0;
			while($row = mysql_fetch_array( $resSupplier )) {
				$tmpRes[$cnt]->client_id=$row['supplier_id'];
				$tmpRes[$cnt]->supplier_name=$row['supplier_name'];
				$tmpRes[$cnt]->vat=$row['vat'];
				$tmpRes[$cnt]->prod_id=$row['prod_id'];
				$tmpRes[$cnt]->contact_person=$row['contact_person'];
				$tmpRes[$cnt]->city=$row['city'];
				$tmpRes[$cnt]->contactno=$row['contactno'];
				$tmpRes[$cnt]->address=$row['address'];
				$cnt++;
			}
			$obj->Supplier = $tmpRes;
			header(' ', true, 200);
        }
        else{
            $obj->status=false;
            header(' ', true, 500);
        }
        echo json_encode($obj);
    }


?>