<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductCategory extends Model{
    use HasFactory;
    use SoftDeletes;
    protected $casts = [ 'created_at' => 'datetime:Y-m-d H:m' ];


    protected $fillable = [
        'parent_category_id',
        'category_name',
        'thumb_nail_url',

        'created_by',
        'deleted_by'
    ];


}


