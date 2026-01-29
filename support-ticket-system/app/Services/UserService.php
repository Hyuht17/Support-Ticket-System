<?php

namespace App\Services;
use App\Models\User;
use App\Repositories\UserRepository;
use Exception;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Services\NotificationService;

class UserService
{
    protected $userRepository;
    protected $notificationService;

    public function __construct(UserRepository $userRepository, Hash $hash, NotificationService $notificationService){
        $this->userRepository = $userRepository;
        $this->notificationService = $notificationService;
    }


    public function getUserById($id): ?User{
        return $this->userRepository->findById($id);
    }

    public function createUser(array $data): User{
        return $this->userRepository->create($data);
    }

    public function updateUser(User $user, array $data): User{
        return $this->userRepository->update($user, $data);
    }

    public function deleteUser(User $user): void{
        $this->userRepository->delete($user);
    }

    public function updatePassword(User $user, $data): User{
        if (!Hash::check($data['current_password'], $user->password)) {
            throw new Exception('Current password is incorrect');
        };
        $user->password = bcrypt($data['password']);
        $user->save();
        return $user;
    }

    public function resetPassword($id){
        $newPassword = Str::password(12);;
        $user = $this->getUserById($id);
        $user->password = bcrypt($newPassword);
        $user->save();
        $this->notificationService->sendUserPasswordResetNotification($user, $newPassword);
        return $newPassword;
    }

    public function getAllUsers($filter = [], $perPage = 15){
        return $this->userRepository->all($filter, $perPage);
    }

    public function searchAgents($keyword){
        return $this->userRepository->searchAgents($keyword);
    }
}