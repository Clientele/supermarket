<?php

namespace App\Http\Controllers\Main\Sales;

use App\Http\Controllers\Main\GoodBaseController;
use App\Models\Customer;
use App\Models\Branch;
use App\Models\DepotProduct;
use App\Models\District;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\PriceDiscount;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\ProductVariantPrice;
use App\Models\Sale;
use App\Models\TruckedProduct;
use App\Models\User;
use App\Models\Vendor;
use App\Utils\GoodConstants;
use App\Utils\GoodOrderStatus;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class SalesController extends GoodBaseController{

    public function __construct(){ }

    public function addSale(Request $request){

        #check products
        if (!is_array($request->input('product_ids'))) {
            return $this->returnError("Sold products should be in an array", " ", 412);
        }

        $orderChannel =  $request->input('order_channel',4);

        $products = $request->input('product_ids');
        foreach ($products as $soldProduct) {

            $product = Product::find($soldProduct['id']);
            Sale::create([
                'order_id'=>$request->input(''),
                'customer_id'=>$request->input(''),
                'product_id'=>$request->input(''),
                'product_variant_id'=>$request->input(''),

                'ordered_quantity'=>$request->input(''),
                'delivered_quantity'=>$request->input(''),

                'selling_price_id'=>$request->input(''),
                'selling_price'=>$request->input(''),
                'discount_amount'=>0,

                'created_by' => Auth::id()
            ]);

         }

        return $this->returnResponse('Sales Recorded', " ");
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
        $staffId = Auth::user()->staff_id ;
        if(!is_numeric($staffId)){
            return $this->returnError("You are not a Staff",[""],403);
        }

        $orderProduct = OrderProduct::find($request->input('order_product_id'));

        if (!$orderProduct) {
            return $this->returnError("Order product not found", [], 422);
        }

        $truckedProducts = TruckedProduct::where(['product_variant_id' => $orderProduct->product_variant_id])
            ->where('remaining_quantity', '>', 0)
            ->where('staff_id', $staffId)
            ->groupBy('product_variant_id')
            ->select(
                'product_variant_id', 'product_id',
                DB::raw("sum(received_quantity) as received_quantity"),
                DB::raw("sum(remaining_quantity) as remaining_quantity")
            )
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

        $orderProduct->has_delivered = true;
        $orderProduct->save();

        $orderProduct->increment('delivered_quantity', $deliveredQuantity);
        $truckedProduct->decrement('remaining_quantity', $deliveredQuantity);

        return $this->returnResponse("Product delivered", $truckedProduct);
    }


}


