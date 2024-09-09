<?php

use AntoineFr\Money\Event\MoneyUpdated;
use Flarum\Discussion\Event\Started;
use Flarum\Extend;
use Flarum\Post\Event\Posted;
use Michaelbelgium\Discussionviews\Events\DiscussionWasViewed;
use Xypp\Collector\Integration\Listener\DiscussionStartedListener;
use Xypp\Collector\Integration\Listener\DiscussionViewed;
use Xypp\Collector\Integration\Listener\LikeEventsListener;
use Xypp\Collector\Integration\Listener\MoneyChangeListener;
use Xypp\Collector\Integration\Listener\PostPostedListener;
use Xypp\Collector\Integration\Listener\StoreEventListener;
use Xypp\Collector\Integration\Listener\UserEventsListener;
use Xypp\Collector\Integration\Middleware\ApiVisitCheck;
use Xypp\Store\Event\PurchaseDone;

return [
    (new Extend\Event)
        ->listen(Posted::class, PostPostedListener::class)
        ->listen(Started::class, DiscussionStartedListener::class)
        ->subscribe(UserEventsListener::class)
        //Integrate with AntoineFr/money
        ->listen(MoneyUpdated::class, MoneyChangeListener::class)
        //Integrate with michaelbelgium/flarum-discussion-views
        ->listen(DiscussionWasViewed::class, DiscussionViewed::class)
        //Integrate with xypp/store
        ->listen(PurchaseDone::class, StoreEventListener::class)
        //Integrate with flarum/likes
        ->subscribe(LikeEventsListener::class),
    (new Extend\Middleware("forum"))
        ->add(ApiVisitCheck::class)
];