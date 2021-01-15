<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVendorsTable extends Migration
{
    /**
     * Run the migrations.
     * @return void
     */
    public function up()
    {
        Schema::create('vendors', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->bigInteger('user_id')->unsigned()->nullable();;
            $table->string('vendor_name');

            $table->bigInteger('country_id')->unsigned()->nullable();
            $table->bigInteger('zone_id')->unsigned()->nullable();
            $table->bigInteger('region_id')->unsigned()->nullable();
            $table->bigInteger('district_id')->unsigned()->nullable();
            $table->bigInteger('place_id')->unsigned()->nullable();

            $table->string('email')->nullable();
            $table->string('phone_number_1')->nullable();
            $table->string('phone_number_2')->nullable();
            $table->boolean('is_active')->default(true)->nullable();

            $table->bigInteger('created_by')->unsigned()->nullable();
            $table->bigInteger('deleted_by')->unsigned()->nullable();

            $table->softDeletes();
            $table->timestamps();
        });


    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vendors');
    }
}
