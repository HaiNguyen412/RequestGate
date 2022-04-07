<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Comment;
use Faker\Generator as Faker;

$factory->define(Comment::class, function (Faker $faker) {
    return [
        'request_id' => random_int(1, 20),
        'user_id' => random_int(1, 20), 
        'content' => $faker->sentence(), 
    ];
});
