<?php

namespace Xypp\Collector\Integration\Global;

use Flarum\Post\Post;
use Xypp\Collector\Data\ConditionAccumulation;
use Xypp\Collector\GlobalConditionDefinition;
use Xypp\Collector\Helper\CommandContextHelper;
use Xypp\Collector\Integration\Helper\ValidTagsHelper;

class GlobalValidPostCount extends GlobalConditionDefinition
{
    public bool $accumulateAbsolute = true;
    private $helper;
    protected CommandContextHelper $commandContextHelper;
    public function __construct(ValidTagsHelper $helper, CommandContextHelper $commandContextHelper)
    {
        parent::__construct("valid_post_count", null, "xypp-collector.ref.integration.global-condition.valid_post_count");
        $this->helper = $helper;
        $this->commandContextHelper = $commandContextHelper;
    }
    public function getAbsoluteValue(ConditionAccumulation $conditionAccumulation): bool
    {
        $posts = Post::query()->orderByDesc('created_at')->get(['created_at', 'discussion_id', 'hidden_at']);
        $this->commandContextHelper->withProgressBar($posts, function ($post) use (&$conditionAccumulation) {
            if ($post->discussion->hidden_at)
                return;
            if ($post->hidden_at)
                return;
            if ($this->helper->isAllTagValid($post->discussion->tags))
                $conditionAccumulation->updateValue($post->created_at, 1);
        });
        if (!$conditionAccumulation->dirty)
            return false;
        return true;
    }
}