<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pin extends Model
{
    protected $fillable = [
        'user_id',
        'code',
        'type',
        'status',
        'used_at',
        'used_by'
    ];

    protected $casts = [
        'used_at' => 'datetime',
    ];

    /**
     * Get the user who owns this pin
     */
    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the user who used this pin
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'used_by');
    }

    /**
     * Check if pin is still available
     */
    public function isAvailable(): bool
    {
        return $this->status === 'available';
    }

    /**
     * Mark pin as used
     */
    public function markAsUsed(int $userId): void
    {
        $this->update([
            'status' => 'used',
            'used_at' => Carbon::now(),
            'used_by' => $userId,
        ]);
    }
}
