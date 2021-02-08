<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class StockRequestProduct extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $casts = [ 'created_at' => 'datetime:Y-m-d H:m' ];

    protected $fillable = [
          'request_id',
          'product_id',
          'product_variant_id',
          'staff_id',
          'created_by',
          'quantity',
          'dispatched_quantity',
          'is_approved',
          'rejected',
          'rejection_reason',
          'ordered_products_ids'
        ];


    public function request(){
        return $this->belongsTo('App\Models\StockRequest', 'request_id' );
    }

    public function product(){
        return $this->belongsTo('App\Models\Product', 'product_id' );
    }

    public function variant(){
        return $this->belongsTo('App\Models\ProductVariant', 'product_variant_id' );
    }


}


