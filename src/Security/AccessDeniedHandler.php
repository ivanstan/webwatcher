<?php

namespace App\Security;

use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\Security\Http\Authorization\AccessDeniedHandlerInterface;

class AccessDeniedHandler implements AccessDeniedHandlerInterface
{
    private $router;
    private $tokenStorage;

    public function __construct(TokenStorageInterface $tokenStorage, RouterInterface $router)
    {
        $this->router = $router;
        $this->tokenStorage = $tokenStorage;
    }

    public function handle(Request $request, AccessDeniedException $accessDeniedException)
    {
        if (!$this->tokenStorage->getToken()->getUser()) {
            $url = $this->router->generate('fos_user_security_login', ['redirect' => $request->getRequestUri()]);

            return new RedirectResponse($url);
        }
    }
}
