<?php

namespace App\Repositories;

use App\Contracts\Repositories\CommentRepositoryInterface;
use App\Models\Comment;

class CommentRepository extends BaseRepository implements CommentRepositoryInterface
{
    public function __construct(Comment $comment)
    {
        parent::__construct($comment);
    }

    public function getRequestComments($request_id)
    {
        return $this->model
            ->from('comments as c')
            ->where('c.request_id', $request_id)
            ->join('users as u', 'c.user_id', '=', 'u.id')
            ->select('u.id', 'u.name as author', 'c.created_at', 'c.content')
            ->orderBy('c.created_at')
            ->get();
    }

    public function deleteCommentsByRequest($request_id)
    {
        return $this->model
            ->where('request_id', $request_id)
            ->delete();
    }
}
