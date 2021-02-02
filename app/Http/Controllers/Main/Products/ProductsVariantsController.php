<?php

namespace App\Http\Controllers\Main\Products;

use App\Http\Controllers\Main\GoodBaseController;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductVariant;
use App\Models\ProductVariantPrice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;


class ProductsVariantsController extends GoodBaseController{

    public function __construct(){ }

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
            'description'=> $request->input('description'),
            'img_url'=> "https://image.flaticon.com/icons/png/512/916/916762.png",
            'created_by'=> Auth::id()
        ]);

        return $this->returnResponse('Product Variant Added',$product);
    }

    public function updateProductVariant(Request $request){
        $validator = Validator::make($request->all(), [
            'variant_name' => 'required|max:14',
            'base_price' => 'required|numeric',
            'restocking_quantity' => 'required|numeric',
            'measuring_unit' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->returnError($validator->errors()->first(), ["Validation failed"],400);
        }

        $product = ProductVariant::where([
            'id'=>$request->input('id'),
        ])->update([
            'variant_name'=>$request->input('variant_name'),
            'base_price'=>$request->input('base_price'),
            'restocking_quantity'=>$request->input('restocking_quantity'),
            'measuring_unit'=>$request->input('measuring_unit'),
            'description'=> $request->input('description')
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

    public function updateVariantImage(Request $request){

        $isThumbnailImage = $request->input('is_thumbnail')=='true';

        $folder = 'public/product/variant';
        $storedPath = $request->file('file')->store($folder, 's3');

        $productVariant = ProductVariant::find($request->input('id'));
        if(!$productVariant){
            return $this->returnError("Product variant not found","", 422);
        }

        ProductImage::create([
            'product_variant_id'=>$request->input('id'),
            'url'=>  Storage::disk('s3')->url($storedPath),
            'created_by'=> Auth::id()
         ]);


        if($productVariant->img_url == null || $isThumbnailImage ){
            $product = ProductVariant::where([
                'id'=>$request->input('id'),
            ])->update([
                'thumbnail_img'=>  $storedPath,
                'img_url'=>  Storage::disk('s3')->url($storedPath)
            ]);
        }


        return $this->returnResponse('Product image updated'," ");
    }

    public function removeVariantImage(Request $request){
        ProductImage::destroy($request->input('id'));
        return $this->returnResponse("Product variant removed","");
    }

    /*** Product Variants Price **/
    public function addVariantPrice(Request $request){
        ProductVariantPrice::where([
            'zone_id' => $request->input('zone_id'),
            'product_variant_id' => $request->input('product_variant_id'),
        ])->delete();

        $variantPrice = ProductVariantPrice::create([
            'zone_id' => $request->input('zone_id'),
            'product_variant_id' => $request->input('product_variant_id'),
            'amount' => $request->input('amount')
        ]);

        return $this->returnResponse("Add Variant price",$variantPrice);
    }

    public function removeVariantPrice(Request $request){
        $variantPrice = ProductVariantPrice::destroy($request->input('id'));
        return $this->returnResponse("Product variant remove",$variantPrice);
    }

}



