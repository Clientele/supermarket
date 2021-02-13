<?php

namespace App\Http\Controllers\Main\Products;

use App\Http\Controllers\Main\GoodBaseController;
use App\Models\Branch;
use App\Models\BranchProduct;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class InventoryController extends GoodBaseController
{

    public function __construct(){
    }

    public function getStockAvailableStock(Request $request){

        $branchId = Auth::user()->branch_id;
        if(!$branchId){
            return $this->returnError('You do not belong to any branch'," ",412);
        }

        $products = Product::select('id','product_name')->paginate(20);

        foreach ($products as $product) {
            $product->remaining_quantity = BranchProduct::where([
                'product_id' => $product->id,
                'branch_id' => Auth::user()->branch_id,
            ])->sum('remaining_quantity');
        }

        $responseData['products'] = $products;
        return $this->returnResponse('Products ', $responseData);
    }

    public function addStockToInventory(Request $request){

        $validator = Validator::make( $request->all(), [
            'product_id' => 'required|numeric',
            'quantity' => 'required|numeric',
            'expiry_date' => 'required|date',
        ]);

        if ($validator->fails()) {
            return $this->returnError($validator->errors()->first(),"",412);
        }

        $product = Product::find($request->input('product_id'));
        if(!$product){
          return $this->returnError('Product Not Found'," ",412);
        }

        $branchId = Auth::user()->branch_id;
        if(!$branchId){
            return $this->returnError('You do not belong to any branch'," ",412);
        }

       $branchProduct =   BranchProduct::create([
            'branch_id' => Auth::user()->branch_id,
            'product_id' => $product->id,

            'received_quantity' => $request->input('quantity'),
            'remaining_quantity' => $request->input('quantity'),

            'batch_number' => $request->input('batch_number'),
            'expiry_date' => Carbon::parse($request->input('expiry_date')),
            'received_at' => Carbon::now(),
            'receiver_id' => Auth::id(),
            'created_by' => Auth::id(),
         ]);

         return $this->returnResponse('Product added to inventory ', $branchProduct);
    }




}


