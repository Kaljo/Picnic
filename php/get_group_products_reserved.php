<?php

include "db.php";
 

$sql = "SELECT buyer_userid, email, productName, productPrice, productID FROM products p INNER JOIN users u ON(p.buyer_userid=u.id) WHERE groupid=" . $_GET['groupid'] . " AND buyer_userid IS NOT NULL";
$result = $conn->query($sql);
$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"buyer_userid":"'   . $rs["buyer_userid"] . '",';
	$outp .= '"productName":"'   . $rs["productName"] . '",';
	$outp .= '"productPrice":"'   . $rs["productPrice"] . '",';
	$outp .= '"email":"'   . $rs["email"] . '",';
	$outp .= '"productID":"'   . $rs["productID"] . '"}';
       
}
$outp ='{ "records":[ '.$outp.' ]}';
$conn->close();
echo($outp);
?>



