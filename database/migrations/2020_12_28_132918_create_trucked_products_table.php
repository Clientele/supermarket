<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTruckedProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('trucked_products', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('original_depot_id')->unsigned();
            $table->bigInteger('product_id')->unsigned();
            $table->bigInteger('product_variant_id')->unsigned();
            $table->bigInteger('staff_id')->unsigned(); //sales_person

            $table->integer('received_quantity')->default(0);
            $table->integer('remaining_quantity')->default(0);

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
        Schema::dropIfExists('trucked_products');
    }
}
