<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminAuthController extends Controller
{
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


        $user = User::where(
            'email',
            $validated['email']
        )->first();


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


        $user->tokens()->delete();


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
            ]
        ]);
    }


    public function logout(Request $request)
    {
        $request
            ->user()
            ->currentAccessToken()
            ?->delete();


        return response()->json([
            'message' => 'Logged out successfully.'
        ]);
    }


    public function me(Request $request)
    {
        return response()->json([
            'user' => $request->user()
        ]);
    }
}
