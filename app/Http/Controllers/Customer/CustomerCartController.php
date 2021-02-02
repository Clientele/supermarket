<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\GoodBaseController;
use App\Models\CartProduct;
use App\Models\Customer;
use App\Models\District;
use App\Models\Product;
use App\Models\ProductAssignedCategory;
use App\Models\ProductVariant;
use App\Models\ProductVariantPrice;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CustomerCartController extends GoodBaseController
{

    public function __construct(){

    }


    public function addProductToCart(Request $request){

        /** Location */
        $customer = Customer::find(Auth::user()->customer_id);
        if(!$customer){
            return $this->returnError("Login as customer","",403);
        }

        if(!$customer->district_id){
            return $this->returnError("No location","",400);
        }
        $customer->district;
        /** [End] Location */


        $productVariant = ProductVariant::find($request->input('product_variant_id'));

        if(!$productVariant){
            return $this->returnError("Invalid variant ID",[""],400);
        }

        $customer = Auth::user()->customer;
        if(!(Auth::user()->customer)){
            return $this->returnError("Not logged as customer",[""],403);
        }

        $cartProduct = CartProduct::create([
            'product_id'=>$productVariant->product_id,
            'product_variant_id'=>$productVariant->id,
            'customer_id'=>$customer->id,

            'quantity'=>$request->input('quantity'),

            'delivery_country_id'=> $customer->delivery_country_id ,
            'delivery_zone_id'=> $customer->district->zone_id ,
            'delivery_region_id'=> $customer->region_id ,
            'delivery_district_id'=> $customer->district_id ,
            'delivery_place_id'=>$customer->place_id
        ]);

        return $this->returnResponse("Product added to cart", $cartProduct);
    }


    public function getCartProducts(Request $request){
        $customer =  Customer::find(Auth::user()->customer_id);
        if(!$customer){
            return $this->returnError("Not logged as customer",[""],403);
        }

        $cartProducts = $this->getCustomerCartProducts($customer);

        $responseData['cart_products'] = $cartProducts;
        return $this->returnResponse("Product added to cart", $responseData);
    }


    public function addDeliveryAddress(Request $request){

        $customer =  Customer::find(Auth::user()->customer_id);
        if(!$customer){
            return $this->returnError("Not logged as customer",[""],403);
        }

        $district = District::find($request->input('delivery_district_id'));

        if(!$district){
            return $this->returnError("Invalid Address, Unknown district",[""],400);
        }

        CartProduct::where([
            'customer_id' => $customer->id
        ])->update([
            'delivery_country_id'=>$request->input('delivery_country_id'),
            'delivery_zone_id'=>$district->zone_id,
            'delivery_region_id'=>$request->input('delivery_region_id'),
            'delivery_district_id'=>$request->input('delivery_district_id'),
            'delivery_place_id'=>$request->input('delivery_place_id')
        ]);

        $responseData['cart_products'] =  $this->getCustomerCartProducts($customer);;
        return $this->returnResponse("Delivery Address updated", $responseData);
    }


    private function getCustomerCartProducts($customer){
        $customer->district; //include district

        $cartProducts = CartProduct::where([
            'customer_id' => $customer->id
        ])->with(['product','variant'])->latest()->get();

        foreach ($cartProducts as $cartProduct  ){
            /*** Load price according to zone **/
            $variantZonePrice = ProductVariantPrice::where([
                'zone_id'=>$customer->district? $customer->district->zone_id : "" ,
                'product_variant_id' => $cartProduct->variant->id
            ])->first();

            $cartProduct->variant->price = $variantZonePrice? $variantZonePrice->amount : $cartProduct->variant->base_price;
        }

        return $cartProducts;

    }


}




























