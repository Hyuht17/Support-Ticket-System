<?php

namespace App\Services;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use \App\Services\UserService;
use Exception;

class AuthService{

    protected $userService;
    protected $authGuard;

    public function __construct(UserService $userService){
        $this->userService = $userService;
        $this->authGuard = Auth::guard();
        
    }

    public function login($credentials){
        if (!$token = $this->authGuard->attempt($credentials)) {
            throw new Exception('Email or password is incorrect');        
        }
        $cookie = $this->createAuthCookie($token);

        return [
            'cookie' => $cookie
        ];
    }

    public function refresh(){
        $newToken = $this->authGuard->refresh();
        $cookie = $this->createAuthCookie($newToken);

        return [
            'cookie' => $cookie
        ];
    }

    public function logout(){
        $this->authGuard->logout();
        return cookie()->forget('access_token');
    }

    public function me(){
        return $this->authGuard->user();
    }

    public function register($data){
        $data['password'] = bcrypt($data['password']);
        $user = $this->userService->createUser($data);
        return $user;
    }

    private function createAuthCookie($token){

        $ttl = auth::factory()->getTTL();

        return cookie(
            'access_token', 
            $token, 
            $ttl, // minutes
            '/', // path
            null, // domain 
            false, // secure https 
            true, // httpOnly
            false, // raw
            'lax' // sameSite
        );
    }
}
