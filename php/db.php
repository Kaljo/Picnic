<?php

header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Credentials: true");

$servername = "localhost";
$username = "root";
$password = "WindsorWindsor212.";
$dbname = "Picnic";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

?>

