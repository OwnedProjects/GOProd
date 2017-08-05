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



if($action=='getdeactiveSupplier'){
		$getSup="SELECT * FROM `supplier_master` s, `product_master` p WHERE s.prod_id=p.prod_id AND s.supplier_status='deactive'";
		$resSup=mysql_query($getSup);
		$count = mysql_num_rows($resSup);
		if($count>0){
			$cnt=0;
			while($row = mysql_fetch_array( $resSup )) {
                $tmpRes[$cnt]->supplier_id=$row['supplier_id'];
                $tmpRes[$cnt]->supplier_name=$row['supplier_name'];
                $tmpRes[$cnt]->vat=$row['vat'];
                $tmpRes[$cnt]->prod_id=$row['prod_id'];
                $tmpRes[$cnt]->prod_name=$row['prod_name'];
                $tmpRes[$cnt]->contact_person=$row['contact_person'];
                $tmpRes[$cnt]->city=$row['city'];
                $tmpRes[$cnt]->contactno=$row['contactno'];
                $tmpRes[$cnt]->address=$row['address'];
				$cnt++;
			}
			$obj->DSupplier = $tmpRes;
			header(' ', true, 200);
		}
		else{
			header(' ', true, 500);
		}
		echo json_encode($obj);
	}


if($action=='activateSupplier'){
    $data = json_decode(file_get_contents("php://input"));
    $getSupplier="UPDATE `supplier_master` SET `supplier_status`= 'active' WHERE `supplier_id`=".$data->supplier_id;
    $actSupplier=mysql_query($getSupplier);
    if($actSupplier){
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