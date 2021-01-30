<?php

namespace App\Http\Controllers\Resources;

use App\Http\Controllers\GoodBaseController;
use App\Models\Customer;
use App\Models\Depot;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\Staff;
use App\Models\User;
use App\Models\Vehicle;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class OrdersResourcesController extends GoodBaseController
{

    public function __construct()
    {
        // $this->middleware('auth');
        // sleep(1);
    }

    /** Vendors **/
    public function getOrders(Request $request)
    {

        #TODO: check permissions
        $canViewAllOrder = true;

        if (!$canViewAllOrder) {
            if (!(Auth::user()->staff_id)) {
                return $this->returnError("You do not have permission to view any order ", " ", 403);
            }

            $orders = Order::where(['sales_person_id' => Auth::user()->staff_id])->with(['staff', 'customer', 'region', 'district', 'place'])
                ->latest()->paginate(50);
        }


        $query = " orders.id > 0 ";
        $regionId = $request->input('region_id');
        if (is_numeric($regionId)) {
            $query = " orders.delivery_region_d = ".$regionId;
        }

        $orders = Order::whereRaw($query)->with(['staff', 'customer', 'region', 'district', 'place'])
            ->latest()->paginate(50);

        $responseData['orders'] = $orders;
        return $this->returnResponse('Customers ', $responseData);
    }


    public function getOrderDetails(Request $request)
    {
        $order = Order::where(['id' => $request->input('id')])
            ->with(['staff', 'customer', 'region', 'district', 'place', 'order_products'])->first();

        if (!$order) {
            return $this->returnError('Order not found', " ", 422);
        }

        foreach ($order->order_products as $orderProduct) {
            $orderProduct->product;
            $orderProduct->variant;
        }

        $responseData['order'] = $order;
        return $this->returnResponse('Order details ', $responseData);
    }


}





