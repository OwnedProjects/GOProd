<?php
    ini_set('error_reporting', E_STRICT);
    include ("conn.php");
    $action=$_GET['action'];

    
if($action=='getClients'){
    $getClients="SELECT * FROM `Client_master` WHERE `client_status` = 'active'";
    $resClients=mysql_query($getClients);
    $count = mysql_num_rows($resClients);
}








?>