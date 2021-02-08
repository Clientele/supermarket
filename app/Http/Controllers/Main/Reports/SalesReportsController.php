<?php

namespace App\Http\Controllers\Main\Reports;

use App\Http\Controllers\Main\GoodBaseController;
use App\Models\Customer;
use App\Models\Depot;
use App\Models\DepotProduct;
use App\Models\District;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\PriceDiscount;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\ProductVariantPrice;
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

class SalesReportsController extends GoodBaseController
{

    public function __construct(){ }

    /** Sales Person */
    public function salesPersonInsights(Request $request){

        $staffId = Auth::user()->staff_id;
        if(!$staffId){
            return $this->returnError('You do not have permission to request products', [""], 403);
        }

        $stockRequests = StockRequestProduct::where(['staff_id' => $staffId, 'rejected' => false])
            ->where('dispatched_quantity',0)->sum('quantity');

        $responseData['requested_items'] = $stockRequests;
        return $this->returnResponse('Order placed Added', $responseData);
    }



}


