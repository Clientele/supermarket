<?php

namespace App\Http\Controllers\Config;

use App\Http\Controllers\GoodBaseController;
use App\Models\Depot;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class DepotsController extends GoodBaseController
{

    public function __construct(){
        // $this->middleware('auth');
    }


    public function addDepot(Request $request){
        $depot = Depot::updateOrCreate([
            'id'=>$request->input('id'),
        ],[
            'depot_name'=>$request->input('depot_name'),
            'country_id'=>$request->input('country_id'),
            'zone_id'=>$request->input('zone_id'),
            'region_d'=>$request->input('region_d'),
            'district_id'=>$request->input('district_id'),
            'place_id'=>$request->input('place_id'),

            'created_by'=> Auth::id(),
         ]);
        return $this->returnResponse('Depot Added',$depot);
    }

    public function removeDepot(Request $request){
        $depot = Depot::destroy($request->input('id'));
        return $this->returnResponse('Depot removed',$depot);
    }



}


