<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class StockRequest extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $casts = [ 'created_at' => 'datetime:Y-m-d H:m' ];

    protected $fillable = [
        'staff_id',
        'depot_id',
        'created_by',
        'approved',
        'dispatched',
        'rejected'
    ];


    public function request_products(){
        return $this->hasMany('App\Models\StockRequestProduct', 'request_id' );
    }


    public function staff(){
        return $this->belongsTo('App\Models\staff', 'staff_id' );
    }


}

