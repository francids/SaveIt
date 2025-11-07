<?php
namespace App\Controllers;

use App\Services\JWTService;
use App\Services\UserService;

class AuthController
{
    private UserService $userService;
    private JWTService $jwtService;

    public function __construct(UserService $userService, JWTService $jwtService)
    {
        $this->userService = $userService;
        $this->jwtService = $jwtService;
    }

    public function login(): array
    {
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data["email"]) || !isset($data["password"])) {
            http_response_code(400);
            return ["error" => "Email and password are required"];
        }

        $user = $this->userService->getUserByEmail($data["email"]);

        if (!$user || !password_verify($data["password"], $user["password"])) {
            http_response_code(401);
            return ["error" => "Invalid credentials"];
        }

        $token = $this->jwtService->generateToken($user["id"]);

        return [
            "token" => $token,
        ];
    }

    public function register(): array
    {
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data["name"]) || !isset($data["email"]) || !isset($data["password"])) {
            http_response_code(400);
            return ["error" => "Name, email and password are required"];
        }

        if ($this->userService->getUserByEmail($data["email"])) {
            http_response_code(409);
            return ["error" => "Email already in use"];
        }

        $userId = $this->userService->createUser(
            $data["name"],
            $data["email"],
            $data["password"],
        );

        $token = $this->jwtService->generateToken($userId);

        return [
            "token" => $token,
        ];
    }
}
