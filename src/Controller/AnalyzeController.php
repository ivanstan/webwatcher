<?php

namespace App\Controller;

use App\Entity\PageSnapshot;
use App\Entity\ProjectSnapshot;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/analyze")
 */
class AnalyzeController extends Controller
{
    /**
     * @Route("/page-diagram/{snapshot}", name="analyze_page_diagram", methods="GET")
     */
    public function pageDiagram(ProjectSnapshot $snapshot): Response
    {
        $repository = $this->getDoctrine()->getRepository(PageSnapshot::class);
        $builder = $repository->select();
        $repository->withLinks($builder);
        $repository->whereProjectSnapshot($builder, $snapshot);

        /** @var PageSnapshot $pageSnapshot */
        foreach ($builder->getQuery()->getResult() as $pageSnapshot) {

            $links = $pageSnapshot->getLinks();

            foreach ($links as $link) {

            }

        }

        return $this->render('pages/analyze/page-diagram.html.twig', [
            'snapshot' => $snapshot,
        ]);
    }
}
