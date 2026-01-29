<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\UserService;

class UserPasswordController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function update($id)
    {
        $user = auth()->user();
        $this->authorize('resetPassword', $user);

        $newPassword = $this->userService->resetPassword($id);

        return response()->json([
            'success' => true,
            'message' => 'Password updated successfully',
            'new_password' => $newPassword,
        ]);
    }
}
