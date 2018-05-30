<?php

namespace App\Controller;

use App\Entity\PageSnapshot;
use App\Form\PageSnapshotType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/page/snapshot")
 */
class PageSnapshotController extends Controller
{
    /**
     * @Route("/", name="page_snapshot_index", methods="GET")
     */
    public function index(): Response
    {
        $pageSnapshots = $this->getDoctrine()
            ->getRepository(PageSnapshot::class)
            ->findAll();

        return $this->render('page_snapshot/index.html.twig', ['page_snapshots' => $pageSnapshots]);
    }

    /**
     * @Route("/new", name="page_snapshot_new", methods="GET|POST")
     */
    public function new(Request $request): Response
    {
        $pageSnapshot = new PageSnapshot();
        $form = $this->createForm(PageSnapshotType::class, $pageSnapshot);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($pageSnapshot);
            $em->flush();

            return $this->redirectToRoute('page_snapshot_index');
        }

        return $this->render('page_snapshot/new.html.twig', [
            'page_snapshot' => $pageSnapshot,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="page_snapshot_show", methods="GET")
     */
    public function show(PageSnapshot $pageSnapshot): Response
    {
        return $this->render('page_snapshot/show.html.twig', ['page_snapshot' => $pageSnapshot]);
    }

    /**
     * @Route("/{id}/edit", name="page_snapshot_edit", methods="GET|POST")
     */
    public function edit(Request $request, PageSnapshot $pageSnapshot): Response
    {
        $form = $this->createForm(PageSnapshotType::class, $pageSnapshot);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('page_snapshot_edit', ['id' => $pageSnapshot->getId()]);
        }

        return $this->render('page_snapshot/edit.html.twig', [
            'page_snapshot' => $pageSnapshot,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="page_snapshot_delete", methods="DELETE")
     */
    public function delete(Request $request, PageSnapshot $pageSnapshot): Response
    {
        if ($this->isCsrfTokenValid('delete'.$pageSnapshot->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($pageSnapshot);
            $em->flush();
        }

        return $this->redirectToRoute('page_snapshot_index');
    }
}
