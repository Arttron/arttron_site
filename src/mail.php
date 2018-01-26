<?php
 
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
require 'PHPMailer/Exception.php';

/*use PHPMailer\PHPMailer.php;
use PHPMailer\Exception.php;
*/
echo $_POST['contact__mess'] . '\n' . 'E-mail: ' . $_POST['contact__mail'];

echo error_get_last();


$mail = new PHPMailer;
$mail->CharSet = 'utf-8';
 
$mail->isSMTP();
$mail->Host = 'smtp.zoho.eu';
$mail->SMTPAuth = true;
$mail->Username = 'admin@arttron.pp.ua';    //Логин
$mail->Password = 'ArtApArt12';             //Пароль
$mail->SMTPSecure = 'ssl';
$mail->Port = 465;
 
$mail->setFrom($_POST['contact__mail'], 'Robot');
$mail->isHTML(true);
$mail->addAddress('artdoua@gmail.com', 'Artem Romanov');
$mail->Subject = 'Тема письма';
$mail->Body    = $_POST['contact__mess'] . '\n' . 'E-mail: ' . $_POST['contact__mail'];
$mail->AltBody = "Hi";
 
//Отправка сообщения
print_r(error_get_last());
if(!$mail->send()) {
    echo 'Ошибка при отправке. Ошибка: ' . $mail->ErrorInfo;
} else {
    echo 'Сообщение успешно отправлено';
}