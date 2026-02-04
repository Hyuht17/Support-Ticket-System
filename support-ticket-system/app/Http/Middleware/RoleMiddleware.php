<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $role): Response
    {
        // Kiểm tra user có role phù hợp không
        if (!auth()->user()->hasRole($role)) {
            return response()->json([
                'message' => 'Forbidden',
                'error' => "You don't have permission to access this resource. Required role: {$role}"
            ], 403);
        }

        return $next($request);
    }
}
