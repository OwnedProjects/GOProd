<?php
ini_set('error_reporting', E_STRICT);
$action=$_GET['action'];


if($action=='filelog'){
	$data = json_decode(file_get_contents("php://input"));
	$filename = "../logs/".$data->filenm;
	//$filename = "../logs/test.txt";
	$file = fopen( $filename, "a" );
   
	if( $file == false ) {
		echo ( "Error in opening new file" );
		exit();
	}
	fwrite( $file, $data->fdata."\n" );
	fclose( $file );
	echo "file written successfully";
}
?>