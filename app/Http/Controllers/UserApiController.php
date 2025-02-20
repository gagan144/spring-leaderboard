<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class UserApiController extends Controller
{
    public function index()
    {
        // Fetch all users
        //$users = User::all();
        $users = User::orderBy('points', 'desc')->orderBy('name', 'asc')->get();

        // Return as JSON response
        return response()->json($users);
    }

    public function addUser(Request $request){
        // Validate the request
        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'age' => 'required|integer|min:11',
            'address' => 'nullable|string',
        ]);

        // Generate a password
        $validated['password'] = Hash::make(Str::random(10));

        // Create the user
        $user = User::create($validated);

        return response()->json(['message' => 'User created successfully', 'user' => $user], 201);
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

    public function reportUserByScores(){
        /*
         API to group users by score and return aggregated values.
         */
        $groupedUsers = User::select('name', 'points', 'age')
            ->orderByDesc('points')
            ->get()
            ->groupBy('points')
            ->map(function ($group) {
                return [
                    'names' => $group->pluck('name')->all(),
                    'average_age' => round($group->avg('age'))
                ];
            });

        // Return
        return response()->json($groupedUsers);
    }
}
