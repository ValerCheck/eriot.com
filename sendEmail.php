<?php
	require_once('./PHPMailer/class.phpmailer.php');
	
	$type = $_POST['type'];

	$subject = '';

	switch ($type) {
		case 'contact':
			$subject = 'Callback Request';
			break;
		case 'get-details':
			$subject = 'Get Details Request';
			break;
		case 'message':
			$subject = 'Message Request';
		default:
			break;
	}

	$email = new PHPMailer();
	$email->From = 'no-reply@engineeriot.com';
	$email->Subject = $subject;
	$email->AddAddress('it@8relocate.com');
	$email->FromName = "Engineeriot";

	$message = "Request from Engineeriot.com\r\n\r\n";

	if (isset($_POST['name'])) {
		$message .= "Name: " . $_POST['name'] . "\r\n";
	}

	if (isset($_POST['company'])) {
		$message .= "Company: " . $_POST['company'] . "\r\n";
	}

	if (isset($_POST['phone'])) {
		$message .= "Phone: " . $_POST['phone'] . "\r\n";
	}

	if (isset($_POST['email'])) {
		$message .= "Email: " . $_POST['email'] . "\r\n";
	}

	if (isset($_POST['message'])) {
		$message .= "Message:\r\n" . $_POST['message'] . "\r\n";
	}

	$email->Body = $message;
	if(!$email->Send()){
		die("Mailer Error: " . $email->ErrorInfo . "\n");
	} else {
		echo "Message has been sent\n";
	}
?>