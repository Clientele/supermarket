<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Searchable\Searchable;
use Spatie\Searchable\SearchResult;

class Place extends Model implements Searchable
{
    use HasFactory;
    use SoftDeletes;
    protected $casts = [ 'created_at' => 'datetime:Y-m-d H:m' ];

    protected $fillable = [
        'country_id',
        'region_id',
        'district_id',
        'zone_id',
        'place_name',
        'created_by',
        'deleted_by'
    ];

    public function getSearchResult(): SearchResult
    {
        $url = route('home', $this->slug);

        return new SearchResult(
            $this,
            $this->place_name,
            $url
        );
    }


    public function country(){
        return $this->belongsTo('App\Models\Country', 'country_id' );
    }

    public function region(){
        return $this->belongsTo('App\Models\Region', 'region_id' );
    }

    public function district(){
        return $this->belongsTo('App\Models\District', 'district_id' );
    }



}


