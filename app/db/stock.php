<?php
    ini_set('error_reporting', E_STRICT);
    include ("conn.php");
    $action=$_GET['action'];


    if($action=='getStocks'){
		$getStock="SELECT * FROM stock_master s, product_master p WHERE s.prod_id = p.prod_id";
		$resStock=mysql_query($getStock);
		$count = mysql_num_rows($resStock);
		if($count>0){
			$cnt=0;
			while($row = mysql_fetch_array ($resStock)) {
				$tmpRes[$cnt]->stock_id = $row['stock_id'];
				$tmpRes[$cnt]->prod_id = $row['prod_id'];
				$tmpRes[$cnt]->stock_avail = $row['stock_avail'];
				$tmpRes[$cnt]->prod_name =$row['prod_name'];
				$cnt++;
			}
			$obj->stocks = $tmpRes;
			header(' ', true, 200);
		}
		else{
			header(' ', true, 500);
		}
		echo json_encode($obj);
	}






?>