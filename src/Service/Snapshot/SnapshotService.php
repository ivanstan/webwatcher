<?php

namespace App\Service\Snapshot;

use App\Entity\Project;
use App\Entity\Resource\AbstractResource;
use App\Entity\Resource\PageResource;
use App\Entity\Snapshot\AbstractSnapshot;
use App\Entity\Snapshot\ProjectSnapshot;
use Doctrine\ORM\EntityManagerInterface;

class SnapshotService
{
    private $pageService;
    private $entityManager;

    public function __construct(
        EntityManagerInterface $entityManager,
        PageSnapshotService $pageService
    ) {
        $this->pageService = $pageService;
        $this->entityManager = $entityManager;
    }

    public function snapshotResource(AbstractResource $resource): ?AbstractSnapshot
    {
        $snapshot = null;

        if ($resource instanceof PageResource) {
            $snapshot = $this->pageService->snapshot($resource);
        }

        $this->entityManager->persist($snapshot);
        $this->entityManager->flush();

        return $snapshot;
    }

    public function snapshotProject(Project $project): ProjectSnapshot
    {

    }
}
