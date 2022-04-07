<?php

namespace App\Filters;

class RequestFilters extends QueryFilters
{
    public function request($name)
    {
        return $this->builder
            ->where('title', 'like', '%'.$name.'%');
    }

    public function content($content)
    {
        return $this->builder
            ->where('description', 'like', '%'.$content.'%');
    }

    public function date($date)
    {
        return $this->builder
            ->whereDate('r.created_at', $date);
    }

    public function status($status)
    {
        return $this->builder
            ->where('r.status', $status);
    }

    public function author($name)
    {
        return $this->builder
            ->where('u1.name', $name);
    }

    public function assign($name)
    {
        return $this->builder
            ->where('u2.name', $name);
    }

    public function category($name)
    {
        return $this->builder
            ->where('c.name', $name);
    }
}
