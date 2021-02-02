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
            $table->bigInteger('sales_person_id')->unsigned()->nullable();

            $table->bigInteger('is_approved')->unsigned()->nullable();
            $table->bigInteger('delivered_by')->unsigned()->nullable();
            $table->boolean('is_delivered')->nullable();
            $table->bigInteger('is_cancelled') ->nullable();
            $table->bigInteger('cancellation_reason') ->nullable();
            $table->bigInteger('cancelled_at') ->nullable();
            $table->string('order_status') ->nullable();

            $table->double('order_value',15,0)->nullable();
            $table->double('total_discount',15,0)->nullable();
            $table->double('amount_due',15,0)->nullable();
            $table->boolean('is_full_paid')->default(false)->nullable();
            $table->double('paid_amount',15,0)->nullable();

            $table->integer('order_channel')->nullable();
            $table->bigInteger('delivery_zone_id')->unsigned()->nullable();
            $table->bigInteger('delivery_region_id')->unsigned()->nullable();
            $table->bigInteger('delivery_district_id')->unsigned()->nullable();
            $table->bigInteger('delivery_place_id')->unsigned()->nullable();


            $table->bigInteger('approve_by')->unsigned()->nullable();
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
