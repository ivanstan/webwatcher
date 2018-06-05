<?php

namespace App\Service;

use App\Entity\Page;
use App\Entity\PageSnapshot;
use Doctrine\ORM\EntityManagerInterface;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\ConnectException;
use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Psr7\Response;

class SnapshotService
{
    private $entityManager;

    private $snapshotDir;

    public function __construct(EntityManagerInterface $entityManager, string $projectDir)
    {
        $this->entityManager = $entityManager;
        $this->snapshotDir = $projectDir.'/public/snapshots/';
    }

    public function new(Page $page): PageSnapshot
    {
        $client = new Client(
            [
                'verify' => false,
            ]
        );

        $request = new Request('GET', $page->getUrl());

        $start = microtime(true);

        $snapshot = new PageSnapshot();

        try {
            $response = $client->send($request, ['timeout' => 10]);

            $snapshot->setResponseCode($response->getStatusCode());
            $snapshot->setBody($response->getBody());
        } catch (ConnectException $exception) {
            $snapshot->setResponseCode($exception->getCode());
        } catch (ClientException $exception) {
            $snapshot->setResponseCode($exception->getCode());
        }

        $responseTime = microtime(true) - $start;

        $dateTime = new \DateTime();
        $image = $this->image($page, $dateTime);
        $snapshot->setTimestamp($dateTime->getTimestamp());
        $snapshot->setPage($page);

        $snapshot->setResponseTime($responseTime);
        if ($image) {
            $snapshot->setImage($image);
        }

        return $snapshot;
    }

    protected function image(Page $page, \DateTime $dateTime): ?string
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
