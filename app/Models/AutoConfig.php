<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AutoConfig extends Model
{
    protected $fillable = [
        'key',
        'value',
        'description',
    ];

    /**
     * Get config value by key
     */
    public static function get(string $key, mixed $default = null): mixed
    {
        return self::where('key', $key)->first()?->value ?? $default;
    }
}
