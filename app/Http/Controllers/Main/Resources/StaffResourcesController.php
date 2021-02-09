<?php

namespace App\Http\Controllers\Main\Resources;

use App\Http\Controllers\Main\GoodBaseController;
use App\Models\Branch;
use App\Models\Staff;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class StaffResourcesController extends GoodBaseController
{

    public function __construct(){
        // $this->middleware('auth');
    }


    public function getFullAvailableRoles(Request $request){
        $roles = Role::where(['guard_name'=>'api'])->get();
        foreach ($roles as $role){
            $role->member_count = Staff::role($role->name)->count();
            $role->role_permissions =  $role->getPermissionNames();
        }
        $responseData['roles'] = $roles;
        return $this->returnResponse('Roles', $responseData);
    }

    public function getAvailableRoles(Request $request){
        $roles = Role::where(['guard_name'=>'api'])->get()->pluck('name');
        $responseData['roles'] = $roles;
        return $this->returnResponse('Roles', $responseData);
    }

    public function getPermissionsInRole(Request $request){
        $role = Role::findByName($request->input('role_name','none'));
        $responseData['permissions_names'] = $role->getPermissionNames();
        return $this->returnResponse('Permissions In Role', $responseData);
    }


    public function getAllAvailablePermissions(Request $request){
        $roles = Permission::all()->pluck('name');
        $responseData['permissions'] = $roles;
        return $this->returnResponse('Roles', $responseData);
    }

    /** Users */
    public function getStaffByRole(Request $request){
        $roleName = $request->input('role_name');
        if($roleName){
            $users = Staff::role( $request->input('role_name'))->get();
        }else{
            $users = Staff::all();
        }

        foreach ($users as $user){
            $roles = $user->getRoleNames();
            $user->role_name = count($roles)>0? $roles[0] : null;
            $user->depot = Branch::find( $user->default_depot_id);
        }

        $responseData['staff'] = $users;
        return $this->returnResponse($roleName, $responseData);
    }

    public function getStaffWithNoRole(Request $request){
        $users =  Staff::doesntHave('roles')->get();
        $responseData['staff'] = $users;
        return $this->returnResponse('Users with no role', $responseData);
    }

    public function getStaffDetails(Request $request){
        $user =  Staff::find($request->input('id'));
        $roles = $user->getRoleNames();
        $user->role_name = count($roles)>0? $roles[0] : null;
        $user->depot = Branch::find( $user->default_depot_id);

        if($user->depot ){
            $user->depot->region;
        }

        if($user->depot ){
            $user->vehicles;
        }


        $responseData['staff'] = $user;
        return $this->returnResponse('User details', $responseData);
    }


}


