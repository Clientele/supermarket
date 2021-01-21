<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDepotProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('depot_products', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('depot_id')->unsigned();
            $table->bigInteger('vendor_id')->unsigned();
            $table->bigInteger('product_id')->unsigned();
            $table->bigInteger('product_variant_id')->unsigned();

            $table->integer('received_quantity')->default(0);
            $table->integer('remaining_quantity')->default(0);

            $table->string('batch_number')->nullable();
            $table->dateTime('expiry_date')->nullable();
            $table->dateTime('received_at')->nullable();
            $table->bigInteger('receiver_id')->nullable();

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
        Schema::dropIfExists('depot_products');
    }
}
