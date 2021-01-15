<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    use HasRoles;
    use SoftDeletes;
    protected $casts = [ 'created_at' => 'datetime:Y-m-d H:m' ];

    protected $guard_name = 'api';

    protected $fillable = [
        'name',
        'email',
        'password',

        'otp',

        'email_verified_at',
        'otp_expires_at',
        'last_seen_at',

        'staff_id',
        'vendor_id'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

 }




