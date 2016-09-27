<?php

include "db.php";

if (isset($_GET['RECEIVER_ID']))
 {
 	$sql = "SELECT notification_id,type,money_amount,sender_email,group_name FROM notify WHERE receiver_id = " . $_GET['RECEIVER_ID'] . "";
	$result = $conn->query($sql);
	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	    if ($outp != "") {$outp .= ",";}
	    $outp .= '{"type":"'   . $rs["type"] . '",';
	    $outp .= '"notification_id":"'  . $rs["notification_id"] . '",';
	    $outp .= '"money_amount":"'  . $rs["money_amount"] . '",';
	    $outp .= '"sender_email":"'   . $rs["sender_email"] . '",'; 
	    $outp .= '"group_name":"'  . $rs["group_name"] . '"}';
	       
	}
	$outp ='{ "records":[ '.$outp.' ]}';
	$conn->close();
	echo($outp);
 }
?>



