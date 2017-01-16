<?php

include "db.php";
 

$sql = "SELECT buyer_userid, productName, productPrice, productID FROM products WHERE groupid=" . $_GET['groupid'] . " AND buyer_userid IS NULL";
$result = $conn->query($sql);
$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"buyer_userid":"'   . $rs["buyer_userid"] . '",';
	$outp .= '"productName":"'   . $rs["productName"] . '",';
	$outp .= '"productPrice":"'   . $rs["productPrice"] . '",';
	$outp .= '"productID":"'   . $rs["productID"] . '"}';
       
}
$outp ='{ "records":[ '.$outp.' ]}';
$conn->close();
echo($outp);
?>



