<?php

namespace App\Service\Assert;

interface AssertServiceInterface
{
    public function assert($snapshot, $assert);

    public function getComment(bool $result, $snapshot, $assert): string;
}
