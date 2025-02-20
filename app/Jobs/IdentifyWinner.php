<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Winner;


class IdentifyWinner implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(){
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // Fetch the user with highest points
        $userWithHighestPoints = User::select("id", "points")
            ->orderByDesc("points")
            ->first();

        // Get count of all users with that points
        $countHighUsers = User::where('points', $userWithHighestPoints->points)->count();

        // Check if there are more than one
        if($countHighUsers === 1){
            // Add entry to winners
            Winner::create([
                'user_id' => $userWithHighestPoints->id,
                'points' => $userWithHighestPoints->points,
                'declared_at' => now()
            ]);
        }
    }
}
