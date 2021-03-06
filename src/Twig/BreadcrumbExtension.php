<?php

namespace App\Twig;

use App\Entity\Authenticator\AbstractAuthenticator;
use App\Entity\Page;
use App\Entity\PageSnapshot;
use App\Entity\Project;
use App\Entity\ProjectSnapshot;
use App\Service\System\DateTimeService;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Routing\RouterInterface;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class BreadcrumbExtension extends AbstractExtension
{
    private $router;
    private $template;
    private $requestStack;
    private $dateTimeService;

    public function __construct(
        RouterInterface $router,
        \Twig_Environment $template,
        RequestStack $requestStack,
        DateTimeService $dateTimeService
    )
    {
        $this->router = $router;
        $this->template = $template;
        $this->requestStack = $requestStack;
        $this->dateTimeService = $dateTimeService;
    }

    public function getFunctions(): array
    {
        $functions = parent::getFunctions();
        $functions[] = new TwigFunction('breadcrumbs', [$this, 'breadcrumbs']);

        return $functions;
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
        $dateTimeFormat = $this->dateTimeService->getDateTimeFormat();

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

        if (is_subclass_of($entity, AbstractAuthenticator::class)) {
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
                'title' => $dateTime->format($dateTimeFormat),
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
                'title' => 'Snapshot ' . date($dateTimeFormat, $projectSnapshot->getTimestamp()),
                'tooltip' => 'Project snapshot',
                'href' => $this->router->generate('project_snapshot_show', [
                    'project' => $project->getId(),
                    'snapshot' => $projectSnapshot->getId()
                ])
            ];
        }

        if (isset($project) && isset($authenticator)) {
            if ($authenticator->getId()) {
                $breadcrumbs[] = [
                    'title' => 'Authenticator',
                    'tooltip' => '',
                    'href' => $this->router->generate('authenticator_edit', [
                        'project' => $project->getId(),
                        'id' => $authenticator->getId()
                    ]),
                ];
            }
        }

        return $this->template->render('components/breadcrumbs.html.twig', [
            'breadcrumbs' => $breadcrumbs,
            'suffix' => $suffix,
        ]);
    }
}
