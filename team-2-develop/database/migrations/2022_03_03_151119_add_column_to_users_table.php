<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColumnToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('remember_token')->nullable()->change();
            $table->tinyInteger('gender');
            $table->date('birthday');
            $table->string('address');
            $table->string('phone');
            $table->string('code_staff');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('remember_token')->nullable(false)->change();
            $table->dropColumn('gender', 'birthday', 'address', 'phone', 'code_staff');
        });
    }
}
