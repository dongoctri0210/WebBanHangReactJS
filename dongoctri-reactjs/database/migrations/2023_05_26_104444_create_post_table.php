<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('db_post', function (Blueprint $table) {
            $table->id(); //id
            $table->unsignedInteger('topic_id');  
            $table->string('title');
            $table->string('slug');
            $table->mediumtext('detail');
            $table->string('image', 1000)->nullable();
            $table->string('type');
            $table->string('metakey');
            $table->string('metadesc');       
            $table->timestamps(); //created_at, updated_at
            $table->unsignedInteger('created_by')->default(1);
            $table->unsignedInteger('updated_by')->nullable();
            $table->unsignedTinyInteger('status')->default(2);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('db_post');
    }
}
