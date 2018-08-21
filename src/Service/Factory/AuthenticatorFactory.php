<?php

namespace App\Service\Factory;

use App\Entity\Authenticator\AbstractAuthenticator;
use App\Entity\Authenticator\HttpBasicAuthenticator;
use App\Entity\Authenticator\SeleniumAuthenticator;
use App\Form\Authenticator\HttpBasicAuthenticatorType;
use App\Form\Authenticator\SeleniumAuthenticatorType;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\InvalidArgumentException;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\Form\FormInterface;

class AuthenticatorFactory
{
    private $factory;
    private $map;

    public function __construct(EntityManagerInterface $manager, FormFactoryInterface $factory)
    {
        $this->map = $manager->getClassMetadata(AbstractAuthenticator::class)->discriminatorMap;
        $this->factory = $factory;
    }

    public function create(string $type)
    {
        if (!isset($this->map[$type])) {
            throw new InvalidArgumentException(sprintf('Authenticator of type %s does not exist.', $type));
        }

        return new $this->map[$type]();
    }

    public function getForm($authenticator, $options = []): FormInterface
    {
        switch (get_class($authenticator)) {
            case SeleniumAuthenticator::class:
                $type = SeleniumAuthenticatorType::class;
                break;
            case HttpBasicAuthenticator::class:
                $type = HttpBasicAuthenticatorType::class;
                break;
            default:
                throw new InvalidArgumentException(
                    \sprintf('Unable to find form for entity %s', get_class($authenticator))
                );
        }

        return $this->factory->create($type, $authenticator, $options);
    }
}
