<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

$ip = "";
$port = "";

//GET POST PARAMETERS
if(isset($_POST['ip']) && isset($_POST['port'])){
    $ip = $_POST['ip'];
    $port = $_POST['port'];
}

//RAW TCP/IP CONNECTION 
$sock= socket_create(AF_INET, SOCK_STREAM, 0);
if(!($sock))
{
    $errorcode = socket_last_error();
    $errormsg = socket_strerror($errorcode);

    die("Couldn't create socket: [$errorcode] $errormsg \n");
}

//Connect socket to remote server
if(!socket_connect($sock, $ip, $port))
{
    $errorcode = socket_last_error();
    $errormsg = socket_strerror($errorcode);

    die("Could not connect: [$errorcode] $errormsg \n");
}

//Setting parameters
$data= new stdClass();
$data->id = 0;
$data->jsonrpc = "2.0";
$data->method = "miner_getstat1";

$json = json_encode($data, true);
$jsonSer = serialize($json);

//SOCKET WRITE($sock,  count($json). "\n\r");
socket_write($sock, $json);

//SOCKET READ
$response=socket_read($sock, 1024);

//CLOSE CONNECTION
socket_close($sock);

//RETURN RESULT
echo $response;
?>
