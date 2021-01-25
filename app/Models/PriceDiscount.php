<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PriceDiscount extends Model{
    use HasFactory;
    use SoftDeletes;
    protected $casts = [ 'created_at' => 'datetime:Y-m-d H:m' ];

    protected $fillable = [
        'vendor_id',
        'applicable_zone_id',
        'product_id',
        'product_variant_id',
        'is_for_one_zone',
        'is_for_one_product',
        'is_for_one_variant',

        'amount',
        'percentage',
        'minimum_order_value',
        'starts_at',
        'ends_at',
        'created_by',
        'deleted_by'
    ];
}



