<?php

namespace App\Service\Factory;

use App\Entity\Page;
use App\Entity\PageSnapshot;

class PageSnapshotFactory
{
    public function create(Page $page): PageSnapshot
    {
        $snapshot = new PageSnapshot();

        $snapshot->setTimestamp(time());
        $snapshot->setPage($page);

        return $snapshot;
    }
}
