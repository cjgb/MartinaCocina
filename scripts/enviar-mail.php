<?php
$nombrePOST = $_POST['nombre'];    
$correoPOST = $_POST['correo'];        
$mensajePOST = $_POST['mensaje'];
$to = "info@martinacocina.es";

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
