<?php

include "db.php";
 

$sql = "SELECT userid, user_email FROM members WHERE groupid=" . $_GET['groupid'] . " AND admin=1";
$result = $conn->query($sql);
$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"userid":"'   . $rs["userid"] . '",';
    $outp .= '"user_email":"'   . $rs["user_email"] . '"}';
       
}
$outp ='{ "records":'.$outp.'}';
$conn->close();
echo($outp);
?>



