<?php

namespace App\Controller;

use App\Entity\Page;
use App\Entity\PageSnapshot;
use App\Service\SnapshotService;
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
     * @Route("/{snapshot}", name="page_snapshot_show", methods="GET", requirements={"snapshot"="\d+"})
     */
    public function show(PageSnapshot $snapshot): Response
    {
        return $this->render('page_snapshot/show.html.twig', ['page_snapshot' => $snapshot]);
    }

    /**
     * @Route("/new", name="snapshot_page_new", methods="GET|POST")
     */
    public function new(Page $page, SnapshotService $service)
    {
        $dateTime = new \DateTime("now", new \DateTimeZone("UTC"));
        $snapshot = $service->new($page, $dateTime);

        //@todo check if success, return error if $snapshot is null

        return $this->redirectToRoute('page_snapshot_show', [
            'project' => $page->getProject()->getId(),
            'page' => $page->getId(),
            'snapshot' => $snapshot->getId()
        ]);
    }

    /**
     * @Route("/{snapshot}", name="page_snapshot_delete", methods="DELETE", requirements={"snapshot"="\d+"})
     */
    public function delete(Request $request, PageSnapshot $snapshot): Response
    {
        if ($this->isCsrfTokenValid('delete'.$snapshot->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($snapshot);
            $em->flush();
        }

        return $this->redirectToRoute('page_show');
    }
}
