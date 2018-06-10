<?php

namespace App\Controller;

use App\Entity\PageSnapshot;
use App\Entity\ProjectSnapshot;
use App\Service\ImageDeltaService;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/tools")
 */
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
     * @Route("/compare-page-snapshots/{snapshot1}/{snapshot2}", name="compare_page_snapshot")
     */
    public function snapshot(string $snapshot1, string $snapshot2)
    {
        $repository = $this->getDoctrine()->getManager()->getRepository(PageSnapshot::class);

        $snapshot1 = $repository->find($snapshot1);
        $snapshot2 = $repository->find($snapshot2);

        return $this->render('pages/compare/page-snapshot.html.twig', [
            'snapshot1' => $snapshot1,
            'snapshot2' => $snapshot2,
            'delta' => $this->imageDelta->compare(
                $this->getImagePath($snapshot1->getImage()),
                $this->getImagePath($snapshot2->getImage())
            )
        ]);
    }

    /**
     * @Route("/compare-project-snapshots/{snapshot1}/{snapshot2}", name="compare_project_snapshot")
     */
    public function compareProjectSnapshot(ProjectSnapshot $snapshot1, ProjectSnapshot $snapshot2) {

        if ($snapshot2->getTimestamp() < $snapshot1->getTimestamp()) { // make old one go to left
            list($snapshot1, $snapshot2) = [$snapshot2, $snapshot1];
        }

        $compare = [];

        if ($snapshot1->getId() === $snapshot2->getId()) {
            $this->addFlash(
                'warning',
                'You are comparing the snapshot with itself.'
            );
        }

        /** @var PageSnapshot $pageSnapshot */
        foreach ($snapshot1->getSnapshots() as $pageSnapshot) {
            $compare[$pageSnapshot->getPage()->getId()]['snapshot1'] = $pageSnapshot;
        }

        foreach ($snapshot2->getSnapshots() as $pageSnapshot) {
            $compare[$pageSnapshot->getPage()->getId()]['snapshot2'] = $pageSnapshot;
        }

        return $this->render('pages/compare/project-snapshot.html.twig', [
            'snapshot1' => $snapshot1,
            'snapshot2' => $snapshot2,
            'compare' => $compare
        ]);
    }

    /**
     * @Route("/editor/{snapshot1}/{snapshot2}", name="editor", defaults={"snapshot2": null})
     */
    public function editor(PageSnapshot $snapshot1, ?PageSnapshot $snapshot2) {
        return $this->render('pages/compare/editor.html.twig', [
            'snapshot1' => $snapshot1,
            'snapshot2' => $snapshot2,
        ]);
    }

    /**
     * @Route("/image/{snapshot1}/{snapshot2}", name="image", defaults={"snapshot2": null})
     */
    public function imageDiff(PageSnapshot $snapshot1, ?PageSnapshot $snapshot2) {
        return $this->render('pages/compare/editor.html.twig', [
            'snapshot1' => $snapshot1,
            'snapshot2' => $snapshot2,
        ]);
    }

    public function getImagePath(?string $image): string
    {
//        return $this->projectDir . DIRECTORY_SEPARATOR . 'public/snapshots/'. $image;

        return '';
    }
}
