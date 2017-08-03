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

if($action=='updateSuppliers'){
	$data = json_decode(file_get_contents("php://input"));
	$getsupplier="UPDATE `supplier_master` SET `supplier_name`= '".$data->supplier_name."' ,`vat`= '".$data->vat."' ,`prod_id`= '".$data->prod_id."' ,`contact_person`= '".$data->contact_person."' ,`city`= '".$data->city."' ,`contactno`= '".$data->contactno."' ,`address`= '".$data->address."' WHERE `supplier_id`=".$data->supplier_id;
	$updSupplier=mysql_query($getsupplier);
		if($updSupplier){
			$obj->status=true;
			header(' ', true, 200);
		}
		else{
			$obj->status=false;
			header(' ', true, 500);
		}
		echo json_encode($obj);
	}

if($action=='deactivateSuppliers') {
    $data = json_decode(file_get_contents("php://input"));
    $getSupplier="UPDATE `supplier_master` SET `supplier_status`='deactive' WHERE `supplier_id`=".$data->supplier_id;
    $deactSupplier=mysql_query($getSupplier);
    if($deactSupplier){
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