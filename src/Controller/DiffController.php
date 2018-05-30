<?php

namespace App\Controller;

use App\Entity\PageSnapshot;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DiffController extends Controller
{
    /**
     * @Route("/diff/{sha1}/{sha2}", name="diff")
     */
    public function index(string $sha1, string $sha2)
    {
        $repository = $this->getDoctrine()->getManager()->getRepository(PageSnapshot::class);

        $snapshot1 = $repository->findOneBy(['hash' => $sha1]);
        $snapshot2 = $repository->findOneBy(['hash' => $sha2]);

        return $this->render('diff/index.html.twig', [
            'snapshot1' => $snapshot1,
            'snapshot2' => $snapshot2,
        ]);
    }
}
