<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\GoodBaseController;
use App\Models\Depot;
use App\Models\Product;
use App\Models\ProductAssignedCategory;
use App\Models\ProductCategory;
use App\Models\ProductVariant;
use App\Models\User;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ProductsVariantsController extends GoodBaseController
{

    public function __construct(){

    }


    /*** Product Variants **/
    public function addProductVariant(Request $request){

        $product = Product::find($request->input('product_id'));
        if(!$product){
            return $this->returnError("Invalid Parent Product", ["Invalid Product"] );
        }

        $product = ProductVariant::create([
            'product_id'=>$product->id,
            'vendor_id'=>$product->vendor_id,

            'variant_name'=>$request->input('variant_name'),
            'base_price'=>$request->input('base_price'),
            'measuring_unit'=>$request->input('measuring_unit'),
            'restocking_quantity'=>$request->input('restocking_quantity'),
            'is_published'=> false,

            'thumbnail_img'=> null,
            'created_by'=> Auth::id()
        ]);

        return $this->returnResponse('Product Variant Added',$product);
    }

    public function updateProductVariant(Request $request){

        ///TODO: save image
        $thumbNailUrl = "";

        $product = ProductVariant::where([
            'id'=>$request->input('id'),
        ])->update([
            'variant_name'=>$request->input('variant_name'),
            'base_price'=>$request->input('base_price'),
            'restocking_quantity'=>$request->input('restocking_quantity'),
            'measuring_unit'=>$request->input('measuring_unit'),
            'thumbnail_img'=> $thumbNailUrl,
        ]);

        return $this->returnResponse('Product Variant Updated',$product);
    }

    public function toggleVariantStatus(Request $request){
        $product = ProductVariant::where([
            'id' => $request->input('id')
        ])->update([
            'is_published'=> $request->input('is_published')
        ]);
        return $this->returnResponse('Product Variant status changed',$product);
    }

    public function removeProductVariant(Request $request){
        $product = ProductVariant::destroy($request->input('id'));
        return $this->returnResponse('Product variant removed',$product);
    }




}


