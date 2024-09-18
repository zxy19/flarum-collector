<?php

namespace Xypp\Collector\Console;

use Carbon\Carbon;
use Flarum\User\User;
use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputArgument;
use Xypp\Collector\Data\ConditionData;
use Xypp\Collector\Event\ConditionChange;
use Xypp\Collector\Event\GlobalConditionChange;
use Xypp\Collector\GlobalCondition;
use Xypp\Collector\Helper\ConditionHelper;
use Xypp\Collector\Condition;
use Illuminate\Events\Dispatcher;
use Xypp\Collector\Helper\SettingHelper;

class UpdateCondition extends Command
{
    /**
     * @var string
     */
    protected $signature = 'collector:update';

    /**
     * @var string
     */
    protected $description = 'Update condition from database.';

    protected ConditionHelper $conditionHelper;
    protected Dispatcher $events;
    protected SettingHelper $settingHelper;
    public function __construct(ConditionHelper $conditionHelper, Dispatcher $events, SettingHelper $settingHelper)
    {
        parent::__construct();
        $this->addArgument("names", InputArgument::OPTIONAL | InputArgument::IS_ARRAY, "Condition names to update");
        $this->addOption("no-dispatch-update", "a", InputArgument::OPTIONAL, "Not update achievement");


        $this->conditionHelper = $conditionHelper;
        $this->events = $events;
        $this->settingHelper = $settingHelper;
    }
    public function handle()
    {
        $names = $this->argument("names");
        if ($names && !is_array($names)) {
            $names = [$names];
        }


        $this->info("Update Global Condition");
        $updatedGlobalCondition = [];
        foreach ($this->conditionHelper->getGlobalConditionName() as $conditionDefinitionName) {
            if ($names && !in_array($conditionDefinitionName, $names))
                continue;
            if (!$this->settingHelper->enable("abs", $conditionDefinitionName) && !$this->option("overwrite"))
                continue;
            $this->info("Calculating $conditionDefinitionName");
            $globalConditionDefinition = $this->conditionHelper->getGlobalConditionDefinition($conditionDefinitionName);
            if (!$globalConditionDefinition->accumulateUpdate) {
                $this->info($globalConditionDefinition->name . "not support update. Skipped");
                continue;
            }
            $condition = GlobalCondition::where("name", $conditionDefinitionName)->first();
            if (!$condition) {
                $condition = new GlobalCondition();
                $condition->name = $conditionDefinitionName;
            }
            $accumulation = $condition->getAccumulation();
            $result = $globalConditionDefinition->updateValue($accumulation);
            if (!$result)
                continue;
            $condition->setAccumulation($accumulation);
            $condition->value = $accumulation->total;
            $condition->updateTimestamps();
            $condition->save();
            $updatedGlobalCondition[$conditionDefinitionName] = $condition;
        }


        $users = User::all();
        $this->info("Updating all conditions for " . $users->count() . " users.");

        $userConditionChange = [];
        $users->each(function (User $user) use (&$userConditionChange) {
            $userConditionChange[$user->id] = [];
        });
        foreach ($this->conditionHelper->getAllConditionName() as $conditionDefinitionName) {
            if ($names && !in_array($conditionDefinitionName, $names))
                continue;
            if (!$this->settingHelper->enable("update", $conditionDefinitionName))
                continue;
            $conditionDefinition = $this->conditionHelper->getConditionDefinition($conditionDefinitionName);
            if (!$conditionDefinition->accumulateUpdate) {
                $this->info($conditionDefinition->name . "not support update. Skipped");
                continue;
            }
            $this->info("Updating $conditionDefinitionName");
            $this->withProgressBar(
                $users,
                function (User $user) use ($conditionDefinitionName, $conditionDefinition, &$userConditionChange) {
                    $condition = Condition::where("name", $conditionDefinitionName)->where("user_id", $user->id)->first();
                    if (!$condition) {
                        $condition = new Condition();
                        $condition->name = $conditionDefinitionName;
                        $condition->user_id = $user->id;
                    }

                    $accumulation = $condition->getAccumulation();
                    $result = $conditionDefinition->updateValue($user, $accumulation);
                    if (!$result)
                        return;
                    $condition->setAccumulation($accumulation);
                    $condition->value = $accumulation->total;
                    $condition->updateTimestamps();
                    $condition->save();
                    $userConditionChange[$user->id][] = $condition;
                }
            );
            $this->info("Done");
        }
        $this->info("All Done");
        if ($this->option("no-dispatch-update"))
            return;

        $this->info("Dispatch changes");
        $this->withProgressBar(
            $users,
            function (User $user) use (&$userConditionChange) {
                /**
                 * @var Condition $condition
                 */
                foreach ($userConditionChange[$user->id] as $condition) {
                    $this->events->dispatch(new ConditionChange(
                        $user,
                        new ConditionData($condition->name, $condition->value, $condition->getAccumulation()->updateFlag, true),
                        $condition
                    ));
                }
            }
        );
        $this->info("Done");

        foreach ($this->conditionHelper->getGlobalConditionName() as $conditionDefinitionName) {
            if (isset($updatedGlobalCondition[$conditionDefinitionName])) {
                $this->info("Dispatch Global $conditionDefinitionName");
                $this->events->dispatch(new GlobalConditionChange(
                    new ConditionData($condition->name, $condition->value, $condition->getAccumulation()->updateFlag, true),
                    $updatedGlobalCondition[$conditionDefinitionName]
                ));
            }
        }
        $this->info("All Done");
    }
}