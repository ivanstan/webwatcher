<?php

namespace App\EventListener;

use App\Entity\User;
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
            /** @var User $user */
            $user = $this->token->getToken()->getUser();

            if ($user instanceof User && $user->getPreference() && $user->getPreference()->getTimezone()) {
                $timezone =  $user->getPreference()->getTimezone();

                date_default_timezone_set($timezone);
            }
        }
    }
}
