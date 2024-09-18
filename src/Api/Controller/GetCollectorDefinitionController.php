<?php

namespace Xypp\Collector\Api\Controller;
use Flarum\Http\RequestUtil;
use Flarum\Locale\Translator;
use Illuminate\Support\Arr;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Psr\Http\Server\RequestHandlerInterface;
use Xypp\Collector\Custom\CustomConditionDefinition;
use Xypp\Collector\Helper\ConditionHelper;
use Xypp\Collector\Helper\RewardHelper;
class GetCollectorDefinitionController implements RequestHandlerInterface
{
    protected ConditionHelper $conditionHelper;
    protected RewardHelper $rewardHelper;
    protected Translator $translator;
    public function __construct(ConditionHelper $conditionHelper, RewardHelper $rewardHelper, Translator $translator)
    {
        $this->conditionHelper = $conditionHelper;
        $this->rewardHelper = $rewardHelper;
        $this->translator = $translator;
    }
    protected function optionalTranslate(string $key, array $params = [])
    {
        if (str_contains($key, ".")) {
            return $this->translator->trans($key, $params);
        } else {
            return $key;
        }
    }
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        return new JsonResponse([
            "conditions" => array_merge(
                array_map(
                    function ($conditionName) use (&$ret) {
                        $definition = $this->conditionHelper->getConditionDefinition($conditionName);
                        $ret = [
                            "global" => false,
                            "key" => $conditionName,
                            "trans" => $this->optionalTranslate($definition->translateKey),
                            "abs" => $definition->accumulateAbsolute,
                            "manual" => $definition->needManualUpdate,
                            "update" => $definition->accumulateUpdate,
                        ];
                        if ($definition instanceof CustomConditionDefinition) {
                            $ret["evaluation"] = $definition->evaluation;
                        }
                        return $ret;
                    },
                    $this->conditionHelper->getAllConditionName()
                ),
                array_map(
                    function ($conditionName) use (&$ret) {
                        return [
                            "global" => true,
                            "key" => $conditionName,
                            "trans" => $this->optionalTranslate($this->conditionHelper->getGlobalConditionDefinition($conditionName)->translateKey),
                            "abs" => $this->conditionHelper->getGlobalConditionDefinition($conditionName)->accumulateAbsolute,
                            "manual" => $this->conditionHelper->getGlobalConditionDefinition($conditionName)->needManualUpdate,
                            "update" => $this->conditionHelper->getGlobalConditionDefinition($conditionName)->accumulateUpdate,
                        ];
                    },
                    $this->conditionHelper->getGlobalConditionName()
                )
            ),
            "rewards" => array_map(
                function ($rewardName) use (&$ret) {
                    return [
                        "key" => $rewardName,
                        "trans" => $this->translator->trans($this->rewardHelper->getRewardDefinition($rewardName)->translateKey)
                    ];
                },
                $this->rewardHelper->getAllRewardNames()
            )
        ]);
    }
}