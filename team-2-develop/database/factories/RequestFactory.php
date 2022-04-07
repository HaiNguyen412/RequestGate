<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Request;
use Faker\Generator as Faker;

$factory->define(Request::class, function (Faker $faker) {
    return [
        'category_id' => random_int(1, 20),
        'user_id' => random_int(1, 20),
        'due_date' => $faker->date(),
        'title' => $faker->title(),
        'status' => random_int(1, 3),
        'description' => $faker->sentence(), 
        'priority' => random_int(1, 3), 
    ];
});
