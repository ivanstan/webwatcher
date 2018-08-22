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
        $this->em->flush();

        $service = $this->resourceSnapshotService->getPageService();
        $service->setup($project);

        foreach ($project->getPages() as $resource) {

            try {
                $snapshot = $service->snapshot($resource);

                $snapshot->setTimestamp($projectSnapshot->getTimestamp());
                $snapshot->setProjectSnapshot($projectSnapshot);

                $this->em->persist($snapshot);
            } catch (\Exception $exception) {
                continue;
            }
        }

        $this->em->flush();

        return $projectSnapshot;
    }
}
