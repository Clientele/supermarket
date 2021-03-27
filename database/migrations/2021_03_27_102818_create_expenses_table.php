<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExpensesTable extends Migration
{
    /**
     * Run the migrations.
     * @return void
     */
    public function up()
    {
        Schema::create('expenses', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('branch_id')->unsigned()->nullable();
            $table->double('amount',15,2)->nullable();
            $table->dateTime('date')->nullable();
            $table->string('description')->nullable();
            $table->bigInteger('created_by')->unsigned()->nullable();
            $table->timestamps();


        });
    }


    /**
     * Reverse the migrations.
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('expenses');
    }
}
