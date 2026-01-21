<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository{
    public function create($data): User{
        return User::create($data);
    }

    public function findById($id): ?User{
        return User::find($id);
    }
}