<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\GoodBaseController;
use App\Models\Customer;
use App\Models\District;
use App\Models\Product;
use App\Models\ProductAssignedCategory;
use App\Models\ProductVariantPrice;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CustomerProductsController extends GoodBaseController
{

    public function __construct()
    {

    }


    public function getProductsFeed(Request $request){

        /** Pricing Zones */
        $customer = null;
        if(Auth::check()){
            $customer = Customer::find(Auth::user()->customer_id);
        }

        if($customer){
            $districtId = $customer->district_id;
        }else{
            $districtId = $request->input('district_id');
        }

        if(!$districtId){
            return $this->returnError("Provide your location","",400);
        }

        $district = District::find($districtId);
        if(!$district){
            return $this->returnError("Invalid location","",400);
        }
        /** [End] Pricing Zones */



        $categoryId = $request->input('category_id');
        if (is_numeric($categoryId)) {

            #filter by categories
            $products = Product::whereHas('categories', function ($query) use ($categoryId) {
                $query->where('category_id', $categoryId);
            })->whereHas('variants', function (Builder $query) {
                $query->where('is_published', true);
            })->with(['variants' => function ( $query) {
                $query->where('is_published', true);
            }])->get();

        } else {

            $products = Product::whereHas('variants', function ($query) {
                $query->where('is_published', true);
            })->with(['variants' => function ( $query) {
                $query->where('is_published', true);
            }])->get();
        }


        foreach ($products as $product) {
            foreach ($product->variants as $productVariant) {
                $variantZonalPrice = ProductVariantPrice::where([
                    'zone_id' => $district->zone_id,
                    'product_variant_id' => $productVariant->id
                ])->first();
                $productVariant->price = $variantZonalPrice ? $variantZonalPrice->amount : $productVariant->base_price;
            }
        }


        $responseData['products'] = $products;
        return $this->returnResponse('Products feed', $responseData);
    }

    public function getProductDetails(Request $request){

        /** Pricing Zones */
        $customer = null;
        if(Auth::check()){
            $customer = Customer::find(Auth::user()->customer_id);
        }

        if($customer){
            $districtId = $customer->district_id;
        }else{
            $districtId = $request->input('district_id');
        }

        if(!$districtId){
            return $this->returnError("Provide your location","",400);
        }

        $district = District::find($districtId);
        if(!$district){
            return $this->returnError("Invalid location","",400);
        }
        /** [End] Pricing Zones */

        $product = Product::where('id', $request->input('id'))
            ->whereHas('variants', function ( $query) {
                $query->where('is_published', true);
            })
            ->with(['variants' => function ( $query) {
                $query->where('is_published', true);
            }])->first();

        if (!$product) {
            return $this->returnError('Products not found ', " ", 404);
        }

        foreach ($product->variants as $productVariant) {
            $variantZonalPrice = ProductVariantPrice::where([
                'zone_id' => $district->zone_id,
                'product_variant_id' => $productVariant->id
            ])->first();
            $productVariant->price = $variantZonalPrice ? $variantZonalPrice->amount : $productVariant->base_price;
        }


        $responseData['products'] = $product;
        return $this->returnResponse('Products Details', $responseData);
    }


}




























