<?php

namespace App\Service\Snapshot;

use App\Entity\Project;
use App\Entity\Resource\HttpResource;
use App\Entity\Resource\PageResource;
use App\Entity\Snapshot\ProjectSnapshot;
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
    /** @var HttpSnapshotService */
    private $httpSnapshotService;

    public function __construct(
        EntityManagerInterface $em,
        ProjectSnapshotFactory $factory,
        PageSnapshotService $pageSnapshotService,
        SeleniumAuthenticatorService $authenticator,
        ResourceSnapshotService $resourceSnapshotService,
        HttpSnapshotService $httpSnapshotService
    )
    {
        $this->em = $em;
        $this->factory = $factory;
        $this->pageSnapshotService = $pageSnapshotService;
        $this->authenticator = $authenticator;
        $this->resourceSnapshotService = $resourceSnapshotService;
        $this->httpSnapshotService = $httpSnapshotService;
    }

    public function new(Project $project): ProjectSnapshot
    {
        $projectSnapshot = $this->factory->create($project);
        $this->em->persist($projectSnapshot);

        $pageService = $this->resourceSnapshotService->getPageService();
        $pageService->setup($project);

        foreach ($project->getResources() as $resource) {

            if ($resource instanceof PageResource) {
                $snapshot = $pageService->snapshot($resource);
            }

            if ($resource instanceof HttpResource) {
                $snapshot = $this->httpSnapshotService->snapshot($resource);
            }

            $snapshot->setTimestamp($projectSnapshot->getTimestamp());
            $snapshot->setProjectSnapshot($projectSnapshot);

            $this->em->persist($snapshot);
            $this->em->flush();
        }

        return $projectSnapshot;
    }
}
