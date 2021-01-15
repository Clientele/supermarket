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

        'created_by',
        'deleted_by',

        'thumbnail_img'
    ];

    public function vendor(){
        return $this->belongsTo('App\Models\Vendor','vendor_id');
    }

}


