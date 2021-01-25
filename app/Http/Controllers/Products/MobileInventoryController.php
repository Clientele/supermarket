<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\GoodBaseController;
use App\Models\Depot;
use App\Models\DepotProduct;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class InventoryController extends GoodBaseController
{

    public function __construct(){
    }

    public function receiveStock(Request $request){

        $productVariant = ProductVariant::find($request->input('product_variant_id'));
        if(!$productVariant){
          return $this->returnError('Product Variant Not Found'," ",404);
        }

       $depotProduct =   DepotProduct::create([
            'depot_id' => $request->input('depot_id'),
            'vendor_id' => $productVariant->vendor_id ,
            'product_id' => $productVariant->product_id,
            'product_variant_id' => $productVariant->id,

            'received_quantity' => $request->input('received_quantity'),
            'remaining_quantity' => $request->input('received_quantity'),

            'batch_number' => $request->input('batch_number'),
            'expiry_date' => Carbon::parse($request->input('expiry_date')),
            'received_at' => Carbon::now(),
            'receiver_id' => Auth::id(),
            'created_by' => Auth::id(),
         ]);

         return $this->returnResponse('Depot Product Added', $depotProduct);
    }

    public function getStock(Request $request){

        $depotId = $request->input('depot_id');
        $catId = $request->input('category_id');

        $categoryQuery = " category_id > 0";
        if(is_numeric($catId)){
            $categoryQuery  = " category_id = ".$catId." ";
        }

        $depotQuery = " depot_id > 0";
        if(is_numeric($depotId)){
            $depotQuery  = " depot_id = ".$depotId." ";
        }

        $products = Product::whereHas('categories', function($queryBuilder) use($categoryQuery){
            $queryBuilder->whereRaw($categoryQuery);
        })->with('variants')->paginate(500);

        foreach ($products as $product) {
            $product->remaining_quantity = DepotProduct::where(['product_id' => $product->id])
                                            ->whereRaw($depotQuery)
                                            ->sum('remaining_quantity');

            foreach ($product->variants as $variant) {
                $variant->remaining_quantity = DepotProduct::where(['product_variant_id' => $variant->id])
                                                ->whereRaw($depotQuery)
                                                ->sum('remaining_quantity');
            }
        }

        $responseData['products'] = $products;
        return $this->returnResponse('Products ', $responseData);
    }

    public function getVariantStocks(Request $request){

        $depotId = $request->input('depot_id');
        $depotQuery = " depot_id > 0";
        if(is_numeric($depotId)){
            $depotQuery  = " depot_id = ".$depotId." ";
        }

        $productVariants = ProductVariant::where([
            'product_id'=>$request->input('product_id'),
        ])->get();

         foreach ($productVariants as $variant) {
            $variant->remaining_quantity = DepotProduct::where(['product_variant_id' => $variant->id])
                ->whereRaw($depotQuery)
                ->sum('remaining_quantity');
         }

        $responseData['variants'] = $productVariants;
        return $this->returnResponse('Product Stock ', $responseData);
    }

    public function getVariantStocksBreakdown(Request $request){
        $variant = ProductVariant::find($request->input('variant_id'));
        if(!$variant){
            return $this->returnError('Product Variant Not found', "", 404);
        }
        $responseData['depot_products'] = DepotProduct::where(['product_variant_id' => $variant->id])->get();
        return $this->returnResponse('Product Variant Depot Stock', $responseData);

    }



}


