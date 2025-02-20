<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserApiController extends Controller
{
    public function index()
    {
        // Fetch all users
        //$users = User::all();
        $users = User::orderBy('points', 'desc')->get();

        // Return as JSON response
        return response()->json($users);
    }

    public function updatePoints($id, Request $request)
    {
        // Validate the request
        $validated = $request->validate([
            'action' => 'required|in:increase,decrease',
        ]);

        // Find the user by ID
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Update points based on the action
        if ($validated['action'] === 'increase') {
            $user->points += 1; // Assuming you have a points field
        } elseif ($validated['action'] === 'decrease') {
            if($user->points == 0){
                return response()->json(['message' => 'Points cannot be negative'], 400);
            }else{
                $user->points -= 1;
            }
        }

        // Save the updated user points
        $user->save();

        // Return a success response
        return response()->json(['message' => 'User points updated successfully', 'user' => $user]);
    }

    public function delete($id, Request $request){
        // Find the user by ID
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Delete User
        $user->delete();

        // Return
        return response()->json(['message' => 'User was removed']);
    }
}
