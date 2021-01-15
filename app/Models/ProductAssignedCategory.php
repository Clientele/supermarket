<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductAssignedCategory extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $casts = [ 'created_at' => 'datetime:Y-m-d H:m' ];

    protected $fillable  = [
            'category_id',
            'product_id',
            'created_by'
        ];

    public function product(){
        return $this->belongsTo('App\Models\Product','product_id');
    }

    public function category(){
        return $this->belongsTo('App\Models\ProductCategory','category_id');
    }
}







