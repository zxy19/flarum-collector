<?php

namespace Xypp\Collector\Integration\Listener;

use \Flarum\Post\Event\Posted;
use Illuminate\Events\Dispatcher;
use Xypp\Collector\Data\ConditionData;
use Xypp\Collector\Event\UpdateCondition;

class PostPostedListener
{
    protected $events;
    public function __construct(Dispatcher $events)
    {
        $this->events = $events;
    }
    public function __invoke(Posted $event)
    {
        $this->events->dispatch(
            new UpdateCondition(
                $event->actor,
                [new ConditionData('post_count', 1)]
            )
        );
    }
}