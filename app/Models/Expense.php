<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model{

    use HasFactory;
    protected $fillable = [
        'branch_id',
        'amount',
        'date',
        'description',
        'created_by'
    ];

    public function branch(){
        return $this->belongsTo('App\Models\Branch','branch_id');
    }

}


