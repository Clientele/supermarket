<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVehiclesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('default_depot_id')->unsigned()->nullable();
            $table->bigInteger('driver_id')->unsigned()->nullable(); //Staff ID
            $table->bigInteger('assigned_staff_id')->unsigned()->nullable();

            $table->string('vehicle_type')->nullable();
            $table->string('make')->nullable();
            $table->string('model')->nullable();
            $table->string('licence_plate_number')->nullable();
            $table->string('vehicle_status')->nullable();

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
        Schema::dropIfExists('vehicles');
    }
}
