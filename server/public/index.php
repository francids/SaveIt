<?php
require __DIR__ . "/../vendor/autoload.php";

use App\Controllers\IndexController;
use App\Controllers\AuthController;
use App\Controllers\ItemsController;
use App\Services\JWTService;
use App\Services\UserService;
use App\Services\ItemsService;
use App\Middleware\AuthMiddleware;
use App\Database\Connection;

$path = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
$method = $_SERVER["REQUEST_METHOD"] ?? "GET";

header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$indexController = new IndexController();
$authController = new AuthController(new UserService(new Connection()), new JWTService());
$itemsController = new ItemsController(new ItemsService(new Connection()));

if ($path === "/")
    $indexController->index();


if ($path === "/login" && $method === "POST") {
    echo json_encode($authController->login());
    exit;
} else if ($path === "/register" && $method === "POST") {
    echo json_encode($authController->register());
    exit;
}

$authMiddleware = new AuthMiddleware(new JWTService());
$userId = $authMiddleware->authenticate();

if ($path === "/items") {
    switch ($method) {
        case "GET":
            $itemsController->getAll($userId);
        case "POST":
            $itemsController->add($userId);
        case "PUT":
            $itemsController->edit($userId);
        case "DELETE":
            $itemsController->remove($userId);
    }
}

http_response_code(404);
echo json_encode(["error" => "Not Found"]);
