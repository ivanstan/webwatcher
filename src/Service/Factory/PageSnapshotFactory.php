<?php

namespace App\Service\Factory;

use App\Entity\Resource\PageResource;
use App\Entity\PageSnapshot;

class PageSnapshotFactory
{
    public function create(PageResource $page): PageSnapshot
    {
        $snapshot = new PageSnapshot();

        $snapshot->setTimestamp(time());
        $snapshot->setResource($page);

        return $snapshot;
    }
}
