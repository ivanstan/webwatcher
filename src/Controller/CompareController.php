<?php

namespace App\Controller;

use App\Entity\PageSnapshot;
use App\Entity\ProjectSnapshot;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/tools")
 */
class CompareController extends Controller
{
    /**
     * @Route("/compare/page-snapshots/{snapshot1}/{snapshot2}", name="compare_page_snapshot")
     */
    public function snapshot(PageSnapshot $snapshot1, PageSnapshot $snapshot2)
    {
        $this->setFlashMessages($snapshot1, $snapshot2);
        if ($snapshot2->getTimestamp() < $snapshot1->getTimestamp()) { // make old one go to left
            list($snapshot1, $snapshot2) = [$snapshot2, $snapshot1];
        }

        return $this->render('pages/compare/page-snapshot.html.twig', [
            'snapshot1' => $snapshot1,
            'snapshot2' => $snapshot2,
        ]);
    }

    /**
     * @Route("/compare/project-snapshots/{snapshot1}/{snapshot2}", name="compare_project_snapshot")
     */
    public function compareProjectSnapshot(ProjectSnapshot $snapshot1, ProjectSnapshot $snapshot2)
    {
        $this->setFlashMessages($snapshot1, $snapshot2);
        if ($snapshot2->getTimestamp() < $snapshot1->getTimestamp()) { // make old one go to left
            list($snapshot1, $snapshot2) = [$snapshot2, $snapshot1];
        }

        $compare = [];
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
    public function editor(PageSnapshot $snapshot1, ?PageSnapshot $snapshot2)
    {
        $this->setFlashMessages($snapshot1, $snapshot2);
        if ($snapshot2 && $snapshot2->getTimestamp() < $snapshot1->getTimestamp()) { // make old one go to left
            list($snapshot1, $snapshot2) = [$snapshot2, $snapshot1];
        }

        return $this->render('pages/compare/editor.html.twig', [
            'snapshot1' => $snapshot1,
            'snapshot2' => $snapshot2,
        ]);
    }

    /**
     * @Route("/image/{snapshot1}/{snapshot2}", name="compare_image")
     */
    public function image(PageSnapshot $snapshot1, PageSnapshot $snapshot2)
    {
        $this->setFlashMessages($snapshot1, $snapshot2);
        if ($snapshot2 && $snapshot2->getTimestamp() < $snapshot1->getTimestamp()) { // make old one go to left
            list($snapshot1, $snapshot2) = [$snapshot2, $snapshot1];
        }

        return $this->render('pages/compare/image.html.twig', [
            'snapshot1' => $snapshot1,
            'snapshot2' => $snapshot2,
        ]);
    }

    /**
     * @Route("/iframe/{snapshot}", name="iframe")
     */
    public function iframe(PageSnapshot $snapshot)
    {
        $crawler = new Crawler($snapshot->getBody());
        $baseUrl = $snapshot->getPage()->getProject()->getBaseUrl();

        foreach ($crawler->filter('a') as $link) {
            $link->setAttribute('href', $baseUrl . $link->getAttribute('href'));
            $link->setAttribute('target', '_blank');
        }

        foreach ($crawler->filter('link') as $stylesheet) {
            if ($stylesheet->hasAttribute('rel') && $stylesheet->getAttribute('rel') === 'stylesheet') {
                $stylesheet->setAttribute('href', $baseUrl . $stylesheet->getAttribute('href'));
            }
        }

        foreach ($crawler->filter('script') as $script) {
            if ($script->hasAttribute('src')) {
                $script->setAttribute('src', $baseUrl . $script->getAttribute('src'));
            }
        }

        try {
            $html = $crawler->html();
        } catch (\Exception $exception) {
            $html = '';
        }

        if ($snapshot->hasHeader('Content-Type')) {
            // ToDo replace hardcoded content type with one from header
        }

        return $this->render('pages/compare/iframe.html.twig', [
            'snapshot1' => $snapshot,
            'html' => $html,
        ]);
    }

    /**
     * @Route("/image-source/{snapshot}", name="image_source")
     */
    public function imageData(PageSnapshot $snapshot)
    {
        $projectDir = $this->getParameter('kernel.project_dir');

        return BinaryFileResponse::create($projectDir . '/public/' . $snapshot->getImage());
    }

    private function setFlashMessages($snapshot1, $snapshot2): void
    {
        if ($snapshot2 && $snapshot1->getId() === $snapshot2->getId()) {
            $this->addFlash(
                'warning',
                'You are comparing the snapshot with itself.'
            );
        }
    }
}
