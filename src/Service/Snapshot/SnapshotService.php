<?php

namespace App\Service\Snapshot;

use App\Entity\Project;

class SnapshotService
{
    private $seleniumService;
    private $guzzleService;

    public function __construct(
        SeleniumSnapshotService $seleniumService,
        GuzzleSnapshotService $guzzleService
    ) {

        $this->seleniumService = $seleniumService;
        $this->guzzleService = $guzzleService;
    }

    public function getProjectService(Project $project): SnapshotServiceInterface
    {
        if ($project->getDriver() === Project::DRIVER_TYPE_SELENIUM) {
            return $this->seleniumService;
        }

        if ($project->getDriver() === Project::DRIVER_TYPE_GUZZLE) {
            return $this->guzzleService;
        }

        throw new \LogicException(sprintf('Invalid driver requested %s', $project->getDriver()));
    }
}
