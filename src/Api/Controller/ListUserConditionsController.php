<?php

namespace Xypp\Collector\Api\Controller;

use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Xypp\Collector\Api\Serializer\ConditionSerializer;
use Xypp\Collector\Condition;

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
        $results = Condition::where('user_id', $actor->id)->get();
        return $results;
    }
}
