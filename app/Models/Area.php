<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Area extends Model
{
    protected $fillable = ['name', 'code'];

    /**
     * Get all users in this area
     */
    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }
}
