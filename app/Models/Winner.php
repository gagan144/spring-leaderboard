<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Winner extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'points',
        'declared_at',
    ];

    public function user(){
        // To resolve relationship with user
        return $this->belongsTo(User::class);
    }
}
