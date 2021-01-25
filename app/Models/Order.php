<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $casts = [ 'created_at' => 'datetime:Y-m-d H:m' ];

    protected $fillable = [
        'customer_id',
        'sales_person_id',
        'delivered_by',

        'is_delivered',
        'is_cancelled',
        'cancellation_reason',
        'cancelled_at',
        'order_status',

        'amount_due',
        'is_full_paid',
        'paid_amount',

        'delivery_zone_id',
        'delivery_region_d',
        'delivery_district_id',
        'delivery_place_id',
        'order_created_by',
        'created_by',
        'deleted_by'

    ];

    public function order_products(){
        return $this->hasMany('App\Models\OrderProduct', 'order_id' );
    }

    public function creator(){
        return $this->belongsTo('App\Models\User', 'created_by' );
    }

    public function customer(){
        return $this->belongsTo('App\Models\Customer', 'customer_id' );
    }

    public function staff(){
        return $this->belongsTo('App\Models\Staff', 'sales_person_id' );
    }

    public function zone(){
        return $this->belongsTo('App\Models\Zone', 'delivery_zone_id' );
    }

    public function region(){
        return $this->belongsTo('App\Models\Region', 'delivery_region_d' );
    }

    public function district(){
        return $this->belongsTo('App\Models\District', 'delivery_district_id' );
    }

    public function place(){
        return $this->belongsTo('App\Models\Place', 'delivery_place_id' );
    }

}


