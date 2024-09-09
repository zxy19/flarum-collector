<?php

namespace Xypp\Collector\Extend;

use Flarum\Extend\ExtenderInterface;
use Flarum\Extension\Extension;
use Flarum\Foundation\ValidationException;
use Flarum\Locale\Translator;
use \Illuminate\Contracts\Container\Container;
use Xypp\Collector\ConditionDefinition;
use Xypp\Collector\Helper\ConditionHelper;

class ConditionDefinitionCollection
{
    protected array $conditionsDefinitions = [];
    public Translator $translator;
    public function __construct(Translator $translator)
    {
        $this->translator = $translator;
    }
    public function addDefinition(ConditionDefinition $conditionDefinition)
    {
        $this->conditionsDefinitions[$conditionDefinition->name] = $conditionDefinition;
    }
    public function getAllConditionName(): array
    {
        return array_keys($this->conditionsDefinitions);
    }
    public function getConditionDefinition(string $name): ConditionDefinition
    {
        if (!isset($this->conditionsDefinitions[$name])) {
            throw new ValidationException([
                "error" => $this->translator->trans("xypp-collector.forum。condition_not_found", ["condition" => $name])
            ]);
        }
        return $this->conditionsDefinitions[$name];
    }

}