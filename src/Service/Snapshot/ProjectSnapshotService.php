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

    public function __construct(
        EntityManagerInterface $em,
        ProjectSnapshotFactory $factory,
        PageSnapshotService $pageSnapshotService,
        SeleniumAuthenticatorService $authenticator
    )
    {
        $this->em = $em;
        $this->factory = $factory;
        $this->pageSnapshotService = $pageSnapshotService;
        $this->authenticator = $authenticator;
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

        foreach ($project->getPages() as $page) {
            $snapshot = $this->pageSnapshotService->new($page);
            $snapshot->setTimestamp($projectSnapshot->getTimestamp());
            $snapshot->setProjectSnapshot($projectSnapshot);

            $this->em->persist($snapshot);
            $this->em->flush();
        }

        return $projectSnapshot;
    }
}
