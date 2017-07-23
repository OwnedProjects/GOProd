<?php
ini_set('error_reporting', E_STRICT);
include ("conn.php");
$action=$_GET['action'];

/* Supplier Master */
    if($action =='addSupplier'){
        $data = json_decode(file_get_contents("php://input"));
        $insSupplier = "INSERT INTO `supplier_master`(`supplier_name`,`vat`, `product`, `contact_person`, `city`, `contactno`, `address`, `supplier_status`) VALUES ('".$data->name."','".$data->vat."','01','".$data->contactperson."','".$data->city."','".$data->contactno."','".$data->address."','active')";
        $resSupplier = mysql_query($insSupplier);
        exit;
        if($resSupplier){
            $obj->status=true;
        }
        else{
            $obj->status=false;
        }
        echo json_encode($obj);
    }
?>