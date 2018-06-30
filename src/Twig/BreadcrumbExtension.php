<?php

namespace App\Twig;

use App\Entity\Authenticator\Authenticator;
use App\Entity\Page;
use App\Entity\PageSnapshot;
use App\Entity\Project;
use App\Entity\ProjectSnapshot;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Routing\RouterInterface;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class BreadcrumbExtension extends AbstractExtension
{
    private $router;
    private $template;
    private $requestStack;

    public function __construct(
        RouterInterface $router,
        \Twig_Environment $template,
        RequestStack $requestStack
    )
    {
        $this->router = $router;
        $this->template = $template;
        $this->requestStack = $requestStack;
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
    public function breadcrumbs($entity = null, $suffix = null)
    {
        $request = $this->requestStack->getCurrentRequest();
        $routeName = $request->get('_route');

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

        if ($entity instanceof ProjectSnapshot) {
            $project = $entity->getProject();
            $projectSnapshot = $entity;
        }

        if (is_subclass_of($entity, Authenticator::class)) {
            $project = $entity->getProject();
            $authenticator = $entity;
        }

        $breadcrumbs = [];

        if (isset($project)) {
            $breadcrumbs[] = [
                'title' => 'Projects',
                'tooltip' => 'Home',
                'href' => $this->router->generate('project_index')
            ];

            $breadcrumbs[] = [
              'title' => $project->getName(),
                'tooltip' => 'Project',
              'href' => $this->router->generate('project_show', ['project' => $project->getId()])
            ];
        }

        if (isset($project) && isset($page)) {
            $breadcrumbs[] = [
                'title' => $page->getName() ?? $page->getPath(),
                'tooltip' => 'Page',
                'href' => $this->router->generate('page_show', [
                    'project' => $project->getId(),
                    'page' => $page->getId()
                ])
            ];
        }

        if (isset($project) && isset($page) && isset($snapshot)) {
            $dateTime = (new \DateTime())->setTimestamp($snapshot->getTimestamp());
            $breadcrumbs[] = [
                'title' => $dateTime->format('d/m/Y H:i:s'),
                'tooltip' => 'Page snapshot',
                'href' => $this->router->generate('page_snapshot_show', [
                    'project' => $project->getId(),
                    'page' => $page->getId(),
                    'snapshot' => $snapshot->getId()
                ])
            ];
        }

        if (isset($project) && isset($projectSnapshot)) {
            $breadcrumbs[] = [
                'title' => 'Snapshot ' . date('d/m/Y H:i:s', $projectSnapshot->getTimestamp()),
                'tooltip' => 'Project snapshot',
                'href' => $this->router->generate('project_snapshot_show', [
                    'project' => $project->getId(),
                    'snapshot' => $projectSnapshot->getId()
                ])
            ];
        }

        if (isset($authenticator)) {
            $breadcrumbs[] = [
                'title' => 'Authenticator',
                'tooltip' => '',
                'href' => $this->router->generate('authenticator_edit', [
                    'project' => $project->getId(),
                    'id' => $authenticator->getId()
                ])
            ];
        }

        if ($routeName === 'project_bulk_add') {

        }

        return $this->template->render('components/breadcrumbs.html.twig', [
            'breadcrumbs' => $breadcrumbs,
            'suffix' => $suffix,
        ]);
    }
}
