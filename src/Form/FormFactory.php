<?php

namespace App\Form;

use App\Entity\Action\ActionGroup;
use App\Entity\Assert\HTTP\AssertHttpCode;
use App\Entity\Authenticator\HttpBasicAuthenticator;
use App\Entity\Authenticator\SeleniumAuthenticator;
use App\Form\Action\ActionGroupType;
use App\Form\Assert\AssertHttpCodeType;
use App\Form\Authenticator\HttpBasicAuthenticatorType;
use App\Form\Authenticator\SeleniumAuthenticatorType;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\Form\FormInterface;

class FormFactory
{
    private $factory;

    public function __construct(FormFactoryInterface $factory)
    {
        $this->factory = $factory;
    }

    public function create($entity, array $options = []): FormInterface
    {
        switch (get_class($entity)) {
            case SeleniumAuthenticator::class:
                $type = SeleniumAuthenticatorType::class;
                break;
            case HttpBasicAuthenticator::class:
                $type = HttpBasicAuthenticatorType::class;
                break;
            case AssertHttpCode::class:
                $type = AssertHttpCodeType::class;
                break;
            case ActionGroup::class:
                $type = ActionGroupType::class;
                break;
            default:
                throw new \InvalidArgumentException(
                    \sprintf('Entity %s has no associated form type.', get_class($entity))
                );
        }

        return $this->factory->create($type, $entity, $options);
    }
}
