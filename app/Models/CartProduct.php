<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CartProduct extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $casts = [ 'created_at' => 'datetime:Y-m-d H:m' ];

    protected $fillable = [
        'product_id',
        'product_variant_id',
        'customer_id',
        'quantity',

        'delivery_country_id',
        'delivery_zone_id',
        'delivery_region_id',
        'delivery_district_id',
        'delivery_place_id'
    ];

    public function customer(){
        return $this->belongsTo('App\Models\Customer', 'customer_id' );
    }

    public function product(){
        return $this->belongsTo('App\Models\Product', 'product_id' );
    }

    public function variant(){
        return $this->belongsTo('App\Models\ProductVariant', 'product_variant_id' );
    }



}


