<?php

include "db.php";


if (isset($_GET['EMAIL']))
 {
	 $sql = "INSERT INTO users (name,country,city,email,password,pic) VALUES ('Unknown','Unknown','Unknown','". $_GET['EMAIL'] ."','123456', '/img/user.png')";
	 if ($conn->query($sql) === TRUE) {
	    echo "New record created successfully" . $sql . "";
	 } else {
	    echo "Error: " . $sql . "<br>" . $conn->error;
	}
 }
 else
 	print_r($_GET);

?>

