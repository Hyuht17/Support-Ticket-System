<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\UserService;
use App\Http\Requests\UserRequest;
use App\Models\User;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService){
        $this->userService = $userService;
    }

    public function index()
    {
        $this->authorize('viewAny', User::class);
        return response()->json([
            'success' => true,
            'data' => $this->userService->getAllUsers(),
        ]);
    }

    public function show($id)
    {
        $user = $this->userService->getUserById($id);
        $this->authorize('view', $user);
        return response()->json([
            'success' => true,
            'data' => $user,
        ]);
    }

    public function update(UserRequest $request, $id)
    {
        $user = $this->userService->getUserById($id);
        $this->authorize('update', $user);
        $data = $request->validated();
        $updatedUser = $this->userService->updateUser($user, $data);
        return response()->json([
            'success' => true,
            'message' => 'User updated successfully',
            'data' => $updatedUser,
        ]);
    }

    public function getAgents(Request $request)
    {
        $this->authorize('viewAny', User::class);
        $agents = $this->userService->searchAgents($request->keyword);
        return response()->json([
            'success' => true,
            'data' => $agents,
        ]);
    }
}
