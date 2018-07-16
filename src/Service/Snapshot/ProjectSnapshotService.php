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
    private $authenticator;
    /** @var ResourceSnapshotService */
    private $resourceSnapshotService;

    public function __construct(
        EntityManagerInterface $em,
        ProjectSnapshotFactory $factory,
        PageSnapshotService $pageSnapshotService,
        SeleniumAuthenticatorService $authenticator,
        ResourceSnapshotService $resourceSnapshotService
    )
    {
        $this->em = $em;
        $this->factory = $factory;
        $this->pageSnapshotService = $pageSnapshotService;
        $this->authenticator = $authenticator;
        $this->resourceSnapshotService = $resourceSnapshotService;
    }

    public function new(Project $project): ProjectSnapshot
    {
        $projectSnapshot = $this->factory->create($project);
        $this->em->persist($projectSnapshot);

        if ($project->getAuthenticator()) {
            $this->pageSnapshotService->setCookies(
                $this->authenticator->resolve($project->getAuthenticator())
            );
        }

        foreach ($project->getPages() as $resource) {
            $service = $this->resourceSnapshotService->getService($resource);

            $snapshot = $service->snapshot($resource);

            $snapshot->setTimestamp($projectSnapshot->getTimestamp());
            $snapshot->setProjectSnapshot($projectSnapshot);

            $this->em->persist($snapshot);
            $this->em->flush();
        }

        return $projectSnapshot;
    }
}
