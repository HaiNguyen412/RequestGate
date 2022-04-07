<?php

namespace App\Contracts\Services\Api;

interface RequestServiceInterface
{
    public function index($filters);
    public function show($id);
    public function store($data);
    public function update($request, $data, $action);
    public function destroy($request);
    public function history();
    public function myRequests($user_id);
    public function staffRequests($dept_id);
    public function approve($request);
    public function reject($request);
    public function adminUpdate($request, $data);
    public function authorUpdate($request, $data);
    public function setMail($request_id, $content = null);
    public function getContent($request, $data);
    public function convertFromConfig($int, $key);
    public function getCode($email);
    public function normalizeKey($key);
    public function getRequestsByAssignee();
}
