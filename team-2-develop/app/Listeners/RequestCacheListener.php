<?php

namespace App\Listeners;

use App\Events\RequestCache;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class RequestCacheListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  RequestCache  $event
     * @return void
     */
    public function handle(RequestCache $event)
    {
        if (cache()->has('requests.list')) {
            cache()->forget('requests.list');
        }
        if (cache()->has('requests.history')) {
            cache()->forget('requests.history');
        }
    }
}
