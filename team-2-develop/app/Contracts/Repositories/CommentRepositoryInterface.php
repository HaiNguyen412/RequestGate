<?php

namespace App\Contracts\Repositories;

interface CommentRepositoryInterface extends BaseRepositoryInterface
{
    public function getRequestComments($request_id);
    public function deleteCommentsByRequest($request_id);
}
