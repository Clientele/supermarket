<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Permission\Traits\HasRoles;

class Staff extends Model{
    use HasFactory;
    use HasRoles;
    use SoftDeletes;

    protected $guard_name = 'api';

    protected $fillable = [
       "user_id",
       "default_depot_id",
       "staff_name",
       "phone_number",
       "email",
       "status"
     ];

    public function vehicles(){
        return $this->hasMany('App\Models\Vehicle', 'assigned_staff_id' );
    }


}



