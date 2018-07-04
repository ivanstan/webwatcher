<?php

namespace App\Controller;

use App\Entity\Page;
use App\Entity\PageSnapshot;
use App\Entity\PageSnapshotSeo;
use App\Service\KeywordExtractor;
use App\Service\Snapshot\PageSnapshotService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("project/{project}/page/{page}/snapshot")
 */
class PageSnapshotController extends Controller
{
    public const MAX_KEYWORDS = 10;

    /**
     * @Route("/{snapshot}", name="page_snapshot_show", methods="GET", requirements={"snapshot"="\d+"})
     */
    public function show(PageSnapshot $snapshot, KeywordExtractor $extractor): Response
    {
        $statistics = $this->getDoctrine()
            ->getRepository(PageSnapshot::class)
            ->getLinkStatistics($snapshot);

        if ($snapshot->getSeo()) {
            $content = $snapshot->getSeo()->getContent();
            $language = $snapshot->getSeo()->getLanguage() ?? 'en';

            $freq = $extractor
                ->setTokenFilter($language)
                ->setContentFilters()
                ->getOccurrenceNumber($content, self::MAX_KEYWORDS);
        }

        return $this->render('pages/page_snapshot/show.html.twig', [
            'snapshot' => $snapshot,
            'statistics' => $statistics,
            'freq' => $freq ?? null,
        ]);
    }

    /**
     * @Route("/new", name="snapshot_page_new", methods="GET|POST")
     * @Security("has_role('ROLE_MANAGER')")
     */
    public function new(Page $page, PageSnapshotService $service)
    {
        $snapshot = $service->new($page);

        $em = $this->getDoctrine()->getManager();

        $em->persist($snapshot);
        $em->flush();

        //@todo check if success, return error if $snapshot is null

        return $this->redirectToRoute('page_snapshot_show', [
            'project' => $page->getProject()->getId(),
            'page' => $page->getId(),
            'snapshot' => $snapshot->getId()
        ]);
    }

    /**
     * @Route("/{snapshot}", name="page_snapshot_delete", methods="DELETE", requirements={"snapshot"="\d+"})
     * @Security("has_role('ROLE_MANAGER')")
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
