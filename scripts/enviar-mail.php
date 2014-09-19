<?php

//check if its an ajax request, exit if not
if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
	//exit script outputting json data
	$output = json_encode(
	array(
		'type'=>'error', 
		'text' => 'Request must come from Ajax'
	));

        die($output);
} 

$nombrePOST  = filter_var($_POST['nombre'],   FILTER_SANITIZE_STRING);    
$correoPOST  = filter_var($_POST['correo'],   FILTER_SANITIZE_EMAIL);        
$mensajePOST = filter_var($_POST['consulta'], FILTER_SANITIZE_STRING);
$to = "info@martinacocina.es";


if(strlen($correoPOST) < 3) { 
        die('Tienes que proporcionar un correo para que podamos contactarte');
}


$headers = 'From: '.$nombrePOST.' <'.$correoPOST.">\r\n".
    "Reply-To: ".$nombrePOST." <".$correoPOST.">\r\n" .
    'X-Mailer: PHP/' . phpversion();
	
$subject = "Martina-Cocina Web";
$message = 'Nombre: '.$nombrePOST."\r\n";      
$message .= 'E-mail: '.$correoPOST."\r\n";    
$message .= 'Consulta: '.$mensajePOST."\r\n";
if(mail( $to, $subject, $message, $headers )===TRUE){
	echo 'Correo enviado exitosamente';
}else{	
	echo 'Ha habido un error al intentar enviar el correo';
}
?>
