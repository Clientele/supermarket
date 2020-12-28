<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\GoodBaseController;
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
        return "Not implemented";
        return view('welcome');
    }



}


