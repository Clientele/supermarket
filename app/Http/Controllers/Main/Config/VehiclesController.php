<?php

namespace App\Http\Controllers\Main\Config;

use App\Http\Controllers\Main\GoodBaseController;
use App\Models\Branch;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class VehiclesController extends GoodBaseController{

    public function __construct(){
        // $this->middleware('auth');
    }

    public function ping(Request $request){
        return "Success";
    }

    public function addVehicle(Request $request){
        $depot = Vehicle::updateOrCreate([
            'id'=>$request->input('id'),
        ],[
            'default_depot_id'=>$request->input('default_depot_id'),
            'driver_id'=>$request->input('driver_id'),
            'assigned_staff_id'=>$request->input('assigned_staff_id'),

            'vehicle_type'=>$request->input('vehicle_type'),
            'make'=>$request->input('make'),
            'model'=>$request->input('model'),
            'licence_plate_number'=>$request->input('licence_plate_number'),
            'vehicle_status'=>$request->input('vehicle_status'),

            'created_by'=> Auth::id()
        ]);

        return $this->returnResponse('Vehicle Added', $depot);

    }




}


