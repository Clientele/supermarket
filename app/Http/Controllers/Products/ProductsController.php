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

class ProductsController extends GoodBaseController
{

    public function __construct(){

    }

    /*** Products **/
    public function addProduct(Request $request){

        $product = Product::create([
            'vendor_id'=>$request->input('vendor_id'),
            'product_name'=>$request->input('product_name'),
            'is_published'=> false,

            'thumbnail_img'=> null,
            'created_by'=> Auth::id()
        ]);

        $catIds = $request->input('categories_ids');
        if(is_array($catIds)){
            foreach ($catIds as $id){
                ProductAssignedCategory::create([
                    'category_id' => $id,
                    'product_id' => $product->id,
                    'created_by' =>Auth::id()
                ]);
            }
        }


        return $this->returnResponse('Product Added',$product);
    }

    public function updateProduct(Request $request){

        ///TODO: save image
        $thumbNailUrl = "";

        $product = Product::where([
            'id'=>$request->input('id'),
        ])->update([
             'product_name'=>$request->input('product_name'),
             'thumbnail_img'=> $thumbNailUrl,
        ]);

        return $this->returnResponse('Product Updated',$product);
    }

    public function toggleStatus(Request $request){
        $product = Product::where([
            'id' => $request->input('id')
        ])->update([
            'is_published'=> $request->input('is_published')
        ]);
        return $this->returnResponse('Product status changed',$product);
    }

    public function removeProduct(Request $request){
        $product = Product::destroy($request->input('id'));
        $variant = ProductVariant::where([ 'product_id' => $request->input('id') ])->delete();
        return $this->returnResponse('Product removed',$product);
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

    /*** Product Categories **/
    public function addProductCategory(Request $request){

        $product = ProductCategory::updateOrCreate([
            'id' => $request->input('id')
        ],[
            'parent_category_id'=>$request->input('parent_category_id', null),
            'category_name'=>$request->input('category_name'),
            'created_by'=> Auth::id()
        ]);

        return $this->returnResponse('Category Added',$product);
    }

    public function removeCategory(Request $request){
        $product = ProductCategory::destroy($request->input('id'));
        return $this->returnResponse('Product category removed',$product);
    }



}


