<?php

namespace Xypp\Collector\Api\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use Xypp\Collector\Condition;
use InvalidArgumentException;

class ConditionSerializer extends AbstractSerializer
{
    /**
     * {@inheritdoc}
     */
    protected $type = 'condition';

    /**
     * {@inheritdoc}
     *
     * @throws InvalidArgumentException
     */
    protected function getDefaultAttributes($model)
    {
        if (!($model instanceof Condition)) {
            throw new InvalidArgumentException(
                get_class($this) . ' can only serialize instances of ' . Condition::class
            );
        }

        $accumulation = $model->accumulation;
        if ($accumulation === null) {
            $accumulation = "{}";
        }
        return [
            "name" => $model->name,
            "value" => $model->value,
            "accumulation" => $accumulation
        ];
    }
}
