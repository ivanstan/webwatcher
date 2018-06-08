<?php

namespace App\Service;

use App\Entity\Page;
use App\Entity\PageSnapshot;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\BadResponseException;
use GuzzleHttp\Exception\ConnectException;
use GuzzleHttp\Psr7\Request;

class SnapshotService
{
    public const MAX_TIMEOUT_SEC = 10;

    private $seleniumService;

    public function __construct(SeleniumService $seleniumService)
    {
        $this->seleniumService = $seleniumService;
    }

    public function new(Page $page): PageSnapshot
    {
        $client = new Client([
            'verify' => false,
        ]);

        $request = new Request('GET', $page->getUrl());
        $snapshot = new PageSnapshot();

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

        $snapshot->setTimestamp(time());
        $snapshot->setPage($page);
        $this->seleniumService->setPageSnapshot($snapshot);

        return $snapshot;
    }
}
