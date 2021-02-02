<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\GoodBaseController;
use App\Models\CartProduct;
use App\Models\Customer;
use App\Models\District;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\Product;
use App\Models\ProductAssignedCategory;
use App\Models\ProductVariant;
use App\Models\ProductVariantPrice;
use App\Models\User;
use App\Utils\GoodOrderChannels;
use App\Utils\GoodOrderStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class CustomerOrdersController extends GoodBaseController{

    public function __construct(){

    }


    public function submitOrder(Request $request){

        $customer = Customer::find(Auth::user()->customer_id);
        if(!$customer){
            return $this->returnError("Login as customer","",403);
        }

        $order = Order::create([
            'customer_id'=>$customer->id,
            'sales_person_id'=>null,
            'delivered_by'=>null,

            'order_status'=>GoodOrderStatus::$STAFF_STATUS_PENDING,

            'order_value',
            'total_discount',
            'amount_due',

            'order_channel'=> GoodOrderChannels::$ORDER_CHANNEL_CUSTOMER_APP,
            'approve_by'=> null,
            'created_by'=> Auth::id(),
        ]);

        $cartProducts  = CartProduct::where([
            'customer_id' => $customer->id
        ])->get();

        if(count($cartProducts)==0){
            return $this->returnError("Your cart is empty","",400);
        }


        $oneCartProduct = $cartProducts[0];
        $order->delivery_zone_id = $oneCartProduct->delivery_zone_id;
        $order->delivery_region_id =  $oneCartProduct->delivery_region_id;
        $order->delivery_district_id =  $oneCartProduct->delivery_district_id;
        $order->delivery_place_id =  $oneCartProduct->delivery_place_id;
        $order->save();

        /** Convert Cart products to ordered products **/
        foreach ($cartProducts as $cartProduct){

            /**  check product variant existence */
            $productVariant = ProductVariant::find($cartProduct->product_variant_id);
            if(!$productVariant){
             Log::error("Not found, Product variant ID".$cartProduct->product_variant_id);
             return  $this->returnError("Your order includes a removed product, please empty your cart first", "",400);
            }

            /**  check zonal price */
            $productVariantPrice = ProductVariantPrice::where([
                'zone_id'=> $order->delivery_zone_id,
                'product_variant_id' => $productVariant->id,
            ])->first();


            OrderProduct::create([
                'order_id'=>$order->id,
                'customer_id'=>$customer->id,
                'vendor_id'=>$productVariant->vendor_id,
                'product_id'=>$productVariant->product_id,
                'product_variant_id'=>$productVariant->id,

                'ordered_quantity'=> $cartProduct->quantity,
                'delivered_quantity'=> 0,

                'selling_price_id'=>$productVariantPrice? $productVariantPrice->id : null,
                'selling_price'=>$productVariantPrice? $productVariantPrice->amount : $productVariant->base_price,
                'discount_id'=>null,
                'discount_amount'=> 0,

                'created_by'=>Auth::id()
            ]);
        }

        /** Order Financial Values */
        $orderedProducts = OrderProduct::where(['order_id' => $order->id])->get();

        $order->order_value = $orderedProducts->sum('selling_price');
        $order->total_discount = $orderedProducts->sum('discount_amount');
        $order->amount_due =  ($order->order_value) - ($order->total_discount);
        $order->save();

        /** Clear cart */
        CartProduct::where(['customer_id' => $customer->id])->delete();

        return $this->returnResponse("Order placed successfully", "Order placed");
    }

    public function getOrderHistory(Request $request){

        $responseData['orders'] = Order::where(['customer_id'=> Auth::user()->customer_id])->latest()->paginate(10);

        return $this->returnResponse("Orders history", $responseData);

    }

    public function getOrderDetails(Request $request){

        $responseData['order'] = Order::find($request->input('id'));
        if(!$responseData['order']){
            return $this->returnError("Order Not found", ["Not found"], 404);
        }
        return $this->returnResponse("Orders Details", $responseData);

    }

}




























