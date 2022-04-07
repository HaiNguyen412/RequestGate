<?php

namespace App\Models;

use App\Events\RequestCache;
use App\Filters\Filterable;
use Illuminate\Database\Eloquent\Model;

class Request extends Model
{
    use Filterable;
    protected $fillable = [
        'category_id', 'user_id', 'due_date','status', 'description', 'priority', 'title', 'approval'
    ];

//    protected $dispatchesEvents = [
//        'created' => RequestCache::class,
//        'updated' => RequestCache::class,
//        'deleted' => RequestCache::class,
//    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
