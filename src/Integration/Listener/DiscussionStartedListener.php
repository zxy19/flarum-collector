<?php

namespace Xypp\Collector\Integration\Listener;

use \Flarum\Discussion\Event\Started;
use Illuminate\Events\Dispatcher;
use Xypp\Collector\Data\ConditionData;
use Xypp\Collector\Event\UpdateCondition;

class DiscussionStartedListener
{
    protected $events;
    public function __construct(Dispatcher $events)
    {
        $this->events = $events;
    }
    public function __invoke(Started $event)
    {
        $this->events->dispatch(
            new UpdateCondition(
                $event->actor,
                [new ConditionData('discussion_count', 1)]
            )
        );
    }
}