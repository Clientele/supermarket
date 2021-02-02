<?php

namespace App\Http\Controllers\Main\Sales;

use App\Http\Controllers\Main\GoodBaseController;
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
use App\Models\TruckedProduct;
use App\Models\User;
use App\Models\Vendor;
use App\Utils\GoodConstants;
use App\Utils\GoodOrderStatus;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class OrdersController extends GoodBaseController
{

    public function __construct(){
    }

    public function addOrder(Request $request){

        #TODO: check district
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

        $orderChannel =  $request->input('order_channel',4);

        $order = Order::create([
            'customer_id' => $request->input('customer_id'),
            'sales_person_id' => $orderChannel == 4 ? null : Auth::user()->staff_id ,

            'delivery_zone_id' => $district->zone_id,
            'delivery_region_d' => $request->input('region_id'),
            'delivery_district_id' => $request->input('district_id'),
            'delivery_place_id' => $request->input('place_id'),

            'order_channel' => $request->input('order_channel',4),

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
            'id' => $request->input('id')
        ])->update([
            'sales_person_id' => $request->input('staff_id')
        ]);
        return $this->returnResponse('Order updated', $order);
    }

    public function removeOrder(Request $request)
    {
        $order = Order::destroy($request->input('id'));
        return $this->returnResponse('Customer removed', $order);
    }

    public function approveOrder(Request $request){
        $orderId = $request->input('id');
        $order = Order::find($orderId);

        if(!$order){
            return $this->returnError("Order not found",[""], 404);
        }

        if(!($order->sales_person_id)){
            return $this->returnError("No sales person assigned",[""], 422);
        }

        $order = Order::where([
            'id' => $orderId
        ])->update([
            'is_approved' => true,
            'order_status' => GoodOrderStatus::$ORDER_STATUS_APPROVED,
            'approve_by' => Auth::id()
         ]);

        return $this->returnResponse('Order approved', $order);
    }

    public function rejectOrderItem(Request $request)
    {
        $order = OrderProduct::where([
            'id' => $request->input('id')
        ])->update([
            'is_rejected' => true
        ]);
        return $this->returnResponse('Order product updated', $order);
    }

    public function cancelOrder(Request $request)
    {
        $order = Order::where([
            'id' => $request->input('id')
        ])->update([
            'is_cancelled' => true,
            'order_status' => "Cancelled",
            'cancellation_reason' => $request->input('cancellationReason'),
        ]);
        return $this->returnResponse('Order updated', $order);
    }


    /*** Delivery **/
    public function getAvailableTruckedProducts(Request $request)
    {
        $orderProduct = OrderProduct::find($request->input('order_product_id'));

        if (!$orderProduct) {
            return $this->returnError("Order product not found", [], 422);
        }

        $truckedProducts = TruckedProduct::where([
            'product_variant_id' => $orderProduct->product_variant_id
        ])
            ->where('remaining_quantity', '>', 0)
            ->with(['product', 'variant'])->take(3)->get();

        return $this->returnResponse("Available trucked products", $truckedProducts);
    }

    public function deliverProduct(Request $request)
    {
        $deliveredQuantity = $request->input('quantity');
        $orderProduct = OrderProduct::find($request->input('order_product_id'));
        if (!$orderProduct) {
            return $this->returnError("Order product not found", [], 422);
        }

        $truckedProduct = TruckedProduct::find($request->input('trucked_product_id'));
        if (!$truckedProduct) {
            return $this->returnError("Trucked product not found", [], 422);
        }

        if ($truckedProduct->remaining_quantity < $deliveredQuantity) {
            $rem = $truckedProduct->remaining_quantity;
            return $this->returnError("Only " . $rem . " products Remained", [], 422);
        }

        $quantityToDeliver = $orderProduct->ordered_quantity - $orderProduct->delivered_quantity;
        if ($deliveredQuantity > $quantityToDeliver) {
            return $this->returnError("Only " . $quantityToDeliver . " remained to deliver", [], 422);
        }

        $orderProduct->increment('delivered_quantity', $deliveredQuantity);
        $truckedProduct->decrement('remaining_quantity', $deliveredQuantity);

        return $this->returnResponse("Product delivered", $truckedProduct);
    }


}


