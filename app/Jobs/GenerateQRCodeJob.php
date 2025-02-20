<?php

namespace App\Jobs;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class GenerateQRCodeJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected User $user;

    /**
     * Create a new job instance.
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // Check if the user has address
        if (!$this->user->address) {
            return;
        }

        // Generate qrcode from the API
        // Silently fail if API throws error
        $qrApiUrl = "http://api.qrserver.com/v1/create-qr-code/";
        $response = Http::get($qrApiUrl, [
            'size' => '300x300',
            'data' => $this->user->address,
        ]);
        if ($response->successful()) {
            $filename = 'users/'. $this->user->id . '/qrcodes/' . Str::uuid() . '.png'; // Generate a unique filename
            Storage::disk('public')->put($filename, $response->body());

            // Optionally, store the file path in the user's table
            $this->user->update(['file_qrcode' => $filename]);
        }
    }
}
