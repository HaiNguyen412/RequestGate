<?php


use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([DepartmentSeeder::class, UserSeeder::class, CategorySeeder::class, RequestSeeder::class, CommentSeeder::class]);
    }
}
