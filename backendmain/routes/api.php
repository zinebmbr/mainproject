<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CollaborateurController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Auth routes
Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth:sanctum');

// Protected routes (require authentication)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    Route::get('/register', function () {
        return redirect('/signup'); // Or whatever your frontend route is
    });
    
    // Collaborateur routes
    Route::get('/collaborateurs', [CollaborateurController::class, 'index']);
    Route::post('/collaborateurs', [CollaborateurController::class, 'store']);
    Route::get('/collaborateurs/{id}', [CollaborateurController::class, 'show']);
    Route::put('/collaborateurs/{id}', [CollaborateurController::class, 'update']);
    Route::delete('/collaborateurs/{id}', [CollaborateurController::class, 'destroy']);
    
    // Add other protected API routes here
});