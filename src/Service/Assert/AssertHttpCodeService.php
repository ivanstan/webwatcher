<?php

namespace App\Service\Assert;

use App\Entity\Assert\AssertHttpCode;
use App\Entity\PageSnapshot;

class AssertHttpCodeService implements AssertServiceInterface
{
    /**
     * @param PageSnapshot $snapshot
     * @param AssertHttpCode $assert
     * @return bool
     */
    public function assert($snapshot, $assert)
    {
        return $assert->getStatus() === $snapshot->getStatus();
    }

    /**
     * @param PageSnapshot $snapshot
     * @param AssertHttpCode $assert
     * @return bool
     */
    public function getComment(bool $result, $snapshot, $assert): string
    {
        if ($result) {
            return \sprintf(
                'Positive assertion of HTTP status code %s as expected %s.',
                $snapshot->getStatus(),
                $assert->getStatus()
            );
        }

        return \sprintf(
            'Negative assertion HTTP status code %s equals expected %s.',
            $snapshot->getStatus(),
            $assert->getStatus()
        );
    }

}
