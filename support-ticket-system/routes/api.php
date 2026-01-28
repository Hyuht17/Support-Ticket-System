<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\TicketLogController;

Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    
    Route::middleware('auth:api')->group(function () {
        Route::get('me', [AuthController::class, 'me']);
        Route::post('refresh', [AuthController::class, 'refresh']);
        Route::post('logout', [AuthController::class, 'logout']);
    });
});

Route::middleware('auth:api')->prefix('tickets')->group(function () {
    
    Route::post('/', [TicketController::class, 'store']);
    Route::get('{id}', [TicketController::class, 'show']);
    Route::patch('{id}', [TicketController::class, 'update']);
    Route::delete('{id}', [TicketController::class, 'destroy']);
    Route::get('/', [TicketController::class, 'index']);
    Route::get('/{id}/logs', [TicketLogController::class, 'index']);
    Route::get('/{id}/comments', [CommentController::class, 'index']);
    Route::post('/{id}/comments', [CommentController::class, 'store']);
    Route::patch('/{ticketId}/comments/{commentId}', [CommentController::class, 'update']);
    Route::delete('/{ticketId}/comments/{commentId}', [CommentController::class, 'destroy']);
});
