<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\TicketLogController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfilePasswordController;
use App\Http\Controllers\UserPasswordController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\LabelController;
use App\Http\Controllers\DashboardController;

Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::middleware('auth:api')->group(function () {
        Route::get('me', [AuthController::class, 'me']);
        Route::get('refresh', [AuthController::class, 'refresh']);
        Route::post('logout', [AuthController::class, 'logout']);
    });
});

Route::middleware('auth:api')->prefix('tickets')->group(function () {
    
    Route::post('/', [TicketController::class, 'store']);
    Route::get('/stats', [DashboardController::class, 'index']);
    Route::get('{id}', [TicketController::class, 'show']);
    Route::patch('{id}', [TicketController::class, 'update']);
    Route::delete('{id}', [TicketController::class, 'destroy']);
    Route::get('/', [TicketController::class, 'index']);
    Route::get('/{id}/logs', [TicketLogController::class, 'show']);
    Route::get('/{id}/comments', [CommentController::class, 'index']);
    Route::post('/{id}/comments', [CommentController::class, 'store']);
    Route::patch('/{ticketId}/comments/{commentId}', [CommentController::class, 'update']);
    Route::delete('/{ticketId}/comments/{commentId}', [CommentController::class, 'destroy']);
});

Route::middleware('auth:api')->prefix('users')->group(function () {
    Route::put('profile/password', [ProfilePasswordController::class, 'update']);
    Route::patch('{id}', [UserController::class, 'update']);
    Route::middleware('role:admin')->group(function () {
        Route::get('/', [UserController::class, 'index']);
        Route::get('{id}', [UserController::class, 'show']);
        Route::put('{id}/password', [UserPasswordController::class, 'update']);            Route::get('/agents', [UserController::class, 'getAgents']);
        Route::get('/agents', [UserController::class, 'getAgents']);
    });
});

Route::middleware('role:admin')->prefix('ticket-logs')->group(function () {
    Route::get('/', [TicketLogController::class, 'index']);
});

Route::middleware('auth:api')->prefix('categories')->group(function () {
    Route::get('/', [CategoryController::class, 'index']);
    Route::middleware('role:admin')->group(function () {
        Route::post('/', [CategoryController::class, 'store']);
        Route::patch('{id}', [CategoryController::class, 'update']);
        Route::delete('{id}', [CategoryController::class, 'destroy']);
    });
});

Route::middleware('auth:api')->prefix('labels')->group(function () {
    Route::get('/', [LabelController::class, 'index']);
    Route::middleware('role:admin')->group(function () {
        Route::post('/', [LabelController::class, 'store']);
        Route::patch('{id}', [LabelController::class, 'update']);
        Route::delete('{id}', [LabelController::class, 'destroy']);
    });
});
    