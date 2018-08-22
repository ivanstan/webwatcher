<?php

namespace App\Service\Snapshot;

use App\Entity\Project;
use App\Entity\ProjectSnapshot;
use App\Service\Factory\ProjectSnapshotFactory;
use App\Service\Selenium\SeleniumAuthenticatorService;
use Doctrine\ORM\EntityManagerInterface;

class ProjectSnapshotService
{
    private $em;
    private $factory;
    private $pageSnapshotService;
    private $service;

    public function __construct(
        EntityManagerInterface $em,
        ProjectSnapshotFactory $factory,
        SeleniumSnapshotService $pageSnapshotService,
        SeleniumAuthenticatorService $authenticator,
        SnapshotService $resourceSnapshotService
    )
    {
        $this->em = $em;
        $this->factory = $factory;
        $this->pageSnapshotService = $pageSnapshotService;
        $this->service = $resourceSnapshotService;
    }

    public function new(Project $project): ProjectSnapshot
    {
        $projectSnapshot = $this->factory->create($project);
        $this->em->persist($projectSnapshot);

        $service = $this->service->getProjectService($project);

        if (method_exists($service, 'setup')) {
            $service->setup($project);
        }

        foreach ($project->getPages() as $resource) {
            $snapshot = $service->snapshot($resource);

            $snapshot->setTimestamp($projectSnapshot->getTimestamp());
            $snapshot->setProjectSnapshot($projectSnapshot);

            $this->em->persist($snapshot);
            $this->em->flush();
        }

        return $projectSnapshot;
    }
}
