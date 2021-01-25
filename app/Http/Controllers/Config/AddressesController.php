<?php

namespace App\Http\Controllers\Config;

use App\Http\Controllers\GoodBaseController;
use App\Models\District;
use App\Models\Place;
use App\Models\Region;
use App\Models\Staff;
use App\Models\User;
use App\Models\Zone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AddressesController extends GoodBaseController
{

    public function __construct(){

    }

    /*** Regions **/
    public function addSalesZone(Request $request){

        $region = Zone::updateOrCreate([
            'id' => $request->input('id'),
        ],[
            'country_id' => $request->input('country_id'),
            'zone_name' => $request->input('zone_name'),
            'created_by' => Auth::id()
        ]);

        return $this->returnResponse('Zone added',$region);
    }

    public function updateSalesZone(Request $request){

        $region = Region::where([
            'id' => $request->input('id'),
        ])->update([
            'country_id' => $request->input('country_id'),
            'region_name' => $request->input('region_name')
        ]);

        return $this->returnResponse('Region updated',$region);
    }

    public function removeSalesZone(Request $request){

        Region::where([
            'id' => $request->input('id')
         ])->update([
            'deleted_by' => Auth::id()
         ]);
        Region::destroy($request->input('id'));

        return $this->returnResponse('Region removed',"");
    }

    public function updateZone(Request $request){

     if(!is_array($request->input('district_ids'))){
            return $this->returnError('District ids required',"",422);
        }

      $district = District::whereIn('id', $request->input('district_ids') )
          ->update( ['zone_id' => $request->input('zone_id') ]);

        return $this->returnResponse('Zone updated',$district);
    }

    public function removeDistrictFromZone(Request $request){

      $district = District::where('id', $request->input('id') )
          ->update( ['zone_id' => null ]);

        return $this->returnResponse('Zone updated',$district);
    }


    /*** Regions **/
    public function addRegion(Request $request){

        $region = Region::updateOrCreate([
            'id' => $request->input('id'),
        ],[
            'country_id' => $request->input('country_id'),
            'region_name' => $request->input('region_name'),
            'created_by' => Auth::id()
        ]);

        return $this->returnResponse('Region added',$region);
    }

    public function updateRegion(Request $request){

        $region = Region::where([
            'id' => $request->input('id'),
        ])->update([
            'country_id' => $request->input('country_id'),
            'region_name' => $request->input('region_name')
        ]);

        return $this->returnResponse('Region updated',$region);
    }

    public function removeRegion(Request $request){

        Region::where([
            'id' => $request->input('id')
         ])->update([
            'deleted_by' => Auth::id()
         ]);
        Region::destroy($request->input('id'));

        return $this->returnResponse('Region removed',"");
    }


    /*** Districts **/
    public function addDistrict(Request $request){
        $region = Region::find($request->input('region_id'));
        if(!$region){
           return $this->returnError("Could not add district, Region Not Found",[]);
        }

        $region = District::updateOrCreate([
            'id' => $request->input('id'),
        ],[
            'country_id' => $region->country_id,
            'region_id' => $region->id,
            'district_name' => $request->input('district_name'),
            'created_by' => Auth::id()
        ]);

        return $this->returnResponse('District added',$region);
    }

    public function updateDistrict(Request $request){

        $district = District::where([
            'id' => $request->input('id'),
        ])->update([
            'district_name' => $request->input('district_name')
        ]);

        return $this->returnResponse('District updated',$district);
    }

    public function removeDistrict(Request $request){

        District::where([
            'id' => $request->input('id')
        ])->update([
            'deleted_by' => Auth::id()
        ]);
        District::destroy($request->input('id'));

        return $this->returnResponse('District removed',"");
    }


    /*** Places **/
    public function addPlace(Request $request){
        $district = District::find($request->input('district_id'));
        if(!$district){
            return $this->returnError("Could not add the place, District NOT Found",[]);
        }

        $place = Place::updateOrCreate([
            'id' => $request->input('id'),
        ],[
            'country_id' => $district->country_id,
            'region_id' => $district->region_id,
            'district_id'=> $district->id,
            'place_name' => $request->input('place_name'),
            'created_by' => Auth::id()
        ]);

        return $this->returnResponse('Place added',$place);
    }

    public function updatePlace(Request $request){

        $place = Place::where([
            'id' => $request->input('id'),
        ])->update([
            'place_name' => $request->input('place_name')
        ]);

        return $this->returnResponse('Place updated',$place);
    }

    public function removePlace(Request $request){

        Place::where([
            'id' => $request->input('id')
        ])->update([
            'deleted_by' => Auth::id()
        ]);
        Place::destroy($request->input('id'));

        return $this->returnResponse('Place removed',"");
    }



}


