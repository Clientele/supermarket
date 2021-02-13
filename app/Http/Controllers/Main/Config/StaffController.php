<?php

namespace App\Http\Controllers\Main\Config;

use App\Http\Controllers\Main\GoodBaseController;
use App\Models\Staff;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class StaffController extends GoodBaseController
{

    public function __construct(){

    }

    public function getUsers(Request $request){
        $users = User::all();
        $responseData['users'] = $users;
        return $this->returnResponse('Users ',$responseData);
    }

    public function addUser(Request $request){

        $validator = Validator::make( $request->all(), [
            'branch_id' => 'required',
            'name' => 'required',
            'email' => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->returnError($validator->errors()->first(), ["Validation failed"],422);
        }

         if( User::where(['email'=>$request->input('email')])->first() ){
            return $this->returnError("User Exists","") ;
        }

        $user = User::create([
            'branch_id' => $request->input('branch_id'),
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password'))
        ]);

      //  $staff->syncRoles( [$request->input( 'role_name')]);

        return $this->returnResponse('User  added',$user);
    }

    public function updateUser(Request $request){

        $validator = Validator::make( $request->all(), [
            'name' => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->returnError($validator->errors()->first(), ["Validation failed"],422);
        }

        $user = User::where([
            'id'=>$request->input('id')
        ])->update([
            'name' => $request->input('name')
         ]);

//        $user = User::find($request->input('id'));
//        if($user){
//            $user->syncRoles( $request->input( 'permissions'));
//        }
        return $this->returnResponse('User updated',$user);
    }

    public function removeUser(Request $request){
        $results = User::destroy($request->input('id'));
        return $this->returnResponse('User removed',$results);
    }

    public function suspendStaff(Request $request){
        //$results = User::destroy($request->input('id'));
        return $this->returnResponse('User suspended',"");
    }


}


