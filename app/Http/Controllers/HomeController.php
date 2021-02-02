<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class HomeController extends Controller
{

    public function __construct(){
        // $this->middleware('auth');
    }

    public function index(){
        return view('main');
    }

    public function staff(Request $request){
        Log::debug($request->all());
        return "Staff modules under construction";
    }

    public function vendor(){
        return "Vendor modules under construction";
    }

}


