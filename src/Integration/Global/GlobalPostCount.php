<?php

namespace Xypp\Collector\Integration\Global;

use Flarum\Post\Post;
use Xypp\Collector\Data\ConditionAccumulation;
use Xypp\Collector\GlobalConditionDefinition;
use Xypp\Collector\Helper\CommandContextHelper;

class GlobalPostCount extends GlobalConditionDefinition
{
    public bool $accumulateAbsolute = true;
    protected CommandContextHelper $commandContextHelper;
    public function __construct(CommandContextHelper $commandContextHelper)
    {
        parent::__construct("post_count", null, "xypp-collector.ref.integration.global-condition.post_count");
        $this->commandContextHelper = $commandContextHelper;
    }
    public function getAbsoluteValue(ConditionAccumulation $conditionAccumulation): bool
    {
        $posts = Post::query()->orderByDesc('created_at')->get();
        $this->commandContextHelper->withProgressBar($posts, function (Post $post) use (&$conditionAccumulation) {
            if ($post->discussion->hidden_at)
                return;
            if ($post->hidden_at)
                return;
            $conditionAccumulation->updateValue($post->created_at, 1);
        });
        if (!$conditionAccumulation->dirty)
            return false;
        return true;
    }
}