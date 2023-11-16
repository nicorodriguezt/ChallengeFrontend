<?php
require_once __DIR__ . '/../vendor/autoload.php';

use challengeBackEnd\Api\Controller\BookingController;
use challengeBackEnd\Api\Controller\LoginController;
use challengeBackEnd\Api\Service\LoginService;
use challengeBackEnd\Api\Service\BookingService;
use challengeBackEnd\Api\Service\AuthorizationService;
use FastRoute\RouteCollector;
use function FastRoute\simpleDispatcher;

header ("Access-Control-Allow-Origin: *");
header ("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

session_start();

$dispatcher = simpleDispatcher(function (RouteCollector $r) {
    $r->addRoute('GET', '/api/airline', ['challengeBackEnd\Api\Controller\LoginController', 'getAirlines']);
    $r->addRoute('POST', '/api/login', ['challengeBackEnd\Api\Controller\LoginController', 'login']);
    $r->addRoute('GET', '/api/hotel?guests={guests}&checkin={checkin}&checkout={checkout}&destination={destination}&page={page}', ['challengeBackEnd\Api\Controller\BookingController', 'getHotels']);
});

$httpMethod = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    return 0;
}
$routeInfo = $dispatcher->dispatch($httpMethod, $uri);
$headers = apache_request_headers();

switch ($routeInfo[0]) {
    case FastRoute\Dispatcher::NOT_FOUND:
        http_response_code(404);
        echo '404 Not Found';
        break;
    case FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
        http_response_code(405);
        echo '405 Method Not Allowed';
        break;
    case FastRoute\Dispatcher::FOUND:
        header("Content-Type: application/json");
        $handler = $routeInfo[1];
        $vars = $httpMethod == "POST" ? json_decode(file_get_contents('php://input' ),true)
            : $routeInfo[2];
        try {
            $classInstance = new $handler[0];
            $method = $handler[1];
            if ($method == "login" || $method == "getAirlines") {
                echo $classInstance->$method(...$vars);
            } else {
                if (!isset($headers['Authorization'])) {
                    http_response_code(401);
                    echo('401 Unauthorized');
                } else {
                    $token =  substr($headers['Authorization'],7);
                    if (AuthorizationService::validateToken($token)) echo $classInstance->$method(...$vars);
                    else {
                        http_response_code(403);
                        echo "403 Forbidden";
                    }
                }
            }
        } catch (Exception $exception) {
            if ($exception->getMessage() === 'loginError') {
                http_response_code(401);
                echo "Incorrect User or Password";
            } else {
                http_response_code(500);
                echo $exception;
                echo "Internal Server Error";
            }
        }
        break;
}