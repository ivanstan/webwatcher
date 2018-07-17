<?php

namespace App\Service\Snapshot;

use App\Entity\AbstractResource;
use App\Entity\AbstractSnapshot;

interface SnapshotServiceInterface
{
    public function snapshot($resource);
}
