<?php

namespace App\EventListener;

use App\Entity\Page;
use App\Entity\PageSnapshot;
use App\Entity\Project;
use App\Service\File\FileManager;
use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Event\OnFlushEventArgs;
use Doctrine\ORM\Event\PostFlushEventArgs;
use Doctrine\ORM\Events;

class EntityRemoveEventListener implements EventSubscriber
{
    private $fileManager;
    private $remove = [];

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

            if ($entity instanceof Page) {
                $this->fileManager->remove($this->fileManager->getResourceFolder($entity));
            }

            if ($entity instanceof PageSnapshot) {
                $this->fileManager->remove($this->fileManager->getSnapshotFolder($entity));
            }
        }
    }
}
