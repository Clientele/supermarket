<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_products', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('order_id')->unsigned();
            $table->bigInteger('customer_id')->unsigned();
            $table->bigInteger('vendor_id')->unsigned()->nullable();
            $table->bigInteger('product_id')->unsigned();
            $table->bigInteger('product_variant_id')->unsigned();

            $table->bigInteger('selling_price_id')->unsigned()->nullable();
            $table->double('selling_price',15,0)->default(0.0)->nullable();
            $table->bigInteger('discount_id')->unsigned()->nullable();
            $table->double('discount_amount',15,0)->default(0.0)->nullable();

            $table->integer('ordered_qu§antity')->default(0);
            $table->integer('delivered_quantity')->default(0);
            $table->boolean('has_delivered')->default(false)->nullable();

            $table->boolean('is_rejected')->default(false)->nullable();
            $table->boolean('is_approved')->default(false)->nullable();
            $table->boolean('has_requested_products')->default(false)->nullable();
            $table->bigInteger('delivered_by')->unsigned()->nullable();

            $table->bigInteger('created_by')->unsigned()->nullable();
            $table->bigInteger('deleted_by')->unsigned()->nullable();

            $table->string('ordered_products_ids')->default('[]');

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
        Schema::dropIfExists('order_products');
    }
}
