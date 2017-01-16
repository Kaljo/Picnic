<?php

include "db.php";


if (isset($_GET['EMAIL']) && isset($_GET['EMAIL']))
 {
	 $sql = "INSERT INTO users (name,country,city,email,password,pic) VALUES ('Unknown','Unknown','Unknown','". $_GET['EMAIL'] ."','". $_GET['password'] ."', '/img/user.png')";
	 if ($conn->query($sql) === TRUE) {
	    $outp = '{ "id" : "' . $conn->insert_id . '"}';
		$outp = '{"records":'.$outp.'}';
 		echo $outp;
	 } else {
	    echo "Error: " . $sql . "<br>" . $conn->error;
	}
 }
 else{
	 echo "Error: Empty field.";
 }
 
?>


