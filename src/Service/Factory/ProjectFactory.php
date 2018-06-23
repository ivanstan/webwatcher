<?php

namespace App\Service\Factory;

use App\Entity\Page;
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
        $page = new Page();
        $page->setPath('/');
        $page->setName('Home');
        $page->setProject($project);
        $project->setPages([$page]);

        $user = $this->token->getToken()->getUser();
        $project->setOwner($user);

        return $project;
    }
}
