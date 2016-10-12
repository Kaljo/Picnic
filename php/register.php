<?php

include "db.php";


if (isset($_GET['EMAIL']))
 {
	 $sql = "INSERT INTO users (name,country,city,email,password,pic) VALUES ('Unknown','Unknown','Unknown','". $_GET['EMAIL'] ."','123456', '/img/user.png')";
	 if ($conn->query($sql) === TRUE) {
	    $outp = '{ "id" : "' . $conn->insert_id . '"}';
	    echo($outp);
	 } else {
	    echo "Error: " . $sql . "<br>" . $conn->error;
	}
 }
 else
 	print_r($_GET);

?>

