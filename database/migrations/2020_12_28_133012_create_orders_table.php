<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('customer_id')->unsigned()->nullable();
            $table->bigInteger('created_by')->unsigned()->nullable();
            $table->bigInteger('delivered_by')->unsigned()->nullable();
            $table->boolean('is_delivered')->nullable();
            $table->bigInteger('is_cancelled') ->nullable();
            $table->bigInteger('cancellation_reason') ->nullable();
            $table->bigInteger('cancelled_at') ->nullable();

            $table->double('amount_due',15,0)->nullable();
            $table->boolean('is_full_paid')->default(false)->nullable();
            $table->double('paid_amount',15,0)->nullable();

            $table->bigInteger('delivery_zone_id')->unsigned()->nullable();
            $table->bigInteger('delivery_region_d')->unsigned()->nullable();
            $table->bigInteger('delivery_district_id')->unsigned()->nullable();
            $table->bigInteger('delivery_place_id')->unsigned()->nullable();


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
        Schema::dropIfExists('orders');
    }
}
