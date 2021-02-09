<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Vehicle extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $casts = [ 'created_at' => 'datetime:Y-m-d H:m' ];

    protected $fillable = [
        'default_depot_id',
        'assigned_staff_id',
        'driver_id',

        'vehicle_type',
        'make',
        'model',
        'licence_plate_number',
        'vehicle_status',

        'created_by',
        'deleted_by'
    ];

    public function staff(){
        return $this->belongsTo('App\Models\Staff','assigned_staff_id');
    }

    public function depot(){
        return $this->belongsTo('App\Models\Branch','default_depot_id');
    }

}



