<?php
namespace App\Controllers;

class IndexController
{
    public function index(): void
    {
        echo json_encode(["message" => "Hello from SaveIt backend"]);
    }

    public function hello(): void
    {
        echo json_encode(["message" => "Hello"]);
    }
}