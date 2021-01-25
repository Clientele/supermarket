<?php

namespace App\Http\Controllers\Config;

use App\Http\Controllers\GoodBaseController;
use App\Models\Staff;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class StaffController extends GoodBaseController
{

    public function __construct(){

    }

    public function addStaff(Request $request){
         $password = rand(111111,999999);
         Log::debug($password);

         if( User::where(['email'=>$request->input('email')])->first() ){
            return $this->returnError("User Exists","") ;
        }

        $user = User::create([
            'name' => $request->input('staff_name'),
            'email' => $request->input('email'),
            'password' => Hash::make($password)
        ]);

        $staff = Staff::create([
            'user_id' =>  $user->id,
            'default_depot_id' => $request->input('default_depot_id'),
            'staff_name' => $request->input('staff_name'),
            'email' => $request->input('email'),
            'status' => $request->input('status'),
            'phone_number' => $request->input('phone_number'),
            'password' => Hash::make($request->input('password'))
        ]);


        $user->staff_id = $staff->id;
        $user->save();

        $staff->syncRoles( [$request->input( 'role_name')]);

        return $this->returnResponse('Staff added',$staff);
    }

    public function updateStaff(Request $request){

        Log::debug($request->all());

        Staff::where([
            'id'=>$request->input('id')
        ])->update([
            'default_depot_id' => $request->input('default_depot_id'),
            'staff_name' => $request->input('staff_name'),
            'email' => $request->input('email'),
            'phone_number' => $request->input('phone_number'),
            'status' => $request->input('status'),
         ]);

        $staff = Staff::find($request->input('id'));
        if($staff){
            $staff->syncRoles( $request->input( 'role_name'));
        }
        return $this->returnResponse('Staff updated',$staff);
    }


    public function removeStaff(Request $request){
        $results = Staff::destroy($request->input('id'));
        return $this->returnResponse('User removed',$results);
    }

    public function suspendStaff(Request $request){
        //$results = User::destroy($request->input('id'));
        return $this->returnResponse('User suspended',"");
    }


}


