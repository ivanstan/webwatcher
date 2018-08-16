<?php

namespace App\Service\Factory;

use App\Entity\AbstractResource;
use App\Entity\Page;
use App\Entity\Project;
use App\Entity\Resource\HttpResource;
use App\Form\Resource\HttpType;
use App\Form\Resource\PageType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ResourceFactory
{
    private $map;
    private $factory;

    public function __construct(EntityManagerInterface $manager, FormFactoryInterface $factory)
    {
        $this->map = $manager->getClassMetadata(AbstractResource::class)->discriminatorMap;
        $this->factory = $factory;
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

        if ($resource instanceof Page || $resource instanceof HttpResource) {
            $resource->setPath('/');
        }

        return $resource;
    }

    public function form($entity, array $options = []): FormInterface
    {
        switch (get_class($entity)) {
            case Page::class:
                $type = PageType::class;
                break;
            case HttpResource::class:
                $type = HttpType::class;
                break;
            default:
                throw new \InvalidArgumentException(
                    \sprintf('Entity %s has no associated form type.', get_class($entity))
                );
        }

        return $this->factory->create($type, $entity, $options);
    }

    public static function list()
    {
        return [
            'Http' => HttpResource::RESOURCE_TYPE,
            'Page' => Page::RESOURCE_TYPE
        ];
    }
}
