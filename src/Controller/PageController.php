<?php

namespace App\Controller;

use App\Entity\Page;
use App\Entity\Project;
use App\Form\PageType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("project/{project}/page")
 */
class PageController extends Controller
{
    /**
     * @Route("/new", name="page_new", methods="GET|POST")
     * @Security("has_role('ROLE_MANAGER')")
     */
    public function new(Request $request, Project $project): Response
    {
        $page = new Page();
        $page->setProject($project);
        $page->setPath('/');
        $form = $this->createForm(PageType::class, $page);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($page);
            $em->flush();

            $url = $this->generateUrl('page_show', ['project' => $project->getId(), 'page' => $page->getId()]);
            $this->addFlash('success',
                sprintf('New page "%s" has been created.', "<a href='$url'>{$page->getName()}</a>")
            );

            return $this->redirectToRoute('page_new', ['project' => $project->getId()]);
        }

        return $this->render(
            'pages/page/new.html.twig',
            [
                'page' => $page,
                'form' => $form->createView(),
            ]
        );
    }

    /**
     * @Route("/{page}", name="page_show", methods="GET")
     */
    public function show(Page $page): Response
    {
        return $this->render('pages/page/show.html.twig', ['page' => $page]);
    }

    /**
     * @Route("/{page}/edit", name="page_edit", methods="GET|POST")
     * @Security("has_role('ROLE_MANAGER')")
     */
    public function edit(Request $request, Page $page): Response
    {
        $form = $this->createForm(PageType::class, $page);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('page_edit', [
                'project' => $page->getProject()->getId(),
                'page' => $page->getId()
            ]);
        }

        return $this->render(
            'pages/page/edit.html.twig',
            [
                'page' => $page,
                'form' => $form->createView(),
            ]
        );
    }

    /**
     * @Route("/{page}", name="page_delete", methods="DELETE")
     * @Security("has_role('ROLE_MANAGER')")
     */
    public function delete(Request $request, Page $page): Response
    {
        if ($this->isCsrfTokenValid('delete'.$page->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($page);
            $em->flush();
        }

        return $this->redirectToRoute('project_show', ['project' => $page->getProject()->getId()]);
    }
}
