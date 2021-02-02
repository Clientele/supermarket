<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\GoodBaseController;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AccountController extends GoodBaseController
{

    public function __construct(){

    }


    public function updateAddress(Request $request){


        $validator = Validator::make( $request->all(), [
            'country_id' => 'required|numeric',
            'zone_id' => 'numeric',
            'region_id' => 'required|numeric',
            'district_id' => 'required|numeric',
            'place_id' => 'numeric'
         ]);

        if ($validator->fails()) {
            return $this->returnError($validator->errors()->first(), ["Validation failed"],422);
        }

        $customer = Customer::find(Auth::user()->customer_id);
        if(!$customer){
            return $this->returnError("Please log in as a customer",[""], 422);
        }

        $customer->country_id = $request->input('country_id');
        $customer->zone_id =  $request->input('zone_id');
        $customer->region_id =  $request->input('region_id');
        $customer->district_id =  $request->input('district_id');
        $customer->place_id =  $request->input('place_id');
        $customer->save();

        return $this->returnResponse('Address updated',"");
    }


}




























