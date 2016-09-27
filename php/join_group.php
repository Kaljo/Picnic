<?php

include "db.php";

$outp = "";
if (isset($_GET['P']) && isset($_GET['GROUPID']) && isset($_GET['USERID']))
 {
 	$sql = "SELECT name FROM groups WHERE id = " . $_GET['GROUPID'] . " AND password LIKE " . $_GET['P'] . "";
	$result = $conn->query($sql); 

	if($result->num_rows > 0){
		
		 $sql = "INSERT INTO memberships (userid,groupid) VALUES ('". $_GET['USERID'] ."', '". $_GET['GROUPID'] ."')";
		 if ($conn->query($sql) === TRUE) {
		 	$outp .= '{"ok":"1"}';	    
		 } 
		 else
		 	$outp .= '{"ok":"2"}';
		 
	}
	else{
		$outp .= '{"ok":"0"}';
	}
		
	
 }

 $outp = '{"records":'.$outp.'}';
 echo $outp;

$conn->close();

?>



