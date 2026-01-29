<?php

namespace App\Services;

use App\Mail\NewTicketNotification;
use App\Mail\UserPasswordResetMail;
use Illuminate\Support\Facades\Mail;
use App\Models\User;

class NotificationService
{
    public function sendNewTicketNotification($ticket)
    {
        $admin = User::where('role_id', 1)->get();
        foreach ($admin as $recipient) {
            Mail::to($recipient->email)->queue(new NewTicketNotification($ticket));
        }
    }

    public function sendUserPasswordResetNotification($user, $rawPassword)
    {
        Mail::to($user->email)->queue(new UserPasswordResetMail($user, $rawPassword));
    }
}