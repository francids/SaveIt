<?php
namespace App\Services;

use App\Database\Connection;

class UserService
{
    private \PDO $db;

    public function __construct(Connection $conn)
    {
        $this->db = $conn->get();
    }

    public function createUser(string $name, string $email, string $password): bool|string
    {
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $this->db->prepare(
            "INSERT INTO users (name, email, password)
            VALUES (:name, :email, :password)"
        );
        $stmt->execute([
            "name" => $name,
            "email" => $email,
            "password" => $hashedPassword
        ]);
        return $this->db->lastInsertId();
    }

    public function getUserByEmail($email): mixed
    {
        $stmt = $this->db->prepare("SELECT * from users WHERE email = ?");
        $stmt->execute([$email]);
        return $stmt->fetch() ?: null;
    }
}
