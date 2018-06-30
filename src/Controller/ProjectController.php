<?php

namespace App\Controller;

use App\Entity\Authenticator\Authenticator;
use App\Entity\Page;
use App\Entity\Project;
use App\Form\ProjectType;
use App\Service\Bulk\BulkPage;
use App\Service\Factory\ProjectFactory;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;

class ProjectController extends Controller
{
    /**
     * @Route("/", name="project_index", methods="GET")
     */
    public function index(): Response
    {
        $projects = $this->getDoctrine()
            ->getRepository(Project::class)
            ->findAll();

        return $this->render('pages/project/index.html.twig', ['projects' => $projects]);
    }

    /**
     * @Route("project/new", name="project_new", methods="GET|POST")
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

            return $this->redirectToRoute('project_index');
        }

        return $this->render('pages/project/new.html.twig', [
            'project' => $project,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("project/{project}", name="project_show", methods="GET")
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
     * @Route("project/{project}/bulk/{type}", requirements={"slug"="sitemap|crawl"}, name="project_bulk_add", methods="GET|POST")
     * @Security("has_role('ROLE_MANAGER')")
     */
    public function bulk(Request $request, Project $project, string $type, BulkPage $bulk)
    {
        if ($request->isMethod('POST')) {
            $em = $this->getDoctrine()->getManager();
            foreach ($request->request->get('pages') as $path) {
                $path = str_replace($project->getBaseUrl(), '', $path);

                $page = new Page();
                $page->setPath($path);
                $page->setProject($project);

                $em->persist($page);
            }

            $em->flush();
            $this->redirectToRoute('project_show', [
               'project' => $project->getId()
            ]);
        }

        $existing = [];
        foreach ($project->getPages() as $page) {
            $existing[] = $page->getPath();
        }

        if ($type === 'sitemap') {
            $pages = $bulk->fromSiteMap($project->getBaseUrl());
        } elseif ($type === 'crawl') {
            $pages = $bulk->crawl($project->getBaseUrl());
        }

        $pages = array_diff($pages, $existing);
        array_unique($pages);

        return $this->render('pages/project/bulk.html.twig', [
            'project' => $project,
            'pages' => $pages,
            'type' => $type,
        ]);
    }

    /**
     * @Route("project/{project}", name="project_delete", methods="DELETE")
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
