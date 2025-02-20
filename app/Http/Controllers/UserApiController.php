<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserApiController extends Controller
{
    public function index()
    {
        // Fetch all users
        $users = User::all();

        // Return as JSON response
        return response()->json($users);
    }
}
