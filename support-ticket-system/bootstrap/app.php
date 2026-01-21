<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\JwtFromCookie;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Http\Request;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            'jwt.cookie' => JwtFromCookie::class,
            'role' => RoleMiddleware::class,
        ]);
        
        $middleware->redirectGuestsTo(fn () =>
            response()->json(['message' => 'Unauthenticated'], 401)
        );
    })
    ->withExceptions(function (Exceptions $exceptions): void {

        $exceptions->respond(function ($response, \Throwable $e, Request $request) {
            if ($request->is('api/*')) {

                if ($e instanceof NotFoundHttpException) {
                    if ($e->getPrevious() instanceof ModelNotFoundException) {
                        return response()->json([
                            'success' => false,
                            'message' => 'Resource not found'
                        ], 404);
                    }
                    return response()->json([
                        'success' => false,
                        'message' => 'Endpoint not found'
                    ], 404);
                }

                if ($e instanceof AuthenticationException) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Unauthenticated'
                    ], 401);
                }

                if ($e instanceof AuthorizationException) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Forbidden'
                    ], 403);
                }

                if ($e instanceof ValidationException) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Validation Error',
                        'errors' => $e->errors()
                    ], 422);
                }
                return response()->json([
                    'success' => false,
                    'message' => config('app.debug') ? $e->getMessage() : 'Server Error'
                ], 500);

                return $response;

            }
            
    
        });
    })->create();

