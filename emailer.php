<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

  $name = sanitize($_POST['name']);
  $email = sanitize($_POST['email']);
  $ws13 = sanitize($_POST['ws13']);
  $ws14 = sanitize($_POST['ws14']);
  $description = sanitize($_POST['description']);
  $experience = sanitize($_POST['experience']);

  if (strlen($name) == 0 or strlen($email) == 0) {
    header("Location: ../articles/deny_form.html");
    exit;
  }
  
  $email_to = "signup@glesaaen.com";

  $header = "New Signup from " . $name;

  $body = "Name: " . $name . "\n" 
    . "Email: " . $email . "\n"
    . "WS13: " . $ws13 . ", WS14: " . $ws14 . "\n"
    . "Description: " . $description . "\n"
    . "Experience: \n\n" . $experience . "\n";

  mail($email_to, $header, $body);
  header("Location: ../articles/accept_form.html");
}

function sanitize($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

?>
