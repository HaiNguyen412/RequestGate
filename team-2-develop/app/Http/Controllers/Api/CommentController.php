<?php

namespace App\Http\Controllers\Api;

use App\Contracts\Services\Api\CommentServiceInterface;
use App\Http\Requests\Api\Comments\StoreRequest;
use App\Models\Request;

class CommentController extends ApiController
{
    protected $commentService;
    public function __construct(CommentServiceInterface $commentService)
    {
        parent::__construct();
        $this->commentService = $commentService;
    }

    public function store(StoreRequest $storeRequest, Request $request)
    {
        // $this->authorize('storeComment', $request);
        $content = $storeRequest->all();
        return $this->doRequest(function () use ($request, $content) {
            return $this->commentService->store($request, $content);
        });
    }
}
