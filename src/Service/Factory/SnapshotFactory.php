<?php

namespace App\Service\Factory;

use App\Entity\Resource\AbstractResource;
use App\Entity\Snapshot\AbstractSnapshot;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class SnapshotFactory
{
    private $map;

    public function __construct(EntityManagerInterface $manager)
    {
        $this->map = $manager->getClassMetadata(AbstractSnapshot::class)->discriminatorMap;
    }

    public function create(AbstractResource $resource): AbstractSnapshot
    {
        if (!isset($this->map[$resource->getType()])) {
            throw new NotFoundHttpException(\sprintf('Resource of type %s not found', $resource->getType()));
        }

        /** @var AbstractSnapshot $snapshot */
        $snapshot = new $this->map[$resource->getType()]();

        $snapshot->setTimestamp(time());
        $snapshot->setResource($resource);

        return $snapshot;
    }
}
