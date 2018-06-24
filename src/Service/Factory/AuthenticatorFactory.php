<?php


namespace App\Service\Factory;


use App\Entity\Authenticator\Authenticator;
use App\Entity\Authenticator\SeleniumAuthenticator;
use App\Form\Authenticator\SeleniumAuthenticatorType;
use Psr\Log\InvalidArgumentException;

class AuthenticatorFactory
{
    public function create(string $type)
    {
        switch ($type) {
            case Authenticator::TYPE_SELENIUM:
                return new SeleniumAuthenticator();
            default:
                throw new InvalidArgumentException(sprintf('Authenticator of type %s does not exist.', $type));
        }
    }

    public function getFormType($type)
    {
        switch ($type) {
            case Authenticator::TYPE_SELENIUM:
                return SeleniumAuthenticatorType::class;
            default:
                throw new InvalidArgumentException(sprintf('Authenticator form of type %s does not exist.', $type));
        }
    }
}
