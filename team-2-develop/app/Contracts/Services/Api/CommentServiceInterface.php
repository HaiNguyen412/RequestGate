<?php

namespace App\Contracts\Services\Api;

interface CommentServiceInterface
{
    public function store($requests, $content);
    public function setMail($request, $content = null);
    public function convertFromConfig($int, $key);
}
