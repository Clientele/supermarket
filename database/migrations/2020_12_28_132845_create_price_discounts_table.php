<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePriceDiscountsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('price_discounts', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('vendor_id')->unsigned()->nullable();
            $table->bigInteger('applicable_zone_id')->unsigned()->nullable();
            $table->bigInteger('product_id')->unsigned()->nullable();
            $table->bigInteger('product_variant_id')->unsigned()->nullable();

            $table->boolean('is_for_one_zone')->default(true);
            $table->boolean('is_for_one_product')->default(true);
            $table->boolean('is_for_one_variant')->default(false);

            $table->double('amount',15,0)->nullable()->default(0);
            $table->double('percentage')->nullable()->default(0);
            $table->double('minimum_order_value')->nullable()->default(0);

            $table->dateTime('starts_at');
            $table->dateTime('ends_at');


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
        Schema::dropIfExists('price_discounts');
    }
}
