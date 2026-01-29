<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;

class UserRepository{
    public function create($data): User{
        return User::create($data);
    }

    public function findById($id): ?User{
        return User::find($id);
    }

    public function update(User $user, $data): User{
        $user->update($data);
        return $user;
    }

    public function delete(User $user): void{
        $user->delete();
    }

    public function all($filters, $perPage): LengthAwarePaginator{
        return User::filter($filters)
                    ->latest()
                    ->paginate($perPage);
    }
}
