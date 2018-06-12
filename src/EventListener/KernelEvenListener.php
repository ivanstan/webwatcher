<?php

namespace App\EventListener;

use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class KernelEvenListener
{
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
        if ($this->token->getToken()) {
            $user = $this->token->getToken()->getUser();

            date_default_timezone_set('Europe/Belgrade');
        }
    }
}
