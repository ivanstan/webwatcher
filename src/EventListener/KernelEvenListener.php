<?php

namespace App\EventListener;

use App\Entity\User;
use App\Service\Selenium\Engine;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\HttpKernel\Event\GetResponseForExceptionEvent;
use Symfony\Component\HttpKernel\Event\PostResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class KernelEvenListener implements EventSubscriberInterface
{
    private $twig;
    private $token;
    private $engine;

    public function __construct(
        \Twig_Environment $twig,
        TokenStorageInterface $token,
        Engine $engine
    ) {
        $this->twig = $twig;
        $this->token = $token;
        $this->engine = $engine;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::REQUEST => 'onKernelRequest',
            KernelEvents::EXCEPTION => 'onKernelException',
            KernelEvents::TERMINATE => 'onKernelTerminate'
        ];
    }

    public function onKernelRequest(GetResponseEvent $event): void
    {
        if (!$event->isMasterRequest() || !$this->token->getToken()) {
            return;
        }

        /** @var User $user */
        $user = $this->token->getToken()->getUser();

        if ($user instanceof User && $user->getPreference() && $user->getPreference()->getTimezone()) {
            $timezone = $user->getPreference()->getTimezone();

            date_default_timezone_set($timezone);
        }
    }

    public function onKernelException(GetResponseForExceptionEvent $event)
    {
        $this->engine->quit();
    }

    public function onKernelTerminate(PostResponseEvent $event)
    {
        $this->engine->quit();
    }
}
