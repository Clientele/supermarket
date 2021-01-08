<?php

namespace App\Http\Controllers\Config;

use App\Http\Controllers\GoodBaseController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Spatie\Permission\Models\Role;

class PermissionsController extends GoodBaseController
{

    public function __construct(){

    }

    public function addRole(Request $request){
        $role = Role::create(['name' => $request->input('name'), 'guard_name'=>'api']);
        $role->syncPermissions(  $request->input('permissions') );
        return $this->returnResponse('Role Added',$role);
    }

    public function updateRole(Request $request){
        $role = Role::findByName($request->input('role_name'));
        $role->syncPermissions(  $request->input('permissions') );
        return $this->returnResponse('Role Added',$role);
    }

    public function removeRole(Request $request){
        $role = Role::where(['name' => $request->input('name')])->delete();
        return $this->returnResponse('Role removed',$role);
    }

}


