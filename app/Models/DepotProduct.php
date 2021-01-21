<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DepotProduct extends Model
{
    use HasFactory;
    protected $fillable = [
        'depot_id',
        'vendor_id',
        'product_id',
        'product_variant_id',

        'received_quantity',
        'remaining_quantity',

        'batch_number',
        'expiry_date',
        'received_at',
        'receiver_id',

        'created_by',
        'deleted_by'
    ];
}



