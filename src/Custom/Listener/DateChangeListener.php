<?php

namespace Xypp\Collector\Custom\Listener;
use Flarum\User\User;
use Illuminate\Events\Dispatcher;
use Xypp\Collector\Condition;
use Xypp\Collector\Custom\CustomCondition;
use Xypp\Collector\Event\DailyUpdate;
use Xypp\Collector\Helper\SettingHelper;
use Xypp\ForumQuests\Helper\ConditionHelper;
use Xypp\LocalizeDate\Event\DateChangeEvent;

class DateChangeListener
{

    private $settingHelper;
    private $conditionHelper;
    private $events;
    public function __construct(SettingHelper $settingHelper, ConditionHelper $conditionHelper, Dispatcher $events)
    {
        $this->settingHelper = $settingHelper;
        $this->conditionHelper = $conditionHelper;
        $this->events = $events;
    }
    public function __invoke(DateChangeEvent $event)
    {
        if (!$this->settingHelper->autoUpdate())
            return;
        $users = User::all();
        CustomCondition::all()->each(function (CustomCondition $condition) use ($event, $users) {
            try {
                $def = $this->conditionHelper->getConditionDefinition($condition->name);
            } catch (\Throwable $e) {
                return;
            }
            if (!$def)
                return;
            if (!$this->settingHelper->enable("update", $condition->name))
                return;
            $users->each(function (User $user) use ($condition, $def, $event) {
                $model = Condition::lockForUpdate()->where('user_id', $user->id)->where('name', $def->name)->first();
                if ($def->updateValue($user, $model->getAccumulation())) {
                    $model->value = $model->getAccumulation()->total;
                    $model->save();
                }
            });
        });

        $this->events->dispatch(new DailyUpdate());
    }
}