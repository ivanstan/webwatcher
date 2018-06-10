<?php

namespace App\EventListener;

use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\Routing\RouterInterface;

class DemoGuardEvenListener
{
    private $disabledUri = [
        '/profile/edit'
    ];

    private $demo;
    /**
     * @var RouterInterface
     */
    private $router;

    public function __construct(string $demo, RouterInterface $router)
    {
        $this->demo = $demo;
        $this->router = $router;
    }

    public function onKernelRequest(GetResponseEvent $event)
    {

        if ($this->demo) {
            foreach ($this->disabledUri as $uri) {
                if (strpos($event->getRequest()->getRequestUri(), $uri) !== false) {
                    $response = new RedirectResponse($this->router->generate('project_index'));
                    $event->setResponse($response);
                }
            }
        }
    }
}
