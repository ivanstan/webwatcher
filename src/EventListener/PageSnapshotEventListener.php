<?php

namespace App\EventListener;

use Doctrine\ORM\Event\LifecycleEventArgs;
use App\Entity\PageSnapshot;

class PageSnapshotEventListener
{
    private $projectDir;

    public function __construct(string $projectDir)
    {
        $this->projectDir = $projectDir;
    }

    public function postRemove(LifecycleEventArgs $args)
    {
        $entity = $args->getEntity();

        if ($entity instanceof PageSnapshot) {
            unlink($this->projectDir . '/public/' . $entity->getImage());
        }
    }
}
