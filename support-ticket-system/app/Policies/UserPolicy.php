<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->role_id === 1;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user): bool
    {
        return $user->role_id === 1;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $currentUser, User $targetUser)
    {
        if ($currentUser->role_id === 1) {
            return true;
        }

        return $currentUser->id === $targetUser->id;
    }

    public function resetPassword(User $currentUser)
    {
        return $currentUser->role_id === 1;
    }

}
