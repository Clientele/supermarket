<?php

namespace App\Http\Controllers\Resources;

use App\Http\Controllers\GoodBaseController;
use App\Models\District;
use App\Models\Place;
use App\Models\Region;
use App\Models\Staff;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AddressesResourcesController extends GoodBaseController
{

    public function __construct(){
        // $this->middleware('auth');
    }


    /*** Countries **/
    public function getCountries(Request $request){
        $responseData['countries'] = [];
        return $this->returnResponse('Countries', $responseData);
    }

    /*** Regions **/
    public function getRegions(Request $request){
       $regions =  Region::where([
            'country_id'=> $request->input('country_id')
        ]);
        $responseData['regions'] = $regions;
        return $this->returnResponse('Countries', $responseData);
    }

    /*** Districts **/
    public function getDistricts(Request $request){
        $districts =  District::where([
            'region_id'=> $request->input('region_id')
        ]);
        $responseData['districts'] = $districts;
        return $this->returnResponse('Countries', $responseData);
    }

    /*** Places **/
    public function getPlaces(Request $request){
        $places =  Place::where([
            'district_id'=> $request->input('district_id')
        ]);
        $responseData['places'] = $places;
        return $this->returnResponse('Countries', $responseData);
    }


    /*** Filter **/
    public function findAddress(Request $request){
        $responseData['addresses'] = [];
        return $this->returnResponse('Countries', $responseData);
    }

}


