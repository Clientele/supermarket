<?php

namespace App\Http\Controllers\Main\Resources;

use App\Http\Controllers\Main\GoodBaseController;
use App\Models\Customer;
use App\Models\Branch;
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
    public function getOrders(Request $request){
        #TODO: check permissions
        $canViewAllOrder = true;

        $orderChannel =  $request->input('order_channel');
        $regionFilter = " orders.id > 0 ";
        $regionId = $request->input('region_id');
        if (is_numeric($regionId)) {
            $regionFilter = " orders.delivery_region_d = ".$regionId;
        }

        $approvalFilter = "is_approved = 0 ";
        $cancellationFilter = " is_cancelled = 0 ";

        if($request->input('include_approved')==1){
            $approvalFilter = " is_approved = 1 "; #get all
        }

        if($request->input('include_cancelled')==1){
            $cancellationFilter = " is_cancelled = 1 "; #get all
        }

        if($orderChannel==2 || $orderChannel==3 || $orderChannel==4){
            $channelFilter = " order_channel = ".$orderChannel." ";
        }else{
            $channelFilter = " orders.id IS NOT NULL "; #get all
        }

        if(!$canViewAllOrder ||$orderChannel==1 ){
            $salesPersonFilter = " sales_person_id = ". Auth::user()->staff_id." ";
        }else{
            $salesPersonFilter = " orders.id IS NOT NULL "; #get all
        }

        if (!(Auth::user()->staff_id)) {
            return $this->returnError("You do not have permission to view any order ", " ", 403);
        }

        /**get logged staff orders **/
        $orders = Order::whereRaw($salesPersonFilter)
            ->whereRaw($channelFilter)
            ->whereRaw($regionFilter)
            ->whereRaw($approvalFilter)
            ->whereRaw($cancellationFilter)
            ->with(['order_products','staff', 'customer', 'region', 'district', 'place'])
            ->latest()->paginate(20);

        foreach ($orders as $order){
            $order->delivered_items = $order->order_products->sum('has_delivered');
        }

        $responseData['orders'] = $orders;
        return $this->returnResponse('Orders ', $responseData);
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





