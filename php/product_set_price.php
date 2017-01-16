<?php

include "db.php";


if (isset($_GET['productID']) && isset($_GET['productPrice']) )
 {
	 $sql = "UPDATE products SET productPrice=". $_GET['productPrice'] ." WHERE productID=". $_GET['productID'] . "";
	 if ($conn->query($sql) === TRUE) 
	    echo "success";
	  else
	    echo "Error: " . $sql . "<br>" . $conn->error;	
 }
 else
 	print_r($_GET);

?>

