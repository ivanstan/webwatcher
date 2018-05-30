<?php

namespace App\Service;

use App\Entity\Page;
use App\Entity\PageSnapshot;
use Doctrine\ORM\EntityManagerInterface;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Request;

class SnapshotService
{
    private $entityManager;

    private $snapshotDir;

    public function __construct(EntityManagerInterface $entityManager, string $projectDir)
    {
        $this->entityManager = $entityManager;
        $this->snapshotDir = $projectDir.'/public/snapshots/';
    }

    public function new(Page $page, \DateTime $dateTime): PageSnapshot
    {
        $client = new Client(
            [
                'verify' => false,
            ]
        );

        $request = new Request('GET', $page->getUrl());
        $response = $client->send($request, ['timeout' => 2]);

        $image = $this->image($page, $dateTime);

        $snapshot = new PageSnapshot();
        $snapshot->setBody($response->getBody());
        $snapshot->setTimestamp($dateTime->getTimestamp());
        $snapshot->setPage($page);
        $snapshot->setResponseCode($response->getStatusCode());
        if ($image) {
            $snapshot->setImage($image);
        }

        $this->entityManager->persist($snapshot);
        $this->entityManager->flush();

        return $snapshot;
    }

    public function image(Page $page, \DateTime $dateTime): ?string
    {
        $projectId = $page->getProject()->getId();
        $pageId = $page->getProject()->getId();

        $filename = "project-$projectId-page-$pageId-timestamp-{$dateTime->getTimestamp()}.png";

        $destination = $this->snapshotDir.$filename;

        //@todo fix this code, optimize file

        $command = "/usr/local/bin/wkhtmltoimage {$page->getUrl()} $destination";

        passthru($command, $status);

        if ($status === 0) {
            return 'snapshots/'.$filename;
        }

        return null;
    }
}
