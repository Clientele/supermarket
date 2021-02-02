<?php

namespace App\Http\Controllers\Main\Resources;

use App\AddressDistrict;
use App\AddressRegion;
use App\AddressStreet;
use App\Http\Controllers\Main\GoodBaseController;
use App\Models\District;
use App\Models\Place;
use App\Models\Region;
use App\Models\Staff;
use App\Models\User;
use App\Models\Zone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Searchable\ModelSearchAspect;
use Spatie\Searchable\Search;

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
        ])->get();
        $responseData['regions'] = $regions;
        return $this->returnResponse('Regions', $responseData);
    }


    /*** Zones **/
    public function getSalesZone(Request $request){
        $zones =  Zone::get();
        $responseData['zones'] = $zones;
        return $this->returnResponse('Zones', $responseData);
    }

    public function getZoneDistrict(Request $request){
        $districts =  District::where([
            'zone_id' => $request->input('zone_id')
        ])->get();
        $responseData['districts'] = $districts;
        return $this->returnResponse('Districts in zone', $responseData);
    }




    /*** Districts **/
    public function getDistricts(Request $request){
        if(is_numeric($request->input('region_id'))){
            $districts =  District::where([
                'region_id'=> $request->input('region_id')
            ])->with('zone')->get();
        }else{
            $districts =  District::with('zone')->get();
        }

        $responseData['districts'] = $districts;
        return $this->returnResponse('Districts', $responseData);
    }

    /*** Places **/
    public function getPlaces(Request $request){
        $places =  Place::where([
            'district_id'=> $request->input('district_id')
        ])->get();
        $responseData['places'] = $places;
        return $this->returnResponse('Places', $responseData);
    }

    /*** Filter **/
    public function  findAddress(Request $request){

        if(!$request->input('query')){
            return  $this->returnError("Type Something to search",[]);
        }

        $query = $request->input('query');

        $searchResults = (new Search())
            ->registerModel(Place::class, function(ModelSearchAspect $modelSearchAspect) {
                $modelSearchAspect
                    ->addSearchableAttribute('place_name')
                    ->with(['region','district']);
            })
//            ->registerModel(District::class,function(ModelSearchAspect $modelSearchAspect) {
//                $modelSearchAspect
//                    ->addSearchableAttribute('district_name')
//                    ->with(['region']);
//            })

            ->limitAspectResults(40)
            ->search($query);

        $responseData['addresses'] = $searchResults;
        return $this->returnResponse("AddressSearch results", $responseData);
    }


}


