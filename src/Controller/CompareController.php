<?php

namespace App\Controller;

use App\Entity\PageSnapshot;
use App\Service\ImageDeltaService;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Routing\Annotation\Route;

class CompareController extends Controller
{
    private $imageDelta;
    private $projectDir;

    public function __construct(
        ImageDeltaService $imageDelta
//        string $projectDir
    ) {
        $this->imageDelta = $imageDelta;
//        $this->projectDir = $projectDir;
    }

    /**
     * @Route("/compare/{snapshot1}/{snapshot2}", name="compare_snapshot")
     */
    public function snapshot(string $snapshot1, string $snapshot2)
    {
        $repository = $this->getDoctrine()->getManager()->getRepository(PageSnapshot::class);

        $snapshot1 = $repository->find($snapshot1);
        $snapshot2 = $repository->find($snapshot2);

        return $this->render('compare/snapshot.html.twig', [
            'snapshot1' => $snapshot1,
            'snapshot2' => $snapshot2,
            'delta' => $this->imageDelta->compare(
                $this->getImagePath($snapshot1->getImage()),
                $this->getImagePath($snapshot2->getImage())
            )
        ]);
    }

    /**
     * @Route("/editor/{snapshot1}/{snapshot2}", name="editor", defaults={"snapshot2": null})
     */
    public function editor(PageSnapshot $snapshot1, ?PageSnapshot $snapshot2) {
        return $this->render('compare/editor.html.twig', [
            'snapshot1' => $snapshot1,
            'snapshot2' => $snapshot2,
        ]);
    }

    public function getImagePath(string $image): string
    {
//        return $this->projectDir . DIRECTORY_SEPARATOR . 'public/snapshots/'. $image;

        return $image;
    }
}
