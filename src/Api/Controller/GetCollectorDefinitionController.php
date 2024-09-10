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
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        return new JsonResponse([
            "conditions" => array_map(
                function ($conditionName) use (&$ret) {
                    return [
                        "key" => $conditionName,
                        "trans" => $this->translator->trans($this->conditionHelper->getConditionDefinition($conditionName)->translateKey),
                        "abs" => $this->conditionHelper->getConditionDefinition($conditionName)->accumulateAbsolute
                    ];
                },
                $this->conditionHelper->getAllConditionName()
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