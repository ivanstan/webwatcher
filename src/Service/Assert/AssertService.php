<?php

namespace App\Service\Assert;

use App\Entity\AbstractResource;
use App\Entity\Assert\AbstractAssert;
use App\Entity\Assert\AssertHtmlElementExists;
use App\Entity\Assert\AssertHttpCode;
use App\Entity\Page;
use App\Form\Assert\AssertHtmlElementExistsType;
use App\Form\Assert\AssertHttpCodeType;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\Form\FormInterface;

class AssertService
{
    private $factory;

    private $services = [];

    public function __construct(FormFactoryInterface $factory)
    {
        $this->factory = $factory;
    }

    public static function getList(AbstractResource $resource)
    {
        $asserts = [];

        switch (get_class($resource)) {
            case Page::class:
                $asserts['Assert HTTP status'] = AssertHttpCode::class;
                $asserts['Assert HTML element exists'] = AssertHtmlElementExists::class;
        }

        return $asserts;
    }

    public function setService(string $class, AssertServiceInterface $service): void
    {
        $this->services[$class] = $service;
    }

    public function getService(AbstractAssert $assert): AssertServiceInterface
    {
        $class = get_class($assert);

        if (!isset($this->services[$class])) {
            throw new \InvalidArgumentException(
                \sprintf('Non existing assert service for assert %s.', $class)
            );
        }

        return $this->services[$class];
    }

    public function getForm(AbstractAssert $entity, array $options = []): FormInterface
    {
        switch (get_class($entity)) {
            case AssertHttpCode::class:
                $type = AssertHttpCodeType::class;
                break;
            case AssertHtmlElementExists::class:
                $type = AssertHtmlElementExistsType::class;
                break;
            default:
                throw new \InvalidArgumentException(
                    \sprintf('Entity %s has no associated form type.', get_class($entity))
                );
        }

        return $this->factory->create($type, $entity, $options);
    }
}
