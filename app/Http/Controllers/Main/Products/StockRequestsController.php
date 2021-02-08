<?php

namespace App\Http\Controllers\Main\Products;

use App\Http\Controllers\Main\GoodBaseController;
use App\Models\Depot;
use App\Models\DepotProduct;
use App\Models\GoodObject;
use App\Models\OrderProduct;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\StockRequest;
use App\Models\StockRequestProduct;
use App\Models\TruckedProduct;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class StockRequestsController extends GoodBaseController
{

    public function __construct(){

    }

    public function getGroupedOrderedVariants(Request $request){

        #TODO: check permissions
        $staffId = Auth::user()->staff_id;
        if(!$staffId){
            return $this->returnError('You do not have permission to request products', [""], 403);
        }

        $orderedProducts = OrderProduct::where([
            'is_rejected' => false,
            'has_requested_products' => false
        ])
        ->whereHas('order', function ($query) use($staffId) {
            $query->where('sales_person_id', $staffId);
         })
         ->with(['order','product','variant'])
         ->get();


        foreach ($orderedProducts as $orderedProduct){
            if($orderedProduct->order){
                $orderedProduct->order->customer;
            }
        }

        $groupedVariants = $orderedProducts->groupBy('product_variant_id');

        $orderedVariants = $groupedVariants->map(function ($items, $key) {
            $orderedVariant                       = new GoodObject();
            $orderedVariant->product_variant_id   = $key;
            $orderedVariant->quantity             = $items->sum('ordered_quantity');
            $orderedVariant->variant              = $items[0]->variant ;
            $orderedVariant->product              = $items[0]->product ;
            $orderedVariant->ordered_products_ids = $items->pluck('id') ;
            $orderedVariant->ordered_products     = $items ;
            return $orderedVariant;
        });

        $responseData['ordered_variants'] = array_values($orderedVariants->toArray());
        return $this->returnResponse('Ordered Variants', $responseData);

    }

    public function requestStock(Request $request)
    {

        if (!is_array($request->input('product_variants'))) {
            return $this->returnError("An array of product variants is required  ", "", 422);
        }

        $staff = Auth::user()->staff;
        if (!($staff)) {
            return $this->returnError("Only staff can request products", "", 422);
        }

        $depotID = $request->input('depot_id');
        $depot = Depot::find( is_numeric($depotID)? $depotID : $staff->default_depot_id);
        if (!$depot) {
            return $this->returnError("Depot not found  ", "", 422);
        }

        $stockRequest = StockRequest::create([
            'staff_id' => $staff->id,
            'depot_id' => $depot->id,
            'created_by' => Auth::id(),
        ]);

        $variants = $request->input('product_variants');
        foreach ($variants as $variant) {
            $productVariant = ProductVariant::find($variant['variant_id']);
            if (!$productVariant) {
                return $this->returnError("Product variant not found  ", "", 422);
            }

            StockRequestProduct::create([
                'product_variant_id' => $productVariant->id,
                'product_id' => $productVariant->product_id,
                'request_id' => $stockRequest->id,
                'staff_id' => $staff->id,
                'created_by' => Auth::id(),
                'quantity' => $variant['quantity'],
                'ordered_products_ids' =>  json_encode($variant['ordered_products_ids'])
            ]);

           if(is_array($variant['ordered_products_ids'])){
               OrderProduct::whereIn('id',$variant['ordered_products_ids'])
                   ->update([ 'has_requested_products' => true]);
           }

        }

        $responseData['requests'] = $stockRequest;
        return $this->returnResponse('Stock Requested', $responseData);
    }

    public function getStockRequests(Request $request)
    {
        $stockRequests = StockRequest::with(['staff'])->latest()->paginate(20);
        $responseData['requests'] = $stockRequests;
        return $this->returnResponse('Stock Requests ', $responseData);
    }

    public function getStockRequestDetails(Request $request)
    {
         $productRequest = StockRequest::where([
             'id'=>$request->input('id')
         ])->with(['staff', 'request_products'])->first();

        if(!$productRequest){
          return $this->returnError("Request not found","",422) ;
        }

        foreach ($productRequest->request_products as $request_product) {
            $request_product->product;
            $request_product->variant;
        }

        $responseData['request'] = $productRequest;
        return $this->returnResponse('Stock Request ', $responseData);
    }

    public function getStockRequestHistory(Request $request){
        $staff = Auth::user()->staff;
        if (!($staff)) {
            return $this->returnError("Only staff can access this feature", "", 422);
        }

        try{
            $requestDate = Carbon::parse($request->input('request_date'));
        }catch (\Exception $exception){
            $requestDate = Carbon::now();
            Log::debug($exception);
        }

        $requestedVariants = StockRequestProduct::where(['staff_id' => $staff->id])
            ->whereDate('created_at',$requestDate)
            ->with(['product','variant'])
            ->orderBy('created_at','DESC')
            ->orderBy('product_id')
            ->paginate(10);

        $responseData['requested_variants'] = $requestedVariants;
        return $this->returnResponse('Grouped requested variants', $responseData);
    }

    public function getStockRequestHistoryDetails(Request $request){

        $orderedProducts = OrderProduct::whereIn('id',$request->input('ordered_products_id'))
            ->get();

        $responseData['ordered_products'] = $orderedProducts;
        return $this->returnResponse('Grouped requested variants', $responseData);
    }


    /** Approval & Dispatch  **/
    public function approveRequest(Request $request)
    {
         $productRequest = StockRequest::where([
             'id'=>$request->input('id')
         ])->update([
             'approved'=>true
         ]);

         StockRequestProduct::where([
            'request_id' => $request->input('id')
           ])->update([
            'is_approved' => true
         ]);

         return $this->returnResponse('Stock Request ', $productRequest);
    }

    public function getAvailableDepotProducts(Request $request){

        $requestedProduct = StockRequestProduct::find($request->input('requested_product_id'));

         if(!$requestedProduct){
            return $this->returnError("Requests  not found","",422);
        }

        $depotRemainingProducts =  DepotProduct::where([
            'depot_id'=>$request->input('depot_id'),
            'product_variant_id'=> $requestedProduct->product_variant_id
        ])->where('remaining_quantity','>',0)
            ->orderBy('expiry_date','DESC')
            ->with(['product','variant'])->take('5')->get();

        return $this->returnResponse("Products",$depotRemainingProducts);

    }

    public function dispatchRequest(Request $request){

        $quantity = $request->input('quantity') ;

        $requestedProduct = StockRequestProduct::find($request->input('requested_product_id'));
        if(!$requestedProduct){
            return $this->returnError("Products","",422);
        }

        $depotProduct =  DepotProduct::find($request->input('depot_product_id'));
        if(!$depotProduct){
            return $this->returnError("Depot product not found","",422);
        }

        if($depotProduct->remaining_quantity < $quantity ) {
            return $this->returnError("Not enough stock","",422);
        }


        $remained = ($requestedProduct->quantity - $requestedProduct->dispatched_quantity);
        if($quantity > $remained ){
             return $this->returnError("Only ".$remained." remained","",422);
        }

        $requestedProduct->request;
        if(!($requestedProduct->request)){
            return $this->returnError("Could not determine receiving staff ","",422);
        }


        $truckedProduct =  TruckedProduct::create([
           'original_depot_id' => $depotProduct->depot_id,
           'product_id'=> $depotProduct->product_id,
           'product_variant_id'=> $depotProduct->product_variant_id,
           'staff_id'=> $requestedProduct->request->staff_id,

           'received_quantity' =>  $quantity,
           'remaining_quantity' =>  $quantity,
           'created_by' => Auth::id()
         ]);

        $depotProduct->decrement('remaining_quantity',$quantity);
        $requestedProduct->increment('dispatched_quantity',$quantity);

        /**Update request status **/
        $stockRequest = StockRequest::find($requestedProduct->request_id);
        $undispatchedRequests =StockRequestProduct::where(['request_id'=>$stockRequest->id])
            ->whereColumn('quantity','!=','dispatched_quantity')
            ->get();

        if(count($undispatchedRequests)==0){
            $stockRequest-> dispatched = true;
            $stockRequest->save();
        }

        return $this->returnResponse("Dispatched",$truckedProduct);

    }

}





