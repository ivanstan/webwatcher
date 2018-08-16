<?php

namespace App\Service\Snapshot;

use App\Entity\Resource\AbstractResource;
use App\Entity\Resource\PageResource;

class ResourceSnapshotService
{
    private $pageService;

    public function __construct(
        PageSnapshotService $pageService
    ) {
        $this->pageService = $pageService;
    }

    public function getService(AbstractResource $resource): SnapshotServiceInterface
    {
        if ($resource instanceof PageResource) {
            return $this->pageService;
        }

        throw new \LogicException(sprintf('Invalid resource class %s', get_class($resource)));
    }

    public function snapshot(AbstractResource $resource)
    {
        return $service = $this->getService($resource)->snapshot($resource);
    }

    public function getPageService(): PageSnapshotService
    {
        return $this->pageService;
    }
}
