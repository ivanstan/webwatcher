<?php

namespace App\Service\Snapshot;

use App\Entity\Page;
use App\Entity\PageSnapshot;
use App\Service\Factory\PageSnapshotFactory;
use App\Service\SeleniumService;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\BadResponseException;
use GuzzleHttp\Exception\ConnectException;
use GuzzleHttp\Psr7\Request;

class PageSnapshotService
{
    public const MAX_TIMEOUT_SEC = 10;

    private $seleniumService;
    private $factory;

    public function __construct(SeleniumService $seleniumService, PageSnapshotFactory $factory)
    {
        $this->seleniumService = $seleniumService;
        $this->factory = $factory;
    }

    public function new(Page $page): PageSnapshot
    {
        $client = new Client([
            'verify' => false,
        ]);

        $request = new Request('GET', $page->getUrl());

        $snapshot = $this->factory->create($page);

        try {
            $start = microtime(true);
            $response = $client->send($request, ['timeout' => self::MAX_TIMEOUT_SEC]);
            $snapshot->setResponseTime(microtime(true) - $start);

            $snapshot->setHeaders($response->getHeaders());
            $snapshot->setBody($response->getBody());
            $snapshot->setResponseCode($response->getStatusCode());
        } catch (BadResponseException $exception) {
            $snapshot->setResponseCode($exception->getCode());
            $snapshot->setBody($exception->getRequest()->getBody());
            $snapshot->setHeaders($exception->getRequest()->getHeaders());
        } catch (ConnectException $exception) {

        }

        $this->seleniumService->setPageSnapshot($snapshot);

        return $snapshot;
    }
}
