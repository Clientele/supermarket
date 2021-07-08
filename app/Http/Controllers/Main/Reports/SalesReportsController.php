<?php

namespace App\Http\Controllers\Main\Reports;

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
use App\Models\StockRequest;
use App\Models\StockRequestProduct;
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

class SalesReportsController extends GoodBaseController
{

    public function __construct(){ }

    /** Stock */
    public function getAvailableStock(Request $request){

        $products = Product::select('id','product_name')->paginate(20);
        if(is_numeric($request->input('branch_id'))){
            $branchFilter = " branch_id = ". $request->input('branch_id') ;
        }else{
            $branchFilter = " branch_id IS NOT NULL ";
        }

        foreach ($products as $product) {
            $product->remaining_quantity = BranchProduct::where([
                'product_id' => $product->id])->whereRaw($branchFilter)->sum('remaining_quantity');
        }

        $responseData['products'] = $products;
        return $this->returnResponse('Stock report ', $responseData);
    }

    /** Sales */
    public function getBranchSales(Request $request){
        $validator = Validator::make( $request->all(), [
            'branch_id' => 'required|numeric'
        ]);

        $branchFilter = "branch_id = " .$request->input('branch_id');
        if ($validator->fails()) {
            $branchFilter = " branch_id IS NOT NULL ";
        }

        $allSales = Sale::whereRaw($branchFilter)->select(
            DB::raw('selling_price*sold_quantity as sold_value')
        )->get();
        $sales = Sale::whereRaw($branchFilter)->with(['branch'])->paginate(20);

        foreach ($sales as $sale){
            $sale->branch = $sale->branch?$sale->branch : new Branch();
        }

        $responseData['total_sales'] = $allSales->sum('sold_value');
        $responseData['sales'] = $sales;
        return $this->returnResponse('Branches Sales', $responseData);
    }

}


