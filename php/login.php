<?php

include "db.php";


$sql = "SELECT id FROM users WHERE EMAIL LIKE " . $_GET['email'] . "";
$result = $conn->query($sql);
$outp = "";
if($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    $outp .= '{"id":"'   . $rs["id"] . '"}';
       
}
else{
    $outp .= '{"id":"-1"}';
       
}

$outp ='{ "records":'.$outp.'}';
$conn->close();
echo($outp);
?>
