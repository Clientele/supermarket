<?php

namespace App\Http\Controllers\Main\Resources;

use App\Http\Controllers\Main\GoodBaseController;
use App\Models\Depot;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\ProductVariant;
use App\Models\ProductVariantPrice;
use App\Models\Staff;
use App\Models\User;
use App\Models\Vehicle;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class ProductsResourcesController extends GoodBaseController
{

    public function __construct(){
        // $this->middleware('auth');
       // sleep(1);
    }

    /** Vendors **/
    public function getVendors(Request $request){

        $regId = $request->input('region_id');
        if(is_numeric($regId)){
            $depots = Vendor::where(['region_id'=>$regId])->with(['region','district','place'])->paginate(500);
        }else{
            $depots = Vendor::with(['region','district','place'])->paginate(500);
        }

        $responseData['vendors'] = $depots;
        return $this->returnResponse('Vendors ', $responseData);
    }

    public function getAllVendors(Request $request){

        $regId = $request->input('region_id');
        if(is_numeric($regId)){
            $depots = Vendor::where(['region_id'=>$regId])->with(['region','district','place'])->get();
        }else{
            $depots = Vendor::with(['region','district','place'])->get();
        }

        $responseData['vendors'] = $depots;
        return $this->returnResponse('Vendors ', $responseData);
    }

    /** Products **/
    public function getProducts(Request $request){

        $catId = $request->input('category_id');
        if(is_numeric($catId)){
            $products = Product::whereHas('categories', function($queryBuilder) use($catId){
                $queryBuilder->where('category_id',$catId);
            })->with('vendor','variants')->orderBy('product_name')->paginate(500);
        }else{
            $products = Product::with('vendor','variants')->paginate(500);
        }

        $responseData['products'] = $products;
        return $this->returnResponse('Products ', $responseData);
    }

    public function getProductDetails(Request $request){
        $product = Product::where([
            'id' =>$request->input('id')
        ])->with('vendor','variants')->first();

        if(!$product){
            return  $this->returnError("Product not found",[ ""]);
        }

        $product->categories;

        foreach ( $product->categories as $category){
            $category->category;
        }

        $responseData['product'] = $product;
        return $this->returnResponse('Product details ', $responseData);

    }

    /***Variants **/
    public function getVariantDetails(Request $request){
        $variant = ProductVariant::where([
            'id' =>$request->input('id')
        ])->with('images','prices')->first();

        if(!$variant){
            return  $this->returnError("Product not found",[ ""]);
        }

        foreach ($variant->prices as $price){
            $price->zone;
        }

        $responseData['variant'] = $variant;
        return $this->returnResponse('Variant details ', $responseData);

    }


    public function getProductVariants(Request $request){
        Log::debug($request->all());
        $product = Product::where([
            'id' =>$request->input('product_id')
        ])->first();

        if(!$product){
            return  $this->returnError("Product not found",[""]);
        }

        $responseData['product_variants'] =  $product->variants;
        return $this->returnResponse('Product variants ', $responseData);

    }

    /** Categories **/
    public function getCategories(Request $request){

        $parentId = $request->input('parent_id');
        if(is_numeric($parentId)){
            $categories = ProductCategory::where([
                'parent_category_id' => $parentId
            ])->get();
        }else{
            $categories = ProductCategory::where([
                'parent_category_id' => null
            ])->get();
        }

        $responseData['categories'] = $categories;
        return $this->returnResponse('Products Categories ', $responseData);
    }

    public function getAllCategories(Request $request){
        $categories = ProductCategory::get();
        $responseData['categories'] = $categories;
        return $this->returnResponse('Products Categories ', $responseData);
    }


}





