<?php

namespace App\Http\Controllers\Main\Resources;

use App\Http\Controllers\Main\GoodBaseController;
use App\Models\Customer;
use App\Models\Depot;
use App\Models\Order;
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

    public function findCustomer(Request $request){

        $query= "%". $request->input('query') ."%";

        $customers = Customer::where('customer_name','like',$query)
            ->orWhere('email','like',$query)
            ->orWhere('phone_number_1','like',$query)
            ->orWhere('phone_number_2','like',$query)
            ->with(['region','district','place'])->take(20)->get();

        $responseData['customers'] = $customers;
        return $this->returnResponse('Customers ', $responseData);
    }

    public function getCustomerDetails(Request $request){

        $customer = Customer::where('id',$request->input('id'))
            ->with(['creator','region','district','place'])->first();

        $responseData['customer'] = $customer;
        return $this->returnResponse('Customers ', $responseData);
    }

    public function getCustomerOrders(Request $request){
        $customer = Order::where('customer_id',$request->input('customer_id'))
            ->with(['creator','order_products','region','district','place'])->paginate(50);

        $responseData['orders'] = $customer;
        return $this->returnResponse('Customers ', $responseData);

    }




}





