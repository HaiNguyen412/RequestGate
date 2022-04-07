<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\Models\User;
use Faker\Generator as Faker;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(User::class, function (Faker $faker) {
    return [
        'department_id' => random_int(1, 20),
        'role_id' => random_int(1, 3), 
        'name' => $faker->name(),
        'password' => Hash::make('123456'),
        'remember_token' => Str::random(10),
        'email' => $faker->email,
        'gender' => random_int(1, 2),
        'birthday' => $faker->date(),
        'address' => $faker->address(),
        'phone' => $faker->phoneNumber(),
        'code_staff' => $faker->userName(),
        'status' => random_int(0, 2),
    ];
});
