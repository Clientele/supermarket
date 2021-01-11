<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;
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
        return $this->belongsTo('App\Models\Depot','default_depot_id');
    }

}



