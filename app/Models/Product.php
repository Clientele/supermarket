<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $casts = [ 'created_at' => 'datetime:Y-m-d H:m' ];

    protected $fillable = [
        'vendor_id',
        'product_name',
        'is_published',
        'product_description',

        'buying_price',
        'price',
        'created_by',
        'deleted_by',

        'thumbnail_img',
        'active',
        'img_url'
    ];

    public function vendor(){
        return $this->belongsTo('App\Models\Vendor','vendor_id');
    }

    public function categories(){
        return $this->hasMany('App\Models\ProductAssignedCategory','product_id');
    }

    public function variants(){
        return $this->hasMany('App\Models\ProductVariant','product_id');
    }


}


