<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'customer_id',
        'product_id',
        'product_variant_id',

        'ordered_quantity',
        'delivered_quantity',

        'selling_price_id',
        'selling_price',
        'discount_id',
        'discount_amount',

        'is_rejected',
        'is_approved',

        'delivered_by',
        'created_by',
        'deleted_by'

    ];

}


