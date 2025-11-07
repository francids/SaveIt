<?php
namespace App\Database;

class Connection
{
    public \PDO $pdo;

    public function __construct()
    {
        $host = $_ENV["DB_HOST"] ?? "127.0.0.1";
        $port = $_ENV["DB_PORT"] ?? "3306";
        $dbname = $_ENV["DB_NAME"] ?? "SaveItDatabase";
        $user = $_ENV["DB_USER"] ?? "root";
        $pass = $_ENV["DB_PASS"] ?? "1234";

        $dsn = "mysql:host={$host};port={$port};dbname={$dbname};charset=utf8mb4";
        $this->pdo = new \PDO($dsn, $user, $pass, [
            \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
            \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
        ]);
    }

    public function get(): \PDO
    {
        return $this->pdo;
    }
}
