<?php

include "db.php";

$sql = "SELECT id,email,password,name,city,country,pic FROM users";
$result = $conn->query($sql);
$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"id":"'   . $rs["id"] . '",';
    $outp .= '"email":"'  . $rs["email"] . '",';
    $outp .= '"password":"'   . $rs["password"] . '",'; 
    $outp .= '"name":"'  . $rs["name"] . '",';
    $outp .= '"city":"'   . $rs["city"] . '",';
    $outp .= '"country":"'  . $rs["country"] . '",';
    $outp .= '"pic":"'   . $rs["pic"] . '"}';
       
}
$outp ='{ "records":[ '.$outp.' ]}';
$conn->close();
echo($outp);
?>

