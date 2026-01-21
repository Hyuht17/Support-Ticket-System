<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Services\AuthService;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService){
        $this->authService = $authService;
    }

    public function login(LoginRequest $request){
        $credentials = $request->validated();
        
        try{
            $result = $this->authService->login($credentials);

            return response()->json([
                'success' => true,
                'message' => 'Login successful',
            ])->withCookie($result['cookie']);

        } catch(\Exception $e){
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 401);
        }
  
    }

    public function refresh(){
        
        $result = $this->authService->refresh();

        return response()->json([
            'success' => true,
            'message' => 'Token refreshed successfully',
        ])->withCookie($result['cookie']);
    }

    public function me(){
        return response()->json([
            'success' => true,
            'data' => $this->authService->me()
        ]);
    }

    public function logout(){
        $result = $this->authService->logout();

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully'
        ])->withCookie($result);
    }

    public function register(RegisterRequest $request){
        $data = $request->validated();

        $user = $this->authService->register($data);

        return response()->json([
            'success' => true,
            'message' => 'Registration successful',
            'data' => $user
        ], 201);
    }
}   
