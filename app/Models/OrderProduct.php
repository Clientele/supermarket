<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class OrderProduct extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $casts = [ 'created_at' => 'datetime:Y-m-d H:m' ];

    protected $fillable = [
        'order_id',
        'customer_id',
        'vendor_id',
        'product_id',
        'product_variant_id',

        'ordered_quantity',
        'delivered_quantity',

        'selling_price_id',
        'selling_price',
        'discount_id',
        'discount_amount',

        'has_delivered',
        'is_rejected',

        'delivered_by',
        'created_by',
        'deleted_by'
    ];

    public function order(){
        return $this->belongsTo('App\Models\Order', 'order_id' );
    }

    public function product(){
        return $this->belongsTo('App\Models\Product', 'product_id' );
    }

    public function variant(){
        return $this->belongsTo('App\Models\ProductVariant', 'product_variant_id' );
    }



}


