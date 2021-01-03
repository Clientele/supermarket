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
            $table->bigInteger('vendor_id')->unsigned();
            $table->bigInteger('product_id')->unsigned();
            $table->bigInteger('product_variant_id')->unsigned();

            $table->integer('ordered_quantity')->default(0);
            $table->integer('delivered_quantity')->default(0);
            $table->bigInteger('discount_id')->unsigned()->nullable();
            $table->boolean('has_delivered')->default(false)->nullable();

            $table->bigInteger('delivered_by')->unsigned()->nullable();

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
        Schema::dropIfExists('order_products');
    }
}
