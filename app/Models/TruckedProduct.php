<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TruckedProduct extends Model{
    use HasFactory;
    use SoftDeletes;
    protected $casts = [ 'created_at' => 'datetime:Y-m-d H:m' ];


    protected $fillable = [
        'original_depot_id',
        'product_id',
        'product_variant_id',
        'staff_id',

        'received_quantity',
        'remaining_quantity',
        'created_by',
        'deleted_by'
    ];


    public function staff(){
        return $this->belongsTo('App\Models\Staff', 'staff_id' );
    }

    public function product(){
        return $this->belongsTo('App\Models\Product', 'product_id' );
    }

    public function variant(){
        return $this->belongsTo('App\Models\ProductVariant', 'product_variant_id' );
    }


}


