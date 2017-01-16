
<?php

include "db.php";

if (isset($_GET['email']) && isset($_GET['password']))
 {
	$sql = "SELECT id FROM users WHERE email= '" . $_GET['email'] . "' AND password='" . $_GET['password'] . "'";
	$result = $conn->query($sql);
	$outp = "";
	if($rs = $result->fetch_array(MYSQLI_ASSOC)){
		$outp .= '{"id":"'   . $rs["id"] . '"}';
	}
	else{
		$outp .= '{"id":"-1"}';
	}	
	$outp = '{ "records":'.$outp.'}';
	$conn->close();
	echo($outp);		   
}
else print_r($_GET);

?>
