<?php
namespace App\Controllers;

class IndexController
{
    public function index(): array
    {
        return ["message" => "Hello from Stash backend"];
    }

    public function hello(): array
    {
        return ["message" => "Hello"];
    }
}