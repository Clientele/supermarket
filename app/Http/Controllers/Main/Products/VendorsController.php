<?php

namespace App\Http\Controllers\Main\Products;

use App\Http\Controllers\Main\GoodBaseController;
use App\Models\Depot;
use App\Models\User;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class VendorsController extends GoodBaseController
{

    public function __construct(){

    }


    public function addVendor(Request $request){

        Log::debug($request->all());

        $vendor = Vendor::updateOrCreate([
            'id'=>$request->input('id'),
        ],[
            'vendor_name'=>$request->input('vendor_name'),

            'country_id'=>$request->input('country_id'),
            'zone_id'=>$request->input('zone_id'),
            'region_id'=>$request->input('region_id'),
            'district_id'=>$request->input('district_id'),
            'place_id'=>$request->input('place_id'),

            'email'=>$request->input('email'),
            'phone_number_1'=>$request->input('phone_number_1'),
            'phone_number_2'=>$request->input('phone_number_2'),

            'created_by'=> Auth::id()
         ]);

        return $this->returnResponse('Vendor Added',$vendor);
    }

    public function removeVendor(Request $request){
        $vendor = Vendor::destroy($request->input('id'));
        return $this->returnResponse('Vendor removed',$vendor);
    }

    public function toggleVendorStatus(Request $request){
        $vendor = Vendor::where([
            'id' => $request->input('id')
        ])->update([
            'is_active'=> $request->input('is_active')
        ]);
        return $this->returnResponse('Vendor remove',$vendor);
    }




}


