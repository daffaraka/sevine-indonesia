<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Auth;

class ActivityLog extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'actor_role',
        'module',
        'action',
        'target_label',
        'metadata',
        'created_at',
    ];

    protected function casts(): array
    {
        return [
            'metadata'   => 'array',
            'created_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public static function record(
        string $module,
        string $action,
        string $targetLabel,
        array $metadata = [],
    ): self {
        /** @var User|null $user */
        $user = Auth::user();
        $roleName = $user?->getRoleNames()->first() ?? 'admin';

        return self::create([
            'user_id'      => $user?->id,
            'actor_role'   => $roleName,
            'module'       => $module,
            'action'       => $action,
            'target_label' => $targetLabel,
            'metadata'     => $metadata ?: null,
            'created_at'   => now(),
        ]);
    }
}
