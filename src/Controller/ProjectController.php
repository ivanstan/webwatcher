<?php

namespace App\Controller;

use App\Entity\Authenticator\Authenticator;
use App\Entity\Page;
use App\Entity\Project;
use App\Form\ProjectType;
use App\Service\Bulk\BulkPage;
use App\Service\Factory\ProjectFactory;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/project")
 */
class ProjectController extends Controller
{
    /**
     * @Route("/new", name="project_new", methods="GET|POST")
     * @Security("has_role('ROLE_MANAGER')")
     */
    public function new(Request $request, ProjectFactory $factory): Response
    {
        $project = $factory->create();

        $form = $this->createForm(ProjectType::class, $project);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($project->getPages()[0]);
            $em->flush();

            return $this->redirectToRoute('project_edit', [
                'project' => $project->getId(),
            ]);
        }

        return $this->render('pages/project/new.html.twig', [
            'project' => $project,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{project}", name="project_show", methods="GET")
     */
    public function show(Project $project): Response
    {
        return $this->render('pages/project/show.html.twig', ['project' => $project]);
    }

    /**
     * @Route("project/{project}/edit", name="project_edit", methods="GET|POST")
     * @Security("has_role('ROLE_MANAGER')")
     */
    public function edit(Request $request, Project $project): Response
    {
        $form = $this->createForm(ProjectType::class, $project);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('project_edit', ['project' => $project->getId()]);
        }

        return $this->render('pages/project/edit.html.twig', [
            'authenticator_types' => Authenticator::getTypes(),
            'project' => $project,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{project}/import/crawl", name="project_import_crawl", methods="GET|POST")
     * @Security("has_role('ROLE_MANAGER')")
     */
    public function importCrawl(Request $request, Project $project, BulkPage $bulk)
    {
        if ($request->isMethod('POST')) {
            return $this->bulkImport($project, $request->request->get('pages'));
        }

        $url = $request->query->get('url');
        $url = parse_url($url, PHP_URL_PATH);

        if ($request->query->get('url')) {
            $url = $project->getBaseUrl() . $url;
        } else {
            $url = $project->getBaseUrl();
        }

        $pages = $bulk->crawl($url);

        return $this->render('pages/project/bulk.html.twig', [
            'project' => $project,
            'url' => $url,
            'pages' => array_diff($pages, $this->getExistingPages($project)),
        ]);
    }

    /**
     * @Route("/{project}/import/sitemap", name="project_import_sitemap", methods="GET|POST")
     * @Security("has_role('ROLE_MANAGER')")
     */
    public function importSiteMap(Request $request, Project $project, BulkPage $bulk)
    {
        if ($request->isMethod('POST')) {
            $this->bulkImport($project, $request->request->get('pages'));
        }

        $pages = $bulk->fromSiteMap($project->getDomain());

        return $this->render('pages/project/bulk.html.twig', [
            'project' => $project,
            'pages' => array_diff($pages, $this->getExistingPages($project)),
        ]);
    }

    private function getExistingPages(Project $project): array
    {
        $result = [];
        foreach ($project->getPages() as $page) {
            $result[] = $page->getPath();
        }

        return $result;
    }

    private function bulkImport(Project $project, array $pages)
    {
        $em = $this->getDoctrine()->getManager();
        foreach ($pages as $path) {
            $path = str_replace($project->getBaseUrl(), '', $path);

            $page = new Page();
            $page->setPath($path);
            $page->setProject($project);

            $em->persist($page);
        }

        $em->flush();

        return $this->redirectToRoute('project_show', [
            'project' => $project->getId()
        ]);
    }

    /**
     * @Route("/{project}", name="project_delete", methods="DELETE")
     * @Security("has_role('ROLE_MANAGER')")
     */
    public function delete(Request $request, Project $project): Response
    {
        if ($this->isCsrfTokenValid('delete'.$project->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($project);
            $em->flush();
        }

        return $this->redirectToRoute('project_index');
    }
}
