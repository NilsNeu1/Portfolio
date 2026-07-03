<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"):
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;

    case ("POST"):
        header("Access-Control-Allow-Origin: *");

        $json   = file_get_contents('php://input');
        $params = json_decode($json);

        $name    = isset($params->clientName)    ? trim($params->clientName)    : '';
        $email   = isset($params->clientEmail)   ? trim($params->clientEmail)   : '';
        $message = isset($params->clientMessage) ? trim($params->clientMessage) : '';

        if (empty($name) || empty($email) || empty($message)) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing fields']);
            exit;
        }

        $recipient = 'schoenfeld_nils@gmx.de'; // ← hier deine echte Mail eintragen
        $subject   = "Portfolio Contact from $name <$email>";
        $body      = "From: $name ($email)<br><br>$message";

        $headers   = [];
        $headers[] = 'MIME-Version: 1.0';
        $headers[] = 'Content-type: text/html; charset=utf-8';
        $headers[] = 'From: noreply@nils-neumann.developerakademie.net';

        $sent = mail($recipient, $subject, $body, implode("\r\n", $headers));

        if ($sent) {
            http_response_code(200);
            echo json_encode(['success' => true]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Mail could not be sent']);
        }
        break;

    default:
        header("Allow: POST", true, 405);
        exit;
}