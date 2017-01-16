<?php

include "db.php";
 

$sql = "SELECT name, location, description, date FROM groups WHERE id=" . $_GET['id'] . "";
$result = $conn->query($sql);
$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"name":"'   . $rs["name"] . '",';
    $outp .= '"location":"'   . $rs["location"] . '",';
	$outp .= '"description":"'   . $rs["description"] . '",';
    $outp .= '"date":"'   . $rs["date"] . '"}';
       
}
$outp ='{ "records":'.$outp.'}';
$conn->close();
echo($outp);
?>



