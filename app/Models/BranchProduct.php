<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BranchProduct extends Model{

    use HasFactory;
    protected $fillable = [
        'branch_id',
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


    public function product(){
        return $this->belongsTo('App\Models\Product', 'product_id' );
    }

    public function variant(){
        return $this->belongsTo('App\Models\ProductVariant', 'product_variant_id' );
    }
}



