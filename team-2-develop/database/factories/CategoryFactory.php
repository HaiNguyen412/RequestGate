<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Category;
use Faker\Generator as Faker;
use phpDocumentor\Reflection\Types\Boolean;

$factory->define(Category::class, function (Faker $faker) {
    return [
        'name' => $faker->name(),
        'user_id' => random_int(1, 20),
        'status' => random_int(0, 1),
    ];
});
