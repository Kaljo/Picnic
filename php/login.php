<?php

include "db.php";

if (isset($_GET['EMAIL'])){
	$sql = "SELECT id FROM users WHERE EMAIL = '" . $_GET['EMAIL'] . "'";
	$result = $conn->query($sql);
	$outp = "";
	if($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    $outp .= '{"id":"'   . $rs["id"] . '"}';
	       
	}
	else{
	    $outp .= '{"id":"-1"}';
	       
	}

	$outp ='{ "records":'.$outp.'}';
	$conn->close();
	echo($outp);
	//echo($sql);
}
?>
