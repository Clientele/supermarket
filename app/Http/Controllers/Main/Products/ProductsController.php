<?php

namespace App\Http\Controllers\Main\Products;

use App\Http\Controllers\Main\GoodBaseController;
use App\Models\Branch;
use App\Models\Product;
use App\Models\ProductAssignedCategory;
use App\Models\ProductCategory;
use App\Models\ProductVariant;
use App\Models\User;
use App\Models\Vendor;
use App\PropertyImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProductsController extends GoodBaseController
{

    public function __construct(){
        //sleep(2);
    }

    /*** Products **/
    public function addProduct(Request $request){
        $validator = Validator::make( $request->all(), [
            'product_name' => 'required|unique:products',
            'price' => 'required|numeric'
        ]);

        if ($validator->fails()) {
            return $this->returnError($validator->errors()->first(), ["Validation failed"],422);
        }

        $product = Product::create([
            'vendor_id'=>$request->input('vendor_id'),
            'product_name'=>$request->input('product_name'),
            'price'=>$request->input('price'),
            'product_description'=>$request->input('product_description'),
            'is_published'=> false,

            'thumbnail_img'=> "https://image.flaticon.com/icons/png/512/916/916762.png",
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

        $validator = Validator::make( $request->all(), [
            'product_name' => 'required',
            'price' => 'required|numeric'
        ]);

        if ($validator->fails()) {
            return $this->returnError($validator->errors()->first(), ["Validation failed"],422);
        }

        Product::where([
            'id'=>$request->input('id'),
        ])->update([
             'product_name'=>$request->input('product_name'),
             'price'=>$request->input('price'),
             'product_description'=>$request->input('product_description')
        ]);

        $product = Product::find($request->input('id'));
        if(!$product){
            return $this->returnError("Product Not Found", [" "]);
        }

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
        return $this->returnResponse('Product Updated',$product);
    }

    public function updateProductImage(Request $request){

        $folder = 'public/products';
        $storedPath = $request->file('file')->store($folder, 's3');

        $product = Product::where([
            'id'=>$request->input('id'),
        ])->update([
             'thumbnail_img'=>  $storedPath,
             'img_url'=>  Storage::disk('s3')->url($storedPath)
         ]);

        return $this->returnResponse('Product image updated',$product);
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
        $product = Product::where(['id' => $request->input('id')])->update([ 'active' => false ]);
        return $this->returnResponse('Product removed',$product);
    }

    public function removeAssignedCategory(Request $request){
        $product = ProductAssignedCategory::where([
            'product_id' => $request->input('product_id'),
            'category_id' => $request->input('category_id')
        ])->delete();

        return $this->returnResponse('Category removed from product',$product);
    }


    /*** Product Categories **/
    public function addProductCategory(Request $request){

        $validator = Validator::make( $request->all(), [
            'category_name' => 'required|unique:product_categories'
        ]);

        if ($validator->fails()) {
            return $this->returnError($validator->errors()->first(), ["Validation failed"],422);
        }


        $product = ProductCategory::updateOrCreate([
            'id' => $request->input('id')
        ],[
            'parent_category_id'=>$request->input('parent_category_id', null),
            'category_name'=>$request->input('category_name'),
            'created_by'=> Auth::id()
        ]);

        return $this->returnResponse('Category Added/Updated',$product);
    }

    public function removeCategory(Request $request){
        $product = ProductCategory::destroy($request->input('id'));
        return $this->returnResponse('Product category removed',$product);
    }



}


