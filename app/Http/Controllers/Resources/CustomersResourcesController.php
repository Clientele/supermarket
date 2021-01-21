<?php

namespace App\Http\Controllers\Resources;

use App\Http\Controllers\GoodBaseController;
use App\Models\Customer;
use App\Models\Depot;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\Staff;
use App\Models\User;
use App\Models\Vehicle;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class CustomersResourcesController extends GoodBaseController
{

    public function __construct(){
        // $this->middleware('auth');
       // sleep(1);
    }

    /** Vendors **/
    public function getCustomers(Request $request){

        $regionId = $request->input('region_id');
        if(is_numeric($regionId)){
            $query = " ";
        }
        $customers = Customer::with(['region','district','place'])->paginate(500);

        $responseData['customers'] = $customers;
        return $this->returnResponse('Customers ', $responseData);
    }



}





