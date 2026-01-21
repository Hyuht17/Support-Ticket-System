<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TicketController;

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
    Route::put('{id}', [TicketController::class, 'update']);
    Route::delete('{id}', [TicketController::class, 'destroy']);
    
    Route::middleware('role:admin')->group(function () {
        Route::get('/', [TicketController::class, 'index']);
    });
});