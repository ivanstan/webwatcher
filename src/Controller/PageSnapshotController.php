<?php

namespace App\Controller;

use App\Entity\PageSnapshot;
use App\Form\PageSnapshotType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("project/{project}/page/{page}/snapshot")
 */
class PageSnapshotController extends Controller
{
    /**
     * @Route("/{id}", name="page_snapshot_show", methods="GET")
     */
    public function show(PageSnapshot $pageSnapshot): Response
    {
        return $this->render('page_snapshot/show.html.twig', ['page_snapshot' => $pageSnapshot]);
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
