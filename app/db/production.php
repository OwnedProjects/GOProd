<?php
ini_set('error_reporting', E_STRICT);
include ("conn.php");
$action=$_GET['action'];

if($action=='addNewBatch'){
	$data = json_decode(file_get_contents("php://input"));
	$insBatch="INSERT INTO `production_batch_master`(`batch_no`, `bags`, `echomeal`, `prod_date`, `batch_status`) VALUES ('".$data->batchno."','".$data->bags."','".$data->echomeal."','".$data->prod_date."','open')";
	$resBatch=mysql_query($insBatch);

    $selBatchId = "SELECT MAX(`batch_id`) FROM `production_batch_master`";
    $resBatchId=mysql_query($selBatchId);
    $rowBatchId = mysql_fetch_array($resBatchId,MYSQL_BOTH);

	$insRegis="INSERT INTO `production_batch_register`(`prod_id`, `quantity`, `batch_id`) VALUES ('1','".$data->fp."','".$rowBatchId['MAX(`batch_id`)']."'), ('2','".$data->rom."','".$rowBatchId['MAX(`batch_id`)']."'), ('3','".$data->shw."','".$rowBatchId['MAX(`batch_id`)']."'), ('4','".$data->awf."','".$rowBatchId['MAX(`batch_id`)']."')";
	$resRegis=mysql_query($insRegis);

	if($resBatch && $resBatchId && $resRegis){
		$obj->status=true;
		header(' ', true, 200);
	}
	else{
		$obj->status=false;
		header(' ', true, 500);
	}
	echo json_encode($obj);
}

if($action=='getOpenProductionBatches'){
	$data = json_decode(file_get_contents("php://input"));
	$getBatches="SELECT * FROM `production_batch_master` WHERE `batch_status`='open'";
	$retBatches=mysql_query($getBatches);
	$count = mysql_num_rows($retBatches);
	if($count>0){
		$cnt=0;
		while($row = mysql_fetch_array( $retBatches )) {
			$tmpRes[$cnt]->batch_id=$row['batch_id'];
			$tmpRes[$cnt]->batch_no=$row['batch_no'];
			$tmpRes[$cnt]->bags=$row['bags'];
			$tmpRes[$cnt]->echomeal=$row['echomeal'];
			$tmpRes[$cnt]->prod_date=$row['prod_date'];
			$cnt++;
		}
		$obj->Batches=$tmpRes;
		header(' ', true, 200);
	}
	else{
		$obj->status=false;
		header(' ', true, 500);
	}
	echo json_encode($obj);
}
?>