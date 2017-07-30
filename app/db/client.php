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
			header(' ', true, 200);
		}
		else{
			$obj->status=false;
			header(' ', true, 500);
		}
		echo json_encode($obj);
	}
	

if($action=='getClients'){
		$getClients="SELECT * FROM `Client_master` WHERE `client_status` = 'active'";
		$resClients=mysql_query($getClients);
		$count = mysql_num_rows($resClients);
		if($count>0){
			$cnt=0;
			while($row = mysql_fetch_array( $resClients )) {
				$tmpRes[$cnt]->client_id=$row['client_id'];
				$tmpRes[$cnt]->client_name=$row['client_name'];
				$tmpRes[$cnt]->address=$row['address'];
				$tmpRes[$cnt]->city=$row['city'];
				$tmpRes[$cnt]->state=$row['state'];
				$tmpRes[$cnt]->contact_no=$row['contact_no'];
				$tmpRes[$cnt]->contact_person=$row['contact_person'];
				$tmpRes[$cnt]->vat_no=$row['vat_no'];
				$cnt++;
			}
			$obj->Clients = $tmpRes;
			header(' ', true, 200);
		}
		else{
			header(' ', true, 500);
		}
		echo json_encode($obj);
	}

	//UPDATE `Client_master` SET `client_status`='active' WHERE `client_id` = 2

if($action=='updateClient'){
		$data = json_decode(file_get_contents("php://input"));
		$insClients="UPDATE `Client_master` SET `client_name`='".$data->client_name."',`address`='".$data->address."',`city`='".$data->city."',`state`='".$data->state."',`contact_no`='".$data->contact_no."',`contact_person`='".$data->contact_person."',`vat_no`='".$data->vat_no."' WHERE `client_id`=".$data->client_id;
		$resClients=mysql_query($insClients);
		if($resClients){
			$obj->status=true;
			header(' ', true, 200);
		}
		else{
			$obj->status=false;
			header(' ', true, 500);
		}
		echo json_encode($obj);
	}

if($action=='deactivateClient'){
		$data = json_decode(file_get_contents("php://input"));
		$insClients="UPDATE `Client_master` SET `client_status`='deactive' WHERE `client_id`=".$data->client_id;
		$resClients=mysql_query($insClients);
		if($resClients){
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

