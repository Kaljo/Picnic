<?php

include "db.php";


$sql = "SELECT id, name FROM groups WHERE name LIKE = '%" . $_GET['search'] . "%'";
$result = $conn->query($sql);
$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"id":"'   . $rs["id"] . '",';
    $outp .= '"name":"'   . $rs["name"] . '"}';
       
}
$outp ='{ "records":'.$outp.'}';
$conn->close();
echo($outp);
?>



