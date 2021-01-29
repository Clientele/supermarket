<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\GoodBaseController;
use App\Models\Depot;
use App\Models\DepotProduct;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\Staff;
use App\Models\TruckedProduct;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        $stocks = TruckedProduct::where(['staff_id' => $staffId])->with('product','variant')->paginate(20);
        $responseData['trucked_stock'] = $stocks;
        return $this->returnResponse('Trucked Stock ', $responseData);
    }



}


