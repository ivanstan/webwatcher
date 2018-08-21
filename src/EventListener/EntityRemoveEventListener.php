<?php

namespace App\EventListener;

use App\Entity\AbstractResource;
use App\Entity\AbstractSnapshot;
use App\Entity\Project;
use App\Service\File\FileManager;
use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Event\OnFlushEventArgs;
use Doctrine\ORM\Events;

class EntityRemoveEventListener implements EventSubscriber
{
    private $fileManager;

    public function __construct(FileManager $fileManager)
    {
        $this->fileManager = $fileManager;
    }

    public function getSubscribedEvents(): array
    {
        return [
            Events::onFlush,
        ];
    }

    public function onFlush(OnFlushEventArgs $eventArgs): void
    {
        $em = $eventArgs->getEntityManager();
        $uow = $em->getUnitOfWork();

        foreach ($uow->getScheduledEntityDeletions() as $entity) {
            if ($entity instanceof Project) {
                $this->fileManager->remove($this->fileManager->getProjectFolder($entity));
            }

            if ($entity instanceof AbstractResource) {
                $this->fileManager->remove($this->fileManager->getResourceFolder($entity));
            }

            if ($entity instanceof AbstractSnapshot) {
                $this->fileManager->remove($this->fileManager->getSnapshotFolder($entity));
            }
        }
    }
}
