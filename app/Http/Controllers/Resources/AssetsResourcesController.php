<?php

namespace App\Http\Controllers\Resources;

use App\Http\Controllers\GoodBaseController;
use App\Models\Depot;
use App\Models\Staff;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AssetsResourcesController extends GoodBaseController
{

    public function __construct(){
        // $this->middleware('auth');
       // sleep(1);
    }


    public function getDepots(Request $request){
        Log::debug($request->input());

        $regId = $request->input('region_id');
        if(is_numeric($regId)){
            $depots = Depot::where(['region_id'=>$regId])->with(['region','district','place'])->paginate(500);
        }else{
            $depots = Depot::with(['region','district','place'])->paginate(500);
        }

        $responseData['depots'] = $depots;
        return $this->returnResponse('Depots', $responseData);
    }

    public function getVehicles(Request $request){
        $depotId = $request->input('depot_id');

        if(is_numeric($depotId)){
            $vehicles = Vehicle::where([ 'default_depot_id' => $depotId])->with(['staff'])->paginate(20);
        }else{
            $vehicles = Vehicle::with(['staff'])->paginate(20);
        }

        $responseData['vehicles'] = $vehicles;
        return $this->returnResponse('Vehicles', $responseData);
    }




}


