<?php

namespace Xypp\Collector\Console;

use Flarum\User\User;
use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputArgument;
use Xypp\Collector\Data\ConditionAccumulation;
use Xypp\Collector\Data\ConditionData;
use Xypp\Collector\Event\ConditionChange;
use Xypp\Collector\Helper\ConditionHelper;
use Xypp\Collector\Condition;
use Illuminate\Events\Dispatcher;
use Xypp\Collector\Helper\SettingHelper;

class RecalculateCondition extends Command
{
    /**
     * @var string
     */
    protected $signature = 'collector:recalculate';

    /**
     * @var string
     */
    protected $description = 'Recalculate condition from database absolutely.';

    protected ConditionHelper $conditionHelper;
    protected Dispatcher $events;
    protected SettingHelper $settingHelper;
    public function __construct(ConditionHelper $conditionHelper, Dispatcher $events, SettingHelper $settingHelper)
    {
        parent::__construct();

        $this->addArgument("names", InputArgument::OPTIONAL | InputArgument::IS_ARRAY, "Condition names to update");
        $this->addOption("overwrite", "o", InputArgument::OPTIONAL, "Overwrite item that cannot get absolute accumulation data");
        $this->addOption("skip", "s", InputArgument::OPTIONAL, "Skip item that cannot get absolute accumulation data");
        $this->addOption("no-dispatch-update", "a", InputArgument::OPTIONAL, "Do not dispatch update event");

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
        $users = User::all();
        $this->info("Recalculate all conditions for " . $users->count() . " users.");

        $userConditionChange = [];
        $users->each(function (User $user) use (&$userConditionChange) {
            $userConditionChange[$user->id] = [];
        });

        foreach ($this->conditionHelper->getAllConditionName() as $conditionDefinitionName) {
            if ($names && !in_array($conditionDefinitionName, $names))
                continue;
            if (!$this->settingHelper->enable("abs", $conditionDefinitionName) && !$this->option("overwrite"))
                continue;
            $conditionDefinition = $this->conditionHelper->getConditionDefinition($conditionDefinitionName);
            if (!$conditionDefinition->accumulateAbsolute) {
                if (!$this->option("overwrite")) {
                    if ($this->option("skip")) {
                        $this->info("Skipped");
                        continue;
                    }
                    $q = "Condition $conditionDefinitionName is not accumulateAbsolute able," .
                        "continue with losing all accumulate data(which used to calc value in span)." .
                        " do you want to do it? (y/n)";
                    $ans = $this->askWithCompletion($q, ["y", "n"], "n");
                    if ($ans != "y") {
                        $this->info("Skipped");
                        continue;
                    }
                }
            }

            $this->info("Calculating $conditionDefinitionName");
            $this->withProgressBar(
                $users,
                function (User $user) use ($conditionDefinitionName, $conditionDefinition, &$userConditionChange) {
                    $accumulation = new ConditionAccumulation("{}");
                    $result = $conditionDefinition->getAbsoluteValue($user, $accumulation);
                    $condition = Condition::where("name", $conditionDefinitionName)->where("user_id", $user->id)->first();
                    if (!$condition) {
                        $condition = new Condition();
                        $condition->name = $conditionDefinitionName;
                        $condition->user_id = $user->id;
                    }
                    $condition->setAccumulation($accumulation);
                    $condition->value = $accumulation->total;
                    $condition->updateTimestamps();
                    $condition->save();
                    
                    if ($result)
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
        $this->info("All Done");
    }
}