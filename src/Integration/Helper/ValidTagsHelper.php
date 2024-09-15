<?php

namespace Xypp\Collector\Integration\Helper;
use Flarum\Settings\SettingsRepositoryInterface;

class ValidTagsHelper
{
    protected $settings;
    protected ?array $invalidTags = null;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }
    public function getInvalidTags(): array
    {
        if ($this->invalidTags === null) {
            $this->invalidTags = json_decode($this->settings->get("xypp.collector.invalid_tags", "[]"), true);
        }
        return $this->invalidTags;
    }

    public function isAllTagValid($tags): bool
    {
        if (count($tags)) {
            $invalidTags = $this->getInvalidTags();
            foreach ($tags as $tag) {
                if (isset($invalidTags[$tag->id]) && $invalidTags[$tag->id])
                    return false;
            }
        }
        return true;
    }
}