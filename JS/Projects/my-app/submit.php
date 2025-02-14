<?php
$servername = "localhost";
$username = "root"; // Default XAMPP username
$password = ""; // Default XAMPP password
$dbname = "my_app_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Get data from the request
$data = json_decode(file_get_contents('php://input'), true);
$name = $data['name'];
$email = $data['email'];

// Insert data into the database
$sql = "INSERT INTO users (name, email) VALUES ('$name', '$email')";
if ($conn->query($sql) === TRUE) {
  echo "Data saved successfully!";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>