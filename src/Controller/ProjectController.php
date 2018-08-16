<?php

namespace App\Controller;

use App\Entity\Authenticator\Authenticator;
use App\Entity\Page;
use App\Entity\Project;
use App\Form\ProjectType;
use App\Service\Factory\ProjectFactory;
use App\Service\Factory\ResourceFactory;
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

            if ($request->get('name') === null && parse_url($project->getDomain(), PHP_URL_HOST)) {
                $project->setName(parse_url($project->getDomain(), PHP_URL_HOST));
            }

            $protocol = parse_url($project->getDomain(), PHP_URL_SCHEME);
            $path = parse_url($project->getDomain(), PHP_URL_PATH);

            $page = new Page();
            if ($protocol && $path) {
                $page->setProtocol($protocol);
                $page->setPath(rtrim($path, '/'));
                $page->setName(rtrim($path, '/'));
            } else {
                $page->setPath('/');
                $page->setName('Home');
            }

            $page->setProject($project);
            $project->setPages([$page]);

            $domain = parse_url($project->getDomain(), PHP_URL_HOST);

            if ($domain) {
                $project->setDomain($domain);
            }

            $em->persist($project->getPages()[0]);
            $em->flush();

            $url = $this->generateUrl('project_show', ['project' => $project->getId()]);
            $this->addFlash('success',
                sprintf('New project "%s" has been created.', "<a href='$url'>{$project->getName()}</a>")
            );

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
        return $this->render('pages/project/show.html.twig', [
            'project' => $project,
            'resource_types' => ResourceFactory::list()
        ]);
    }

    /**
     * @Route("/{project}/edit", name="project_edit", methods="GET|POST")
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
