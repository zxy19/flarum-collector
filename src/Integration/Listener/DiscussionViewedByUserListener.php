<?php

namespace Xypp\Collector\Integration\Listener;

use Illuminate\Events\Dispatcher;
use Michaelbelgium\Discussionviews\Events\DiscussionWasViewed;
use Xypp\Collector\Data\ConditionData;
use Xypp\Collector\Event\UpdateCondition;

class DiscussionViewedByUserListener
{
    protected $events;
    public function __construct(Dispatcher $events)
    {
        $this->events = $events;
    }
    public function __invoke(DiscussionWasViewed $event)
    {
        $user = $event->getViewer();
        if (!$user || $user->isGuest())
            return;
        $this->events->dispatch(
            new UpdateCondition(
                $user,
                [new ConditionData('discussion_viewed_by_user', 1)]
            )
        );
    }
}
