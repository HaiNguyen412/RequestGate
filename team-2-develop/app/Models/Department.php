<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Events\DepartmentEvent;

class Department extends Model
{
    protected $fillable = [
        'name',
    ];

    protected $dispatchesEvents = [
        'created' => DepartmentEvent::class,
        'deleted' => DepartmentEvent::class,
        'updated' => DepartmentEvent::class
    ];

    public function users()
    {
        $this->hasMany(User::class);
    }
}
