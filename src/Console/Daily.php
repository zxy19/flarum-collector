<?php

namespace Xypp\Collector\Console;

use Carbon\Carbon;
use Flarum\User\User;
use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputArgument;
use Illuminate\Events\Dispatcher;
use Xypp\Collector\Event\DailyUpdate;
use Xypp\Collector\Helper\CommandContextHelper;

class Daily extends Command
{
    /**
     * @var string
     */
    protected $signature = 'collector:daily';

    /**
     * @var string
     */
    protected $description = 'Dispatch a event indicates that daily update is completed.';

    protected Dispatcher $events;
    public function __construct(Dispatcher $events, CommandContextHelper $commandContextHelper)
    {
        parent::__construct();
        $this->events = $events;
        $commandContextHelper->setCommand($this);
    }
    public function handle()
    {
        $this->info("Daily update dispatched");
        $this->events->dispatch(new DailyUpdate());
        $this->info("Done");
    }
}