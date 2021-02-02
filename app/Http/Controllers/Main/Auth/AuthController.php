<?php

namespace App\Http\Controllers\Main\Auth;

use App\Http\Controllers\Main\GoodBaseController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AuthController extends GoodBaseController
{

    public function __construct(){
        // $this->middleware('auth');
    }

    public function ping(Request $request){
        return "Success";
     }

    public function login(Request $request){
        $user = User::where([
            'email' => $request->input('email')
        ])->first();

        if(!$user){
            return $this->returnError('User not found',["User not found"]);
        }

        $responseData['accessToken'] = $user->createToken('web')->accessToken;
        $responseData['user'] = $user;
        return $this->returnResponse('Logged In Successfully',$responseData);
    }



}


