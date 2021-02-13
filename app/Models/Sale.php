<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Sale extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'branch_id',
        'order_id',
        'customer_id',
        'product_id',
        'product_variant_id',


        'selling_price',
        'sold_quantity',

        'discount_id',
        'discount_amount',

        'created_by',
        'deleted_by'
    ];

    public function product(){
        return $this->belongsTo('App\Models\Product','product_id');
    }

    public function branch(){
        return $this->belongsTo('App\Models\Branch','branch_id');
    }

    public function seller(){
        return $this->belongsTo('App\Models\User','created_by');
    }

}


