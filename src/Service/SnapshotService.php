<?php

namespace App\Service;

use App\Entity\Page;
use App\Entity\PageSnapshot;
use Doctrine\ORM\EntityManagerInterface;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\BadResponseException;
use GuzzleHttp\Exception\ConnectException;
use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Psr7\Request;

class SnapshotService
{
    private $entityManager;

    private $snapshotDir;
    /**
     * @var SeleniumService
     */
    private $seleniumService;

    public function __construct(EntityManagerInterface $entityManager, string $projectDir, SeleniumService $seleniumService)
    {
        $this->entityManager = $entityManager;
        $this->snapshotDir = $projectDir.'/public/snapshots/';
        $this->seleniumService = $seleniumService;
    }

    public function new(Page $page): PageSnapshot
    {
        $dateTime = new \DateTime();
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

            $snapshot->setHeaders($response->getHeaders());
            $snapshot->setBody($response->getBody());
            $snapshot->setResponseCode($response->getStatusCode());
        } catch (BadResponseException $exception) {
            $snapshot->setResponseCode($exception->getCode());
            $snapshot->setBody($exception->getRequest()->getBody());
            $snapshot->setHeaders($exception->getRequest()->getHeaders());
        } catch (ConnectException $exception) {

        }

        $snapshot->setResponseTime(microtime(true) - $start);
        $snapshot->setTimestamp($dateTime->getTimestamp());
        $snapshot->setPage($page);

        $this->seleniumService->setPageSnapshot($snapshot);

        return $snapshot;
    }
}
