<?php

namespace Xypp\Collector\Console;

use Illuminate\Console\Command;
use Illuminate\Database\ConnectionInterface;
use Xypp\Collector\Condition;

class Migrate extends Command
{
    /**
     * @var string
     */
    protected $signature = 'collector:migrate';

    /**
     * @var string
     */
    protected $description = 'Migrate data from forum-quest 1.x.';
    private ConnectionInterface $connection;

    public function __construct(ConnectionInterface $connection)
    {
        parent::__construct();
        $this->connection = $connection;
    }
    public function handle()
    {
        $column = ["created_at", "updated_at", "name", "user_id", "value", "accumulation"];
        Condition::insertUsing(
            $column,
            $this->connection->table("quest_condition")->select($column)
        );
    }
}