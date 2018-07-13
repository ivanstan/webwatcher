<?php

namespace App\Service\Snapshot;

use App\Entity\AbstractResource;
use App\Entity\Page;

class ResourceSnapshotService
{
    private $pageService;

    public function __construct(
        PageSnapshotServiceInterface $pageService
    ) {
        $this->pageService = $pageService;
    }

    public function getService(AbstractResource $resource): SnapshotServiceInterface
    {
        if ($resource instanceof Page) {
            return $this->pageService;
        }

        throw new \LogicException(sprintf('Invalid resource class %s', get_class($resource)));
    }

    public function snapshot(AbstractResource $resource)
    {
        return $service = $this->getService($resource)->snapshot($resource);
    }
}
