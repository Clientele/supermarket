<?php

namespace App\Http\Controllers\Main\Products;

use App\Http\Controllers\Main\GoodBaseController;
use App\Models\Depot;
use App\Models\DepotProduct;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\Staff;
use App\Models\StockRequestProduct;
use App\Models\TruckedProduct;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class MobileInventoryController extends GoodBaseController
{

    public function __construct(){
    }

    public function stockBySalesPeople(Request $request)
    {

        $depotId = $request->input('depot_id');
        $catId = $request->input('category_id');

        $staff = Staff::where(['default_depot_id' => $depotId])
            ->whereHas('trucked_products', function ($query) {
                $query->where('remaining_quantity', '>', '0');
            })->with('trucked_products')->paginate(20);

        foreach ($staff as $person) {
            foreach ($person->trucked_products as $truckedProduct) {
                $truckedProduct->product;
            }
        }
        $responseData['staff'] = $staff;
        return $this->returnResponse('Products ', $responseData);
    }



    public function getStaffStock(Request $request)
    {
        $staffId = $request->input('staff_id');
        if(!is_numeric($staffId)){
            $staffId = Auth::user()->staff_id ;
        }

        if(!is_numeric($staffId)){
            return $this->returnError("You are not a Staff",[""],403);
        }

        $stocks = TruckedProduct::where(['staff_id' => $staffId])
            ->groupBy('product_variant_id')
            ->select(
                'product_variant_id', 'product_id',
                DB::raw("sum(received_quantity) as received_quantity"),
                DB::raw("sum(remaining_quantity) as remaining_quantity")
            )
            ->orderBy('product_id')
            ->with('product','variant')->paginate(20);


        $responseData['trucked_stock'] = $stocks;
        return $this->returnResponse('Trucked Stock ', $responseData);
    }

    public function checkAvailableStock(Request $request){
        Log::debug($request->all());
        $staffId = Auth::user()->staff_id ;
        if(!is_numeric($staffId)){
            return $this->returnError("You are not a Staff",[""],403);
        }

        $truckedStock = TruckedProduct::where([
            'staff_id' => $staffId,
            'product_variant_id' => $request->input('product_variant_id'),
        ])->get();

        $responseData['received_quantity'] = $truckedStock->sum('received_quantity');
        $responseData['remaining_quantity'] = $truckedStock->sum('remaining_quantity');
        return $this->returnResponse('Remaining Stock ', $responseData);
    }



    public function getStockBreakdown(Request $request){
        $staffId = Auth::user()->staff_id ;
        if(!is_numeric($staffId)){
            return $this->returnError("You are not a Staff",[""],403);
        }

        $truckedStock = TruckedProduct::where([
            'staff_id' => $staffId,
            'product_variant_id' => $request->input('product_variant_id'),
        ])->with(['depot'])->paginate(20);

        $responseData['trucked_stocks'] = $truckedStock;
        return $this->returnResponse('Trucked Stock breakdown', $responseData);
    }




}


