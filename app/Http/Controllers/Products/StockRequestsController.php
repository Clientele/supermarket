<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\GoodBaseController;
use App\Models\Depot;
use App\Models\DepotProduct;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\StockRequest;
use App\Models\StockRequestProduct;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class StockRequestsController extends GoodBaseController
{

    public function __construct()
    {
    }


    public function requestStock(Request $request)
    {

        if (!is_array($request->input('product_variants'))) {
            return $this->returnError("An array of product variants is required  ", "", 422);
        }

        $staff =  Auth::user()->staff ;
        if(!($staff)){
            return $this->returnError("Only staff can request products", "", 422);
        }

        $depot = Depot::find($request->input('depot_id'));
        if (!$depot) {
            return $this->returnError("Depot not found  ", "", 422);
        }

        $stockRequest = StockRequest::create([
            'staff_id' => $staff->id,
            'created_by' => Auth::id(),
        ]);

        $variants = $request->input('product_variants');
        foreach ($variants as $variant) {
            $productVariant = ProductVariant::find($variant['variant_id']);
            if(!$productVariant){
                return $this->returnError("Product variant not found  ", "", 422);
            }

            StockRequestProduct::create([
                'product_variant_id' => $productVariant->id,
                'product_id' => $productVariant->product_id,
                'request_id' => $stockRequest->id,
                'staff_id' => $staff->id,
                'created_by' => Auth::id(),
                'quantity' => $variant['quantity']
            ]);

        }

        $responseData['requests'] = $stockRequest;
        return $this->returnResponse('Stock Requests', $responseData);
    }

    public function getStockRequests(Request $request)
    {
        $stockRequests = StockRequest::with(['staff','request_product'])->paginate(20);
        $responseData['requests'] = $stockRequests;
        return $this->returnResponse('Stock Requests ', $responseData);
    }

    public function getStockRequestDetails(Request $request){
        $request = StockRequest::find($request->input('id'))
            ->with(['request_product','request_product'])->first();
        $responseData['request'] = $request;
        return $this->returnResponse('Stock Request ', $responseData);
    }


}


