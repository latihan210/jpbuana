<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

#[Fillable(['area_id', 'name', 'username', 'email', 'password', 'phone', 'sponsor_id', 'parent_id', 'position', 'status'])]
#[Hidden(['password', 'two_factor_secret', 'two_factor_recovery_codes', 'remember_token'])]
class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
            'balance' => 'decimal:2',
            'point' => 'decimal:2',
        ];
    }

    public function area()
    {
        return $this->belongsTo(Area::class);
    }

    public function sponsor()
    {
        return $this->belongsTo(User::class, 'sponsor_id');
    }

    public function parent()
    {
        return $this->belongsTo(User::class, 'parent_id');
    }

    public function referrals()
    {
        return $this->hasMany(User::class, 'sponsor_id');
    }

    public function downline()
    {
        return $this->hasMany(Pin::class, 'sponsor_id');
    }

    public function pins()
    {
        return $this->hasMany(Pin::class, 'user_id');
    }

    public function usedPins()
    {
        return $this->hasMany(Pin::class, 'used_by');
    }

    public function bonuses()
    {
        return $this->hasMany(Bonus::class);
    }

    public function autoRos()
    {
        return $this->hasMany(AutoRo::class);
    }
}
