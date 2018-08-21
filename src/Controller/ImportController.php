<?php

namespace App\Controller;

use App\Entity\Authenticator\SeleniumAuthenticator;
use App\Entity\Page;
use App\Entity\Project;
use App\Service\Bulk\BulkPage;
use App\Service\Selenium\Engine;
use App\Service\Selenium\SeleniumAuthenticatorService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Translation\TranslatorInterface;

/**
 * @Route("/project")
 */
class ImportController extends Controller
{
    private $translator;

    public function __construct(TranslatorInterface $translator)
    {
        $this->translator = $translator;
    }

    /**
     * @Route("/{project}/import", name="project_page_import", methods="GET|POST")
     * @Security("has_role('ROLE_MANAGER')")
     */
    public function import(
        Request $request,
        Project $project,
        BulkPage $bulk,
        SeleniumAuthenticatorService $authenticatorService,
        Engine $engine
    )
    {
        if ($request->isMethod('POST')) {
            return $this->save($project, $request);
        }

        $url = parse_url($request->query->get('url', '/'), PHP_URL_PATH);

        if ($project->getAuthenticator() && $project->getAuthenticator() instanceof SeleniumAuthenticator) {
            $authenticatorService->setDriver($engine->getDriver());

            $authenticatorService->setup($project->getAuthenticator());

            try {
                $authenticatorService->authenticate($project->getAuthenticator());
            } catch (\Exception $exception) {
                $this->addFlash('danger', $exception->getMessage());
            }

            $cookies = $authenticatorService->getCookies();

            $bulk->setCookies($cookies);
        }

        try {
            $pages = $bulk->extract($project->getBaseUrl() . $url);
        } catch (\Exception $exception) {
            $this->addFlash('danger', $exception->getMessage());
        }

        return $this->render('pages/import/index.html.twig', [
            'project' => $project,
            'url' => $url,
            'suggestions' => $this->getSuggestions($project),
            'pages' => array_diff($pages ?? [], $this->getProjectPages($project)),
        ]);
    }

    private function getSuggestions(Project $project)
    {
        $suggestions = $this->getProjectPages($project);
        $suggestions[] = '/';
        $suggestions[] = '/sitemap.xml';

        $suggestions = array_filter(array_unique($suggestions));
        sort($suggestions);

        return $suggestions;
    }

    private function getProjectPages(Project $project): array
    {
        $result = [];
        foreach ($project->getPages() as $page) {
            $result[] = $page->getPath();
        }

        return $result;
    }

    private function save(Project $project, Request $request)
    {
        $pages = $request->request->get('pages', []);

        $em = $this->getDoctrine()->getManager();

        $page = null;
        foreach ($pages as $path) {
            $path = str_replace($project->getBaseUrl(), '', $path);

            $page = new Page();
            $page->setName($path);
            $page->setPath($path);
            $page->setProject($project);

            $em->persist($page);
        }

        $em->flush();

        if ($page !== null) {
            $url = $this->generateUrl('page_show', ['project' => $project->getId(), 'page' => $page->getId()]);
            $pageMessage = "<a href='$url'>{$page->getName()}</a>";

            $this->addFlash('success',
                $this->translator->transChoice('Page %page% has been created.|Total of %count% pages has been created.',
                    count($pages),
                    [
                        '%count%' => count($pages),
                        '%page%' => $pageMessage
                    ]
                )
            );
        }

        return $this->redirectToRoute('project_page_import', [
            'project' => $project->getId(),
            'url' => $request->query->get('url', '/')
        ]);
    }
}
