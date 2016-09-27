<?php

include "db.php";


$sql = "SELECT group_name, date, groupid, userid, user_email FROM members WHERE userid= " . $_GET['id'] . " AND date>NOW() ORDER BY date ASC";
$result = $conn->query($sql);
$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"group_name":"'   . $rs["group_name"] . '",';
    $outp .= '"date":"'   . $rs["date"] . '",';
    $outp .= '"groupid":"'   . $rs["groupid"] . '",';
    $outp .= '"userid":"'   . $rs["userid"] . '",';
    $outp .= '"user_email":"'   . $rs["user_email"] . '"}';

       
}
$outp ='{ "records":[ '.$outp.' ]}';
$conn->close();
echo($outp);
?>

