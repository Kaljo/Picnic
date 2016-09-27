<?php

include "db.php";


if (isset($_GET['id']))
 {
	 $sql = "DELETE FROM users WHERE id= " . $_GET['id'] . "";
	 if ($conn->query($sql) === TRUE) {
	    echo "Record removed successfully" . $sql . "";
	 } else {
	    echo "Error: " . $sql . "<br>" . $conn->error;
	}
 }
 else
 	print_r($_GET);

?>

