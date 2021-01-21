<?php

namespace App\Http\Controllers\Sales;

use App\Http\Controllers\GoodBaseController;
use App\Models\Customer;
use App\Models\Depot;
use App\Models\DepotProduct;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\User;
use App\Models\Vendor;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CustomersController extends GoodBaseController
{

    public function __construct(){
    }

    public function addCustomer(Request $request){

        $customer = Customer::updateOrCreate([
            'id' => $request->input('id')
        ],[
            'customer_name' => $request->input('customer_name'),
            'email' => $request->input('email'),
            'phone_number_1' => $request->input('phone_number_1'),
            'phone_number_2' => $request->input('phone_number_2'),

            'country_id' => $request->input('country_id'),
            'zone_id' => $request->input('zone_id'),
            'region_id' => $request->input('region_id'),
            'district_id' => $request->input('district_id'),
            'place_id' => $request->input('place_id'),

            'created_by' => Auth::id()
         ]);

        return $this->returnResponse('Customer Added', $customer);
    }

    public function removeCustomer(Request $request){
        $customer= Customer::destroy($request->input('id'));
        return $this->returnResponse('Customer removed',$customer);
    }


}


