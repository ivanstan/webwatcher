<?php

namespace App\Controller;

use App\Entity\PageSnapshot;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class CompareController extends Controller
{
    /**
     * @Route("/compare/{snapshot1}/{snapshot2}", name="compare_snapshot")
     */
    public function compareSnapshot(string $snapshot1, string $snapshot2)
    {
        $repository = $this->getDoctrine()->getManager()->getRepository(PageSnapshot::class);

        $snapshot1 = $repository->find($snapshot1);
        $snapshot2 = $repository->find($snapshot2);

        return $this->render('compare/snapshot.html.twig', [
            'snapshot1' => $snapshot1,
            'snapshot2' => $snapshot2,
        ]);
    }
}
