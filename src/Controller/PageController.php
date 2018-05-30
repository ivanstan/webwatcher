<?php

namespace App\Controller;

use App\Entity\Page;
use App\Form\PageType;
use App\Service\SnapshotService;
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
     * @Route("/", name="page_index", methods="GET")
     */
    public function index(): Response
    {
        $pages = $this->getDoctrine()
            ->getRepository(Page::class)
            ->findAll();

        return $this->render('page/index.html.twig', ['pages' => $pages]);
    }

    /**
     * @Route("/new", name="page_new", methods="GET|POST")
     */
    public function new(Request $request): Response
    {
        $page = new Page();
        $form = $this->createForm(PageType::class, $page);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($page);
            $em->flush();

            return $this->redirectToRoute('page_index');
        }

        return $this->render(
            'page/new.html.twig',
            [
                'page' => $page,
                'form' => $form->createView(),
            ]
        );
    }

    /**
     * @Route("/{id}", name="page_show", methods="GET")
     */
    public function show(Page $page): Response
    {
        return $this->render('page/show.html.twig', ['page' => $page]);
    }

    /**
     * @Route("/{id}/edit", name="page_edit", methods="GET|POST")
     */
    public function edit(Request $request, Page $page): Response
    {
        $form = $this->createForm(PageType::class, $page);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('page_edit', ['id' => $page->getId()]);
        }

        return $this->render(
            'page/edit.html.twig',
            [
                'page' => $page,
                'form' => $form->createView(),
            ]
        );
    }

    /**
     * @Route("/{id}", name="page_delete", methods="DELETE")
     */
    public function delete(Request $request, Page $page): Response
    {
        if ($this->isCsrfTokenValid('delete'.$page->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($page);
            $em->flush();
        }

        return $this->redirectToRoute('page_index');
    }

    /**
     * @Route("/{id}/snapshot", name="page_new_snapshot", methods="GET|POST")
     */
    public function newSnapshot(Page $page, SnapshotService $service)
    {
        $dateTime = new \DateTime("now", new \DateTimeZone("UTC"));
        $snapshot = $service->new($page, $dateTime);

        //@todo check if success, return error if $snapshot is null

        return $this->redirectToRoute('page_snapshot_show', ['id' => $snapshot->getId()]);
    }
}
