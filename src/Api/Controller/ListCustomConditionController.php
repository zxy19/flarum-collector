<?php

namespace Xypp\Collector\Api\Controller;

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use Flarum\User\User;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Xypp\Collector\Api\Serializer\CustomConditionSerializer;
use Xypp\Collector\Condition;
use Xypp\Collector\Custom\CustomCondition;

class ListCustomConditionController extends AbstractListController
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
        return CustomCondition::all();
    }
}
