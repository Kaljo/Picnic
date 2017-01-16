<?php

include "db.php";
 

$sql = "SELECT pic, email FROM users WHERE id=" . $_GET['id'] . "";
$result = $conn->query($sql);
$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"pic":"'   . $rs["pic"] . '",';
    $outp .= '"email":"'   . $rs["email"] . '"}';
       
}
$outp ='{ "records":'.$outp.'}';
$conn->close();
echo($outp);
?>



