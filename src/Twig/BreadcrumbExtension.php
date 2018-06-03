<?php

namespace App\Twig;

use App\Entity\Page;
use App\Entity\PageSnapshot;
use App\Entity\Project;
use Symfony\Component\Routing\RouterInterface;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class BreadcrumbExtension extends AbstractExtension
{
    private $router;
    private $template;

    public function __construct(
        RouterInterface $router,
        \Twig_Environment $template
    )
    {
        $this->router = $router;
        $this->template = $template;
    }

    public function getFunctions(): array
    {
        return [
            new TwigFunction('breadcrumbs', [$this, 'breadcrumbs']),
        ];
    }

    /**
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function breadcrumbs($entity = null)
    {
        if ($entity instanceof Project) {
            $project = $entity;
        }

        if ($entity instanceof Page) {
            $project = $entity->getProject();
            $page = $entity;
        }

        if ($entity instanceof PageSnapshot) {
            $project = $entity->getPage()->getProject();
            $page = $entity->getPage();
            $snapshot = $entity;
        }

        $breadcrumbs = [];

        if (isset($project)) {
            $breadcrumbs[] = [
                'title' => 'Projects',
                'href' => $this->router->generate('project_index')
            ];

            $breadcrumbs[] = [
              'title' => $project->getName(),
              'href' => $this->router->generate('project_show', ['project' => $project->getId()])
            ];
        }

        if (isset($project) && isset($page)) {
            $breadcrumbs[] = [
                'title' => $page->getName(),
                'href' => $this->router->generate('page_show', [
                    'project' => $project->getId(),
                    'page' => $page->getId()
                ])
            ];
        }

        if (isset($project) && isset($page) && isset($snapshot)) {
            $breadcrumbs[] = [
                'title' => $snapshot->getHash(),
                'href' => $this->router->generate('page_snapshot_show', [
                    'project' => $project->getId(),
                    'page' => $page->getId(),
                    'snapshot' => $snapshot->getId()
                ])
            ];
        }

        return $this->template->render('components/breadcrumbs.html.twig', [
            'breadcrumbs' => $breadcrumbs,
        ]);
    }
}
