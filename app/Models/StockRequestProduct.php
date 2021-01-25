<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class StockRequestProduct extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
          'request_id',
          'product_id',
          'product_variant_id',
          'staff_id',
          'created_by',
          'quantity',
          'rejected',
          'rejection_reason'
        ];


}


