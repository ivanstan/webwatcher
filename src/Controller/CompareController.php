<?php

namespace App\Controller;

use App\Entity\PageSnapshot;
use App\Entity\ProjectSnapshot;
use App\Utility\Url;
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

        $url = [
            'scheme' => $snapshot->getPage()->getProtocol(),
            'host' => $snapshot->getPage()->getProject()->getDomain(),
        ];

        foreach ($crawler->filter('a') as $link) {
            if (!Url::isAbsolute($link->getAttribute('href'))) {
                $url['path'] = $link->getAttribute('href');
                $link->setAttribute('href', \GuzzleHttp\Psr7\Uri::fromParts($url));
                $link->setAttribute('target', '_blank');
            }
        }

        foreach ($crawler->filter('link') as $stylesheet) {
            if ($stylesheet->hasAttribute('rel') && $stylesheet->getAttribute('rel') === 'stylesheet' && !Url::isAbsolute($stylesheet->getAttribute('href'))) {
                $url['path'] = $stylesheet->getAttribute('href');
                $stylesheet->setAttribute('href', \GuzzleHttp\Psr7\Uri::fromParts($url));
            }
        }

        foreach ($crawler->filter('script') as $script) {
            if ($script->hasAttribute('src') && !Url::isAbsolute($script->getAttribute('src'))) {
                $url['path'] = $script->getAttribute('src');
                $script->setAttribute('src', \GuzzleHttp\Psr7\Uri::fromParts($url));
            }
        }

        foreach ($crawler->filter('img') as $image) {
            if ($image->hasAttribute('src') && !Url::isAbsolute($image->getAttribute('src'))) {
                $url['path'] = $image->getAttribute('src');
                $image->setAttribute('src', \GuzzleHttp\Psr7\Uri::fromParts($url));
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
