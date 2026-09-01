<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminAuthController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | ADMIN LOGIN
    |--------------------------------------------------------------------------
    */

    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => [
                'required',
                'email',
            ],

            'password' => [
                'required',
                'string',
            ],
        ]);

        /*
        |--------------------------------------------------------------------------
        | Only allow the configured admin email
        |--------------------------------------------------------------------------
        */

        $adminEmail = config(
            'services.alote.admin_email'
        );

        if (
            !$adminEmail ||
            strtolower($validated['email']) !==
            strtolower($adminEmail)
        ) {
            return response()->json([
                'message' => 'Invalid email or password.'
            ], 401);
        }

        /*
        |--------------------------------------------------------------------------
        | Find Admin User
        |--------------------------------------------------------------------------
        */

        $user = User::where(
            'email',
            $validated['email']
        )->first();

        /*
        |--------------------------------------------------------------------------
        | Check Password
        |--------------------------------------------------------------------------
        */

        if (
            !$user ||
            !Hash::check(
                $validated['password'],
                $user->password
            )
        ) {
            return response()->json([
                'message' => 'Invalid email or password.'
            ], 401);
        }

        /*
        |--------------------------------------------------------------------------
        | Remove Old Admin Tokens
        |--------------------------------------------------------------------------
        */

        $user->tokens()->delete();

        /*
        |--------------------------------------------------------------------------
        | Create New Sanctum Token
        |--------------------------------------------------------------------------
        */

        $token = $user
            ->createToken('admin-token')
            ->plainTextToken;

        return response()->json([
            'message' => 'Login successful.',

            'token' => $token,

            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | ADMIN LOGOUT
    |--------------------------------------------------------------------------
    */

    public function logout(Request $request)
    {
        $request
            ->user()
            ?->currentAccessToken()
            ?->delete();

        return response()->json([
            'message' => 'Logged out successfully.'
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | CURRENT ADMIN
    |--------------------------------------------------------------------------
    */

    public function me(Request $request)
    {
        return response()->json([
            'user' => [
                'id' => $request->user()->id,
                'name' => $request->user()->name,
                'email' => $request->user()->email,
            ],
        ]);
    }
}
