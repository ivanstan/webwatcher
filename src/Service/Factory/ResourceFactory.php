<?php

namespace App\Service\Factory;

use App\Entity\Project;
use App\Entity\Resource\AbstractResource;
use App\Entity\Resource\HttpResource;
use App\Entity\Resource\PageResource;
use App\Entity\Snapshot\AbstractSnapshot;
use App\Form\Resource\HttpType;
use App\Form\Resource\PageType;
use App\Service\Snapshot\HttpSnapshotService;
use App\Service\Snapshot\PageSnapshotService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ResourceFactory
{
    private $map;
    private $factory;
    /** @var PageSnapshotService */
    private $pageSnapshotService;
    /** @var HttpSnapshotService */
    private $httpSnapshotService;

    public function __construct(
        EntityManagerInterface $manager,
        FormFactoryInterface $factory,
        PageSnapshotService $pageSnapshotService,
        HttpSnapshotService $httpSnapshotService
    )
    {
        $this->map = $manager->getClassMetadata(AbstractResource::class)->discriminatorMap;
        $this->factory = $factory;
        $this->pageSnapshotService = $pageSnapshotService;
        $this->httpSnapshotService = $httpSnapshotService;
    }

    public function entity(string $type, Project $project = null): AbstractResource
    {
        if (!isset($this->map[$type])) {
            throw new NotFoundHttpException(\sprintf('Resource of type %s not found', $type));
        }

        /** @var AbstractResource $resource */
        $resource = new $this->map[$type]();

        if ($project) {
            $resource->setProject($project);
        }

        if ($resource instanceof PageResource || $resource instanceof HttpResource) {
            $resource->setPath('/');
        }

        return $resource;
    }

    public function form($resource, array $options = []): FormInterface
    {
        switch (get_class($resource)) {
            case PageResource::class:
                $type = PageType::class;
                break;
            case HttpResource::class:
                $type = HttpType::class;
                break;
            default:
                throw new \InvalidArgumentException(
                    \sprintf('Entity %s has no associated form type.', get_class($resource))
                );
        }

        return $this->factory->create($type, $resource, $options);
    }

    public function snapshot(AbstractResource $resource): AbstractSnapshot
    {
        if ($resource instanceof PageResource) {
            return $this->pageSnapshotService->setup($resource->getProject())->snapshot($resource);
        }

        if ($resource instanceof HttpResource) {
            return $this->httpSnapshotService->snapshot($resource);
        }

        throw new \InvalidArgumentException(
            \sprintf('Entity %s has no associated service .', get_class($resource))
        );
    }

    public static function list()
    {
        return [
            'Http' => HttpResource::RESOURCE_TYPE,
            'PageResource' => PageResource::RESOURCE_TYPE
        ];
    }
}
