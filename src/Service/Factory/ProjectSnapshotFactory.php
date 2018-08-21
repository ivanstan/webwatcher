<?php

namespace App\Service\Factory;

use App\Entity\Project;
use App\Entity\ProjectSnapshot;

class ProjectSnapshotFactory
{
    public function create(Project $project): ProjectSnapshot
    {
        $snapshot = new ProjectSnapshot();
        $snapshot->setTimestamp(time());
        $snapshot->setProject($project);

        return $snapshot;
    }
}
