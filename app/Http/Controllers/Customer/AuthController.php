<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\GoodBaseController;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class AuthController extends GoodBaseController
{

    public function __construct(){

    }


    public function register(Request $request){

        $validator = Validator::make($request->all(), [
            'phone_number' => 'required|max:14',
            'full_name' => 'required|min:3',
            'password' => 'required|min:6',
        ]);

        if ($validator->fails()) {
            return $this->returnError($validator->errors()->first(), ["Validation failed"],422);
        }

        $user = User::where([
            'email' => $request->input('phone_number')
        ])->first();

        if($user){
            return $this->returnError('The phone number already used, if you have forgotten the password reset it on the login page',
                ["Number used"],422);
        }

        $user = User::create([
            'name'=>$request->input('full_name'),
            'email'=>$request->input('phone_number'),
            'password'=>Hash::make($request->input('password')),
            'otp'=> rand(111111,999999)
        ]);

        $customer =  Customer::create([
            'user_id'=> $user->id,
            'customer_name' =>$user->name,
            'phone_number_1'=>$request->input('phone_number'),
            'verified'=>false
        ]);

        $user->customer_id = $customer->id;
        $user->save();

        $responseData['accessToken'] = $user->createToken('customer')->accessToken;
        return $this->returnResponse('Customer registered',$responseData);
    }

    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'phone_number' => 'required|max:14'
        ]);

        if ($validator->fails()) {
            return $this->returnError($validator->errors()->first(), ["Validation failed"],422);
        }

        $user = User::where([
            'email' => $request->input('phone_number')
        ])->first();

        if(!$user){
            return $this->returnError('The phone number is not registered', ["Number not registered"],404);
        }

        $customer = Customer::find($user->customer_id);
        if(!$customer){
            $customer = Customer::create([
                'customer_name'=>$user->name,
                'phone_number_1'=>$user->email
            ]);
        }



        $user->customer_id = $customer->id;
        $user->save();

        $responseData['accessToken'] = $user->createToken('web')->accessToken;
        $responseData['user'] = $user;
        return $this->returnResponse('Logged In Successfully',$responseData);
    }



    /*** Passwords **/
    public function requestOtp(Request $request){
        return $this->returnResponse('Not implemented',"");
    }

    public function verifyOtp(Request $request){
        return $this->returnResponse('Not implemented',"");
    }

    public function updatePassword(Request $request){
        return $this->returnResponse('Not implemented',"");
    }
    /*** [end] Passwords **/


}




























