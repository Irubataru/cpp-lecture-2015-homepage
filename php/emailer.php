<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

  $name = sanitize($_POST['name']);
  $email = sanitize($_POST['email']);
  $ws13 = sanitize($_POST['ws13']);
  $ws14 = sanitize($_POST['ws14']);
  $description = sanitize($_POST['description']);
  $experience = sanitize($_POST['experience']);

  if ( empty($name) or empty($email) ) {
    header("Location: ../articles/deny_form.html");
    exit;
  }
  
  $email_to = "signup@glesaaen.com";

  $header = "New Signup from " . $name;

  $description_array = array(
    "1" => "I have no experience with programming of any form",
    "2" => "I have some experience with scripting languages",
    "3" => "I have some experience with compiled languages",
    "4" => "I am experienced with procedural programming",
    "5" => "I am an experienced programmer, but am not proficient in C++",
  );

  $body = "Name: " . $name . "\n" 
    . "Email: " . $email . "\nCourses: ";

  if ($ws13 == "on") {
    $body .= "WS13 ";
  }

  if ($ws14 == "on") {
    $body .= "WS14 ";
  }

  $body .= "\n"
    . "Description: " . $description_array[$description] . "\n\n"
    . "Experience: \n" . $experience . "\n";

  mail($email_to, $header, $body);
  header("Location: ../articles/accept_form.html");
}

function sanitize($data) {
  return filter_var($data, FILTER_SANITIZE_STRING|FILTER_SANITIZE_FULL_SPECIAL_CHARS);
}

?>
