<?php
namespace App\Controllers;

class IndexController
{
    public function index(): void
    {
        echo json_encode(["message" => "Hello from Stash backend"]);
        exit;
    }
}