<?php

namespace App\Service\Snapshot;

use App\Entity\Project;
use App\Entity\ProjectSnapshot;
use App\Service\Factory\ProjectSnapshotFactory;
use Doctrine\ORM\EntityManagerInterface;

class ProjectSnapshotService
{
    private $em;
    private $factory;
    private $pageSnapshotService;

    public function __construct(
        EntityManagerInterface $em,
        ProjectSnapshotFactory $factory,
        PageSnapshotService $pageSnapshotService
    )
    {
        $this->em = $em;
        $this->factory = $factory;
        $this->pageSnapshotService = $pageSnapshotService;
    }

    public function new(Project $project): ProjectSnapshot
    {
        $projectSnapshot = $this->factory->create($project);

        $this->em->persist($projectSnapshot);

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
