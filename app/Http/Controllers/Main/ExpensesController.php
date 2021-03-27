<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Main\GoodBaseController;
use App\Models\Customer;
use App\Models\Branch;
use App\Models\BranchProduct;
use App\Models\District;
use App\Models\Expense;
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

class ExpensesController extends GoodBaseController{

    public function __construct(){ }

    public function addExpense(Request $request){

        $branchId = Auth::user()->branch_id;
        if(!$branchId){
            return $this->returnError('You do not belong to any branch'," ",412);
        }

        $validator = Validator::make( $request->all(), [
            'amount' => 'required|numeric',
            'date' => 'required|date',
            'description' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->returnError($validator->errors()->first(),"",412);
        }

        Expense::create([
            'branch_id' => $branchId,
            'amount' => $request->input('amount'),
            'date'=> $request->input('date'),
            'description'=> $request->input('description'),
            'created_by' => Auth::id()
        ]);

        return $this->returnResponse('Expense Recorded', " ");
    }

    public function getExpenses(Request $request){
        $sales = Expense::with(['branch'])->paginate(20);
        $responseData['expenses'] = $sales;
        return $this->returnResponse('All branches Expenses', $responseData);
    }
    public function getBranchExpenses(Request $request){
        $sales = Expense::where('branch_id',$request->input('branch_id'))->with(['branch'])->paginate(20);
        $responseData['expenses'] = $sales;
        return $this->returnResponse('Branches Expenses', $responseData);
    }




}


