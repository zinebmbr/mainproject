<?php
namespace App\Http\Controllers\Auth;

use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): JsonResponse
{
    $request->authenticate();
    $request->session()->regenerate();

    return response()->json([
        'user'    => Auth::user(),
        'message' => 'Login successful',
    ]);
}

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): JsonResponse
{
    Auth::guard('web')->logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return response()->json([
        'message' => 'Logged out',
    ]);
}
}
