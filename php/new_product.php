<?php

include "db.php";


if (isset($_GET['groupID']) && isset($_GET['productName']) )
 {
	 $sql = "INSERT INTO products(groupID,productName) VALUES (". $_GET['groupID'] .",'". $_GET['productName'] . "')";
	 if ($conn->query($sql) === TRUE) 
	    echo "sr";
	  else
	    echo "Error: " . $sql . "<br>" . $conn->error;	
 }
 else
 	print_r($_GET);

?>

