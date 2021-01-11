<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Depot extends Model
{
    use HasFactory;
    protected $fillable = [
        'depot_name',
        'country_id',
        'zone_id',
        'region_id',
        'district_id',
        'place_id',

        'created_by',
        'deleted_by'
    ];

    public function staff(){
        return $this->belongsTo('App\Models\Staff', 'default_depot_id' );
    }

    public function country(){
        return $this->belongsTo('App\Models\Country', 'country_id' );
    }

    public function region(){
        return $this->belongsTo('App\Models\Region', 'region_id' );
    }

    public function district(){
        return $this->belongsTo('App\Models\District', 'district_id' );
    }

    public function place(){
        return $this->belongsTo('App\Models\Place', 'place_id' );
    }

}



