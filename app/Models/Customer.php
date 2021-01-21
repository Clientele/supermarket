<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $casts = [ 'created_at' => 'datetime:Y-m-d H:m' ];

    protected $fillable = [
        'user_id',
        'customer_name',
        'email',
        'phone_number_1',
        'phone_number_2',

        'country_id',
        'zone_id',
        'region_id',
        'district_id',
        'place_id',

        'created_by',
        'deleted_by'
    ];

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

