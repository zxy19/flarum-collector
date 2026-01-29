<?php

namespace Xypp\Collector\Integration\Conditions;

use Michaelbelgium\Discussionviews\Models\DiscussionView;
use Xypp\Collector\ConditionDefinition;
use Xypp\Collector\Data\ConditionAccumulation;

class DiscussionViewedByUser extends ConditionDefinition
{
    public bool $accumulateAbsolute = true;
    public function __construct()
    {
        parent::__construct("discussion_viewed_by_user", null, "xypp-collector.ref.integration.condition.discussion_viewed_by_user");
    }
    public function getAbsoluteValue(\Flarum\User\User $user, ConditionAccumulation $conditionAccumulation): bool
    {
        $views = DiscussionView::where('user_id', $user->id)->orderByDesc('visited_at')->get();
        foreach ($views as $view) {
            $conditionAccumulation->updateValue($view->visited_at, 1);
        }
        return true;
    }
}
