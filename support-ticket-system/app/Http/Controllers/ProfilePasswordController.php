<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\PasswordRequest;
use App\Services\UserService;

class ProfilePasswordController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService){
        $this->userService = $userService;
    }

    public function update(PasswordRequest $request)
    {
        $user = auth()->user();
        $data = $request->validated();
        $this->userService->updatePassword($user, $data);

        return response()->json([
            'success' => true,
            'message' => 'Password updated successfully',
        ]);
    }
}
