<?php

include "db.php";
 

$sql = "SELECT SUM(p.productPrice) AS hasGiven, m.user_email, m.userid, m.groupid FROM members m INNER JOIN products p ON(m.userid=p.buyer_userID) WHERE m.groupid=" . $_GET['id'] . " GROUP BY(m.userid) ";
$result = $conn->query($sql);
$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"userid":"'   . $rs["userid"] . '",';
    $outp .= '"user_email":"'   . $rs["user_email"] . '",';
	$outp .= '"hasGiven":"'   . $rs["hasGiven"] . '",';
    $outp .= '"groupid":"'   . $rs["groupid"] . '"}';
       
}
$outp ='{ "records":['.$outp.'] }';
$conn->close();
echo($outp);
?>



