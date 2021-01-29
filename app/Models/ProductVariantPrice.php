<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductVariantPrice extends Model{

    use HasFactory;
    use SoftDeletes;
    protected $casts = [ 'created_at' => 'datetime:Y-m-d H:m' ];

    protected $fillable = [
        'zone_id',
        'product_id',
        'product_variant_id',
        'amount',
        'created_by',
        'deleted_by'
    ];

    public function zone(){
        return $this->belongsTo('App\Models\Zone', 'zone_id' );
    }

    public function variant(){
        return $this->belongsTo('App\Models\ProductVariant', 'product_variant_id' );
    }


}


