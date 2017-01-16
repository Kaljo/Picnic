<?php

include "db.php";


if (isset($_GET['productID']) && isset($_GET['buyer_userID']) )
 {
	 $sql = "UPDATE products SET buyer_userID=". $_GET['buyer_userID'] ." WHERE productID=". $_GET['productID'] . "";
	 if ($conn->query($sql) === TRUE) 
	    echo "success";
	  else
	    echo "Error: " . $sql . "<br>" . $conn->error;	
 }
 else
 	print_r($_GET);

?>

