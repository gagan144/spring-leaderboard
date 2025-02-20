<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;

class ResetUserPoints extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'users:reset-user-points';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command to reset user points to 0.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $updated = User::query()->update(['points' => 0]);
        if ($updated) {
            $this->info("All user points have been reset to zero.");
        } else {
            $this->warn("No user points were updated.");
        }
    }
}
