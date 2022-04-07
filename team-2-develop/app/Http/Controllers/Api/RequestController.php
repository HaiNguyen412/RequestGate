<?php

namespace App\Http\Controllers\Api;

use App\Contracts\Services\Api\RequestServiceInterface;
use App\Filters\RequestFilters;
use App\Http\Requests\Api\Requests\AdminUpdateRequest;
use App\Http\Requests\Api\Requests\AuthorUpdateRequest;
use App\Http\Requests\Api\Requests\StoreRequest;
use Illuminate\Http\Request as RequestClient;
use App\Models\Request;

class RequestController extends ApiController
{
    protected $requestService;
    public function __construct(RequestServiceInterface $requestService)
    {
        $this->requestService = $requestService;
    }

    public function index(RequestFilters $filters)
    {
        return $this->getData(function () use ($filters) {
            return $this->requestService->index($filters);
        });
    }

    public function show(Request $request)
    {
        $id = $request->id;
        return $this->getData(function () use ($id) {
            return $this->requestService->show($id);
        });
    }

    public function store(StoreRequest $storeRequest)
    {
        $data = $storeRequest->validated();
        return $this->doRequest(function () use ($data) {
            return $this->requestService->store($data);
        });
    }

    public function update(RequestClient $updateRequest, Request $request)
    {
        $this->authorize('update', $request);
    }

    public function destroy(Request $request)
    {
        $this->authorize('delete', $request);
        return $this->doRequest(function () use ($request) {
            return $this->requestService->destroy($request);
        });
    }

    public function history()
    {
        return $this->getData(function () {
            return $this->requestService->history();
        });
    }

    public function myRequests()
    {
        return $this->getData(function () {
            return $this->requestService->myRequests(auth()->user()->id);
        });
    }

    public function staffRequests()
    {
        $this->authorize('viewStaff', Request::class);
        return $this->getData(function () {
            return $this->requestService->staffRequests(auth()->user()->department_id);
        });
    }

    public function approve(Request $request)
    {
        $this->authorize('manager', $request);
        return $this->doRequest(function () use ($request) {
            return $this->requestService->approve($request);
        });
    }

    public function reject(Request $request)
    {
        $this->authorize('manager', $request);
        return $this->doRequest(function () use ($request) {
            return $this->requestService->reject($request);
        });
    }

    public function adminUpdate(AdminUpdateRequest $updateRequest, Request $request)
    {
        $this->authorize('adminUpdate', $request);
        $data = $updateRequest->validated();
        if (isset($data['status'])) {
            $this->authorize('changeStatus', $request);
        }
        return $this->doRequest(function () use ($request, $data) {
            return $this->requestService->adminUpdate($request, $data);
        });
    }

    public function authorUpdate(AuthorUpdateRequest $updateRequest, Request $request)
    {
        $this->authorize('authorUpdate', $request);
        $data = $updateRequest->validated();
        return $this->doRequest(function () use ($request, $data) {
            return $this->requestService->authorUpdate($request, $data);
        });
    }

    public function getRequestsByAssignee()
    {
        $this->authorize('manageRequest', Request::class);
        return $this->getData(function () {
            return $this->requestService->getRequestsByAssignee();
        });
    }
}
