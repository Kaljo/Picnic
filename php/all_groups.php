<?php

include "db.php";

$sql = "SELECT name,id FROM groups";
$result = $conn->query($sql);
$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"name":"'   . $rs["name"] . '",';
    $outp .= '"id":"'   . $rs["id"] . '"}';

       
}
$outp ='{ "records":[ '.$outp.' ]}';
$conn->close();
echo($outp);
?>

