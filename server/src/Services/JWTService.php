<?php
namespace App\Services;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JWTService
{
    private $secretKey;
    private $algorithm = "HS256";

    private $expirationTime = 60 * 60 * 24;

    public function __construct()
    {
        $this->secretKey = $_ENV["JWT_SECRET"] ?? getenv("JWT_SECRET");
    }

    public function generateToken($userId)
    {
        $payload = [
            "iss" => "SaveItBackend",
            "iat" => time(),
            "exp" => time() + $this->expirationTime,
            "user_id" => $userId,
        ];

        return JWT::encode($payload, $this->secretKey, $this->algorithm);
    }

    public function verifyToken($token)
    {
        try {
            JWT::decode($token, new Key($this->secretKey, $this->algorithm));
            return ["valid" => true];
        } catch (\Exception $e) {
            return ["valid" => false, "error" => $e->getMessage()];
        }
    }

    public function getTokenFromHeader()
    {
        $headers = getallheaders();
        $authHeader = $headers["Authorization"] ?? "";

        if (preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
            return $matches[1];
        }

        return null;
    }
}
