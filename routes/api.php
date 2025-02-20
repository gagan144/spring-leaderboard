<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserApiController;

Route::get('/users', [UserApiController::class, 'index']);
Route::post('/user/{id}/update-points', [UserApiController::class, 'updatePoints']);
Route::delete('/users/{id}', [UserApiController::class, 'delete']);
