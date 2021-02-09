<?php

namespace App\Http\Controllers\Main\Config;

use App\Http\Controllers\Main\GoodBaseController;
use App\Models\Branch;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class BranchesController extends GoodBaseController
{

    public function __construct(){
        // $this->middleware('auth');
    }


    public function getBranches(Request $request){
        $branches = Branch::paginate(10);
        $responseData['branches'] = $branches;
        return $this->returnResponse('Branches',$responseData);
    }


    public function addBranch(Request $request){

        $validator = Validator::make( $request->all(), [
            'branch_name' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->returnError($validator->errors()->first(), ["Validation failed"],422);
        }

        $depot = Branch::updateOrCreate([
            'id'=>$request->input('id'),
        ],[
            'branch_name'=>$request->input('branch_name'),
            'country_id'=>$request->input('country_id'),
            'zone_id'=>$request->input('zone_id'),
            'region_id'=>$request->input('region_id'),
            'district_id'=>$request->input('district_id'),
            'place_id'=>$request->input('place_id'),

            'created_by'=> Auth::id(),
         ]);
        return $this->returnResponse('Branch Added',$depot);
    }


    public function removeBranch(Request $request){
        $validator = Validator::make( $request->all(), [
            'id' => 'required|numeric'
        ]);

        if ($validator->fails()) {
            return $this->returnError($validator->errors()->first(), ["Validation failed"],422);
        }

        $depot = Branch::destroy($request->input('id'));
        return $this->returnResponse('Branch removed',$depot);
    }



}


