<?php

include "db.php";


if (isset($_GET['name']) && isset($_GET['password']) && isset($_GET['userid'])  && isset($_GET['location']) && isset($_GET['date']) && isset($_GET['description']) )
 {
	 $sql = "INSERT INTO groups (name,password,location,date,description) VALUES ('". $_GET['name'] ."','". $_GET['password'] ."','". $_GET['location'] ."','". $_GET['date'] ."','". $_GET['description'] ."')";
	 if ($conn->query($sql) === TRUE) {
	    echo "";
	 } else {
	    echo "Error: " . $sql . "<br>" . $conn->error;
	}

	$sql = "INSERT INTO memberships (userid,groupid,admin) VALUES ('". $_GET['userid'] ."', (SELECT MAX(ID) FROM groups), 1)";
	if ($conn->query($sql) === TRUE) {

		$sql = "SELECT MAX(ID) AS id FROM groups";
		$result = $conn->query($sql);
		$outp = "";
		while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
		    if ($outp != "") {$outp .= ",";}
		    $outp .= '{"id":"'   . $rs["id"] . '"}';
	       
	}
	$outp = '{ "records":'.$outp.'}';
	echo($outp);

	} else {
		 echo "Error: " . $sql . "<br>" . $conn->error;
	}	 
 }
 else
 	print_r($_GET);

?>

