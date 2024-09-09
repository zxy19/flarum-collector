<?php

namespace Xypp\Collector\Helper;

use Flarum\Foundation\ValidationException;
use Flarum\Locale\Translator;
use Flarum\Notification\NotificationSyncer;
use Flarum\User\User;
use Xypp\Collector\ConditionDefinition;
use Xypp\Collector\Data\ConditionData;
use Xypp\Collector\Event\ConditionChange;
use Xypp\Collector\Extend\ConditionDefinitionCollection;
use Xypp\Collector\Condition;
use Illuminate\Events\Dispatcher;


class ConditionHelper
{
    public RewardHelper $rewardHelper;
    public NotificationSyncer $notifications;
    public ConditionDefinitionCollection $collection;
    public CarbonZoneHelper $cz;
    public Translator $translator;
    public Dispatcher $events;
    public function __construct(
        ConditionDefinitionCollection $collection,
        RewardHelper $rewardHelper,
        NotificationSyncer $notifications,
        CarbonZoneHelper $carbonZoneHelper,
        Translator $translator,
        Dispatcher $events
    ) {
        $this->collection = $collection;
        $this->notifications = $notifications;
        $this->rewardHelper = $rewardHelper;
        $this->cz = $carbonZoneHelper;
        $this->translator = $translator;
        $this->events = $events;
    }
    public function getAllConditionName(): array
    {
        return $this->collection->getAllConditionName();
    }
    public function getConditionDefinition(string $name): ConditionDefinition
    {
        return $this->collection->getConditionDefinition($name);
    }

    public function checkCondition(string $name, string $operator, int $value, ?int $span, Condition $condition): bool
    {
        $currentTime = $this->cz->now();
        $conditionDefine = $this->collection->getConditionDefinition($name);
        if (!$condition) {
            return false;
        }
        if ($span)
            $currentValue = $condition->getAccumulation()->getSpan($currentTime, $span);
        else
            $currentValue = $condition->getAccumulation()->total;
        if (!$conditionDefine->compare($currentValue, $operator, $value)) {
            return false;
        }
        return true;
    }
    public function updateConditions(User $user, ConditionData|array $data, bool $frontend = false)
    {
        if (is_array($data)) {
            foreach ($data as $condition) {
                $this->updateConditions($user, $condition, $frontend);
            }
            return;
        }

        $conditionDefine = $this->collection->getConditionDefinition($data->name);
        if ($frontend && !$conditionDefine->allowFrontendTrigger) {
            throw new ValidationException([
                "msg" => $this->translator->trans('xypp-collector.api.condition_not_allow_frontend')
            ]);
        }
        $model = Condition::lockForUpdate()->where('user_id', $user->id)->where('name', $data->name)->first();

        if (!$model) {
            $model = new Condition();
            $model->user_id = $user->id;
            $model->name = $data->name;
            $model->value = 0;
        }

        // Support for absolute value
        if ($data->absolute) {
            $data->value -= $model->value;
            if ($data->value == 0) {
                return;
            }
        }

        $model->value += $data->value;
        $model->getAccumulation()->updateValue($this->cz->now(), $data->value);
        if ($data->flag) {
            $model->getAccumulation()->updateFlag($data->flag);
        }
        $model->updateTimestamps();
        $model->save();

        $this->events->dispatch(new ConditionChange($user, $data, $model));
    }


    public function updateUserCondition(User $user, string $name): Condition
    {
        $conditionDefine = $this->collection->getConditionDefinition($name);
        $model = Condition::lockForUpdate()->where('user_id', $user->id)->where('name', $name)->first();
        if (!$model) {
            $model = new Condition();
            $model->user_id = $user->id;
            $model->name = $name;
            $model->value = 0;
        }
        $accumulation = $model->getAccumulation();
        if ($conditionDefine->updateValue($user, $accumulation)) {
            $model->value = $accumulation->total;
            $model->updateTimestamps();
            $model->save();
            $this->events->dispatch(new ConditionChange($user, new ConditionData(
                $name,
                $accumulation->total,
                $accumulation->updateFlag
            ), $model));
        }

        return $model;
    }
}