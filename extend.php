<?php

/*
 * This file is part of xypp/collector.
 *
 * Copyright (c) 2024 小鱼飘飘.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Xypp\Collector;

use Flarum\Extend;
use Xypp\Collector\Api\Controller\GetCollectorDefinitionController;
use Xypp\Collector\Console\Debug;
use Xypp\Collector\Console\Migrate;
use Xypp\Collector\Console\RecalculateCondition;
use Xypp\Collector\Listener\ConditionModifierListener;
use Xypp\Collector\Console\UpdateCondition;
use Xypp\Collector\Console\UpdateRefreshCommand;
use Xypp\Collector\Provider\CollectorServiceProvider;
use Xypp\Collector\Provider\QuestSeriviceProvider;

return array_merge(
    [
        (new Extend\Frontend('forum'))
            ->js(__DIR__ . '/js/dist/forum.js')
            ->css(__DIR__ . '/less/forum.less'),
        (new Extend\Frontend('admin'))
            ->js(__DIR__ . '/js/dist/admin.js')
            ->css(__DIR__ . '/less/admin.less'),
        new Extend\Locales(__DIR__ . '/locale'),
        new Extend\Locales(__DIR__ . '/integration-locale'),
        (new Extend\Event())
            ->listen(\Xypp\Collector\Event\UpdateCondition::class, ConditionModifierListener::class),
        (new Extend\Routes('api'))
            ->post('/collector-condition', 'collector-condition.trigger', Api\Controller\FrontendConditionUpdateController::class)
            ->get('/collector-condition', 'collector-condition.index', Api\Controller\ListUserConditionsController::class)
            ->get('/collector-data', "collector-data.index", GetCollectorDefinitionController::class),
        (new Extend\Console())
            ->command(UpdateCondition::class)
            ->command(RecalculateCondition::class)
            ->command(Debug::class)
            ->command(Migrate::class),
        (new Extend\ServiceProvider())
            ->register(CollectorServiceProvider::class),
    ]
    ,
    require(__DIR__ . '/src/Integration/Integrations.php')
);
