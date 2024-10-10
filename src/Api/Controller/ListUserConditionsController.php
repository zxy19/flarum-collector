<?php

namespace Xypp\Collector\Api\Controller;

use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use Flarum\User\User;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Xypp\Collector\Api\Serializer\ConditionSerializer;
use Xypp\Collector\Condition;
use Xypp\Collector\GlobalCondition;

class ListUserConditionsController extends AbstractListController
{
    /**
     * {@inheritdoc}
     */
    public $serializer = ConditionSerializer::class;
    /**
     * {@inheritdoc}
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $user_id = Arr::get($request->getQueryParams(), 'id');
        if ($user_id) {
            $user = User::findOrFail($user_id);
            if ($actor->id != $user->id)
                $actor->assertCan("user.view-condition");
            $actor = $user;
        }
        $results = Condition::where('user_id', $actor->id)->get();

        $maxId = $results->max("id") + 1;
        return $results->concat(GlobalCondition::all()->transform(function ($model) use ($maxId) {
            $model->id = $maxId + $model->id;
            return $model;
        }));
    }
}
