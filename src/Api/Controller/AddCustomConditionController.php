<?php

namespace Xypp\Collector\Api\Controller;

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Http\RequestUtil;
use Flarum\User\User;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Xypp\Collector\Api\Serializer\CustomConditionSerializer;
use Xypp\Collector\Condition;
use Xypp\Collector\Custom\ConditionCustomCondition;
use Xypp\Collector\Custom\CustomCondition;

class AddCustomConditionController extends AbstractCreateController
{
    /**
     * {@inheritdoc}
     */
    public $serializer = CustomConditionSerializer::class;
    /**
     * {@inheritdoc}
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertAdmin();
        $attributes = Arr::get($request->getParsedBody(), 'data.attributes', []);
        $model = new CustomCondition();
        $model->name = Arr::get($attributes, "name");
        $model->display_name = Arr::get($attributes, "display_name");
        $model->evaluation = Arr::get($attributes, "evaluation");
        $model->save();
        foreach ($model->getRelatedNamesFromEval() as $name) {
            $relate = new ConditionCustomCondition;
            $relate->custom_condition_id = $model->id;
            $relate->name = $name;
            $relate->save();
        }
        return $model;
    }
}
