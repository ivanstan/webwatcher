<?php

namespace App\Service\Factory;

use App\Entity\Resource\PageResource;
use App\Entity\Project;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class ProjectFactory {

    private $token;

    public function __construct(
        TokenStorageInterface $token
    ) {
        $this->token = $token;
    }

    public function create(): Project
    {
        $project = new Project();
        $user = $this->token->getToken()->getUser();
        $project->setOwner($user);

        return $project;
    }
}
