<?php

namespace Xypp\Collector\Api\Controller;

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\Api\Controller\AbstractShowController;
use Flarum\Http\RequestUtil;
use Flarum\User\User;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Xypp\Collector\Api\Serializer\CustomConditionSerializer;
use Xypp\Collector\Condition;
use Xypp\Collector\Custom\ConditionCustomCondition;
use Xypp\Collector\Custom\CustomCondition;

class DeleteCustomConditionController extends AbstractDeleteController
{
    /**
     * {@inheritdoc}
     */
    public $serializer = CustomConditionSerializer::class;
    /**
     * {@inheritdoc}
     */
    protected function delete(ServerRequestInterface $request)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertAdmin();
        $id = Arr::get($request->getQueryParams(), 'id');
        $model = CustomCondition::findOrFail($id);
        ConditionCustomCondition::where("custom_condition_id", $model->id)->delete();
        return $model->delete();
    }
}
