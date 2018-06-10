<?php

namespace App\EventListener;

use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class KernelEvenListener
{
    private const DEFAULT_TIMEZONE = 'UTC';

    private $twig;
    private $token;

    public function __construct(
        \Twig_Environment $twig,
        TokenStorageInterface $token
    ) {
        $this->twig = $twig;
        $this->token = $token;
    }

    public function onKernelRequest(GetResponseEvent $event)
    {
        $user = $this->token->getToken()->getUser();

        date_default_timezone_set('Europe/Belgrade');
    }
}
