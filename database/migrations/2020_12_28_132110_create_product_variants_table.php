<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductVariantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_variants', function (Blueprint $table) {

            $table->id();
            $table->bigInteger('product_id')->unsigned();
            $table->bigInteger('vendor_id')->unsigned();
            $table->string('variant_name');

            $table->integer('restocking_quantity')->default(0);
            $table->string('measuring_unit')->nullable();

            $table->double('base_price',15,0)->default(0)->nullable();

            $table->boolean('is_published');

            $table->string('thumbnail_img')->nullable();

            $table->bigInteger('created_by')->unsigned()->nullable();
            $table->bigInteger('deleted_by')->unsigned()->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product_variants');
    }
}
