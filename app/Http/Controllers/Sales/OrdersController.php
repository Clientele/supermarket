<?php

namespace App\Http\Controllers\Sales;

use App\Http\Controllers\GoodBaseController;
use App\Models\Customer;
use App\Models\Depot;
use App\Models\DepotProduct;
use App\Models\District;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\PriceDiscount;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\ProductVariantPrice;
use App\Models\User;
use App\Models\Vendor;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class OrdersController extends GoodBaseController
{

    public function __construct()
    {
    }

    public function addOrder(Request $request)
    {

        #check district
        $district = District::find($request->input('district_id'));
        if (!$district) {
            return $this->returnError("The order should contain district ID", [""], 422);
        }

        #check zone
//        if(!($district->zone_id)){
//            return  $this->returnError("The district does not belong to any sales zone",[""],422);
//        }

        #check products
        if (!is_array($request->input('product_variants'))) {
            return $this->returnError("Order products should be in an array", " ", 422);
        }

        $order = Order::create([
            'customer_id' => $request->input('customer_id'),

            'delivery_zone_id' => $district->zone_id,
            'delivery_region_d' => $request->input('region_id'),
            'delivery_district_id' => $request->input('district_id'),
            'delivery_place_id' => $request->input('place_id'),

            'is_delivered' => false,
            'order_status' => "Pending",
            'is_cancelled' => false,
            'created_by' => Auth::id()
        ]);


        $productVariants = $request->input('product_variants');
        foreach ($productVariants as $orderedVariant) {

            $productVariant = ProductVariant::find($orderedVariant['id']);
            if ($productVariant) {

                /** check price  */
                $variantPrice = ProductVariantPrice::where([
                    'zone_id' => $order->delivery_zone_id,
                    'product_variant_id' => $orderedVariant['id']
                ])->first();

                /** check if discount  available */
                $priceDiscount = PriceDiscount::where([
                    'is_for_one_variant' => true,
                    'applicable_zone_id' => $order->delivery_zone_id,
                    'product_variant_id' => $orderedVariant['id']
                ])->first();


                OrderProduct::create([
                    'order_id' => $order->id,
                    'customer_id' => $request->input('customer_id'),
                    'vendor_id' => $productVariant->vendor_id,
                    'product_id' => $productVariant->product_id,
                    'product_variant_id' => $productVariant->id,

                    'ordered_quantity' => $orderedVariant['quantity'],
                    'delivered_quantity' => 0,

                    'selling_price_id' => $variantPrice ? $variantPrice->id : 0,
                    'selling_price' => $variantPrice ? $variantPrice->amount : $productVariant->base_price,

                    'discount_id' => $priceDiscount ? $priceDiscount->id : null,
                    'discount_amount' => $priceDiscount ? $priceDiscount->amount : 0,

                    'has_delivered' => false,
                    'delivered_by' => null,
                    'created_by' => Auth::id()
                ]);

            }
        }


        return $this->returnResponse('Order placed Added', $order);
    }

    public function setStaff(Request $request)
    {
        $order = Order::where([
            'id'=>$request->input('id')
        ])->update([
            'sales_person_id'=>$request->input('staff_id')
        ]);
        return $this->returnResponse('Order updated', $order);
    }

    public function removeOrder(Request $request)
    {
        $order = Order::destroy($request->input('id'));
        return $this->returnResponse('Customer removed', $order);
    }

    public function cancelOrder(Request $request)
    {
        $order = Order::where([
            'id'=>$request->input('id')
        ])->update([
            'is_cancelled'=> true,
            'order_status'=> "Cancelled",
            'cancellation_reason'=> $request->input('cancellationReason'),
        ]);
        return $this->returnResponse('Order updated', $order);
    }


}


