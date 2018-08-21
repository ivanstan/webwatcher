<?php

namespace App\Service\Factory;

use App\Entity\Project;
use App\Entity\Snapshot\ProjectSnapshot;

class ProjectSnapshotFactory
{
    public function create(Project $project): ProjectSnapshot
    {
        $dateTime = new \DateTime();
        $snapshot = new ProjectSnapshot();
        $snapshot->setTimestamp($dateTime->getTimestamp());
        $snapshot->setProject($project);

        return $snapshot;
    }
}
