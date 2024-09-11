<?php
use Xypp\Collector\Condition;
use Xypp\Collector\ConditionDefinition;
use Xypp\Collector\Data\ConditionAccumulation;
use Xypp\Collector\Data\ConditionData;
use Xypp\Collector\Extend\ConditionProvider;
use Xypp\Collector\Extend\RewardProvider;
use Xypp\Collector\Helper\ConditionHelper;
use Xypp\Collector\Helper\RewardHelper;
use Xypp\Collector\RewardDefinition;
use Xypp\ForumQuests\QuestCondition;
class_alias(ConditionAccumulation::class, Xypp\ForumQuests\Data\ConditionAccumulation::class, true);
class_alias(ConditionData::class, \Xypp\ForumQuests\Data\ConditionData::class, true);
class_alias(ConditionHelper::class, \Xypp\ForumQuests\Helper\ConditionHelper::class, true);
class_alias(RewardHelper::class, \Xypp\ForumQuests\Helper\RewardHelper::class, true);
class_alias(ConditionProvider::class, \Xypp\ForumQuests\Extend\ConditionProvider::class, true);
class_alias(RewardProvider::class, \Xypp\ForumQuests\Extend\RewardProvider::class, true);
class_alias(Condition::class, \Xypp\ForumQuests\QuestCondition::class, true);
class_alias(RewardDefinition::class, \Xypp\ForumQuests\RewardDefinition::class, true);
class_alias(ConditionDefinition::class, \Xypp\ForumQuests\ConditionDefinition::class, true);