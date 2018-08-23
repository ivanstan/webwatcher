<?php

namespace App\Service\Snapshot;

use App\Entity\AbstractResource;
use App\Entity\Project;
use App\Entity\ProjectSnapshot;
use App\Service\Factory\ProjectSnapshotFactory;
use App\Service\Selenium\SeleniumAuthenticatorService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Session\Flash\FlashBagInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class ProjectSnapshotService
{
    private $em;
    private $factory;
    private $authenticator;
    private $resourceSnapshotService;
    private $flash;
    private $generator;

    public function __construct(
        EntityManagerInterface $em,
        ProjectSnapshotFactory $factory,
        SeleniumAuthenticatorService $authenticator,
        ResourceSnapshotService $resourceSnapshotService,
        FlashBagInterface $flash,
        UrlGeneratorInterface $generator
    ) {
        $this->em = $em;
        $this->factory = $factory;
        $this->authenticator = $authenticator;
        $this->resourceSnapshotService = $resourceSnapshotService;
        $this->flash = $flash;
        $this->generator = $generator;
    }

    public function new(Project $project): ProjectSnapshot
    {
        $projectSnapshot = $this->factory->create($project);
        $this->em->persist($projectSnapshot);
        $this->em->flush();

        $service = $this->resourceSnapshotService->getPageService();
        $service->setup($project);

        foreach ($project->getPages() as $resource) {

            try {
                $snapshot = $service->snapshot($resource);

                $snapshot->setTimestamp($projectSnapshot->getTimestamp());
                $snapshot->setProjectSnapshot($projectSnapshot);

                $this->em->persist($snapshot);
            } catch (\Exception $exception) {
                $this->flash->add('danger', $this->getErrorMessage($project, $resource, $exception));

                continue;
            }
        }

        $this->em->flush();

        return $projectSnapshot;
    }

    private function getErrorMessage(Project $project, AbstractResource $resource, \Exception $exception)
    {
        $url = $this->generator->generate('page_show', [
            'project' => $project->getId(),
            'page' => $resource->getId()
        ]);

        $link = "<a href='$url'>{$resource->getName()}</a>";

        return \sprintf(
            'Unable to take snapshot of resource %s with message:<br><pre>%s</pre>', $link,
            $exception->getMessage()
        );
    }
}
