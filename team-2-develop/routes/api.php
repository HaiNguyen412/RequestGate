<?php

use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['namespace' => 'Api', 'prefix' => 'v1'], function () {
    Route::group(['as' => 'api.v1.'], function () {

        Route::group(['namespace' => 'Auth', 'prefix' => 'auth'], function () {
            Route::post('/password/email', 'ForgotPasswordController@sendResetLinkEmail');
            Route::post('/password/reset', 'ResetPasswordController@reset');
            Route::get('/email/verify/{id}/{hash}', 'VerificationController@verify');
            Route::post('login', 'LoginController@login');
            Route::post('/google', 'GoogleController@redirectToGoogle');
            Route::group(['middleware' => 'jwt.auth'], function () {
                Route::get('logout', 'LoginController@logout');
                Route::get('user-info', 'LoginController@getUserInfo');
                Route::put('change-password', 'ChangePasswordController@changePassword');
                Route::post('/email/verification-notification', 'VerificationController@resend');
            });
        });

        Route::group(['middleware' => 'jwt.auth'], function () {
            Route::group(['prefix' => 'requests'], function () {
                Route::get('/history', 'RequestController@history');
                Route::get('/me', 'RequestController@myRequests');
                Route::get('/staff', 'RequestController@staffRequests');
                Route::get('/admin-requests', 'RequestController@getRequestsByAssignee');
                Route::post('/{request}/comment', 'CommentController@store');
                Route::post('/{request}/approve', 'RequestController@approve');
                Route::post('/{request}/reject', 'RequestController@reject');
                Route::put('/{request}/author', 'RequestController@authorUpdate');
                Route::put('/{request}/admin', 'RequestController@adminUpdate');
            });
            Route::group(['prefix' => 'users'], function () {
                Route::get('/list-assignee','UserController@getListAssignee');
                Route::get('/list-user','UserController@getListUser');
            });
            Route::group(['prefix' => 'category'], function () {
                Route::get('/list', 'CategoryController@getCategoryList');
            });
            Route::apiResources([
                'category' => 'CategoryController',
                'departments' => 'DepartmentController',
                'requests' => 'RequestController',
                'users' => 'UserController',
            ]);
        });
    });
});
