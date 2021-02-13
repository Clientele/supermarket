<?php

namespace App\Http\Controllers\Main\Sales;

use App\Http\Controllers\Main\GoodBaseController;
use App\Models\Customer;
use App\Models\Branch;
use App\Models\BranchProduct;
use App\Models\District;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\PriceDiscount;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\ProductVariantPrice;
use App\Models\Sale;
use App\Models\TruckedProduct;
use App\Models\User;
use App\Models\Vendor;
use App\Utils\GoodConstants;
use App\Utils\GoodOrderStatus;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class SalesController extends GoodBaseController{

    public function __construct(){ }

    public function addSale(Request $request){
        $validator = Validator::make( $request->all(), [
            'products' => 'required|array'
        ]);

        if ($validator->fails()) {
            return $this->returnError($validator->errors()->first(),"",412);
        }

        $products = $request->input('products');
        foreach ($products as $soldProduct) {

            $product = Product::find($soldProduct['id']);
            if(!$product){
                return $this->returnError("The product you are trying to sell is not available ","",412);
            }

            if(!is_numeric($soldProduct['quantity'])){
                return $this->returnError($product->product_name." Quantity not specified","",412);
            }

            Sale::create([
                'branch_id' => Auth::user()->branch_id,
                'product_id'=> $product->id,
                'sold_quantity'=> $soldProduct['quantity'] ,
                'selling_price'=> $product->price,
                'created_by' => Auth::id()
            ]);
         }

        return $this->returnResponse('Sale Recorded', " ");
    }

    public function getSalesMade(Request $request){
        $sales = Sale::where(['created_by'=>Auth::id()])->with(['branch'])->paginate(20);
        $responseData['sales'] = $sales;
        return $this->returnResponse('My Sales', $responseData);
    }




}


