<?php

namespace Xypp\Collector\Helper;
use Illuminate\Console\Command;

class CommandContextHelper
{
    public ?Command $commandContext;

    public function setCommand(Command $command)
    {
        $this->commandContext = $command;
    }
    public function getCommand(): ?Command
    {
        return $this->commandContext;
    }
    public function withProgressBar($iter,$callback)
    {
        if($this->commandContext){
            $this->commandContext->withProgressBar($iter,$callback);
        }
        foreach ($iter as $item) {
            $callback($item);
        }
    }
}