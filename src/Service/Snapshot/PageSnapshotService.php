<?php

namespace App\Service\Snapshot;

use App\Entity\Page;
use App\Entity\PageSnapshot;
use App\Service\Factory\PageSnapshotFactory;
use App\Service\SeleniumService;
use Facebook\WebDriver\Cookie;
use GuzzleHttp\Client;
use GuzzleHttp\Cookie\CookieJar;
use GuzzleHttp\Exception\BadResponseException;
use GuzzleHttp\Exception\ConnectException;
use GuzzleHttp\Psr7\Request;

class PageSnapshotService
{
    public const MAX_TIMEOUT_SEC = 10;

    private $seleniumService;
    private $factory;
    private $cookieJar;
    private $cookies;

    public function __construct(SeleniumService $seleniumService, PageSnapshotFactory $factory)
    {
        $this->seleniumService = $seleniumService;
        $this->factory = $factory;
    }

    public function setCookies($cookies): void
    {
        if (empty($cookies)) {
            return;
        }

        $domain = '';
        $cookieArray = [];
        /** @var Cookie $cookie */
        foreach ($cookies as $cookie) {
            $domain = $cookie->getDomain();
            $cookieArray[$cookie->getName()] = $cookie->getValue();
        }

        $this->cookies = $cookies;
        $this->cookieJar = CookieJar::fromArray($cookieArray, $domain);
    }

    public function getHeaders()
    {
        $headers = [];
        if ($this->cookieJar) {
            $headers['cookies'] = $this->cookieJar;
        }

        return $headers;
    }

    public function new(Page $page): PageSnapshot
    {
        $client = new Client([
            'verify' => false,
            'timeout' => self::MAX_TIMEOUT_SEC
        ]);

        $snapshot = $this->factory->create($page);

        try {
            $start = microtime(true);
            $response = $client->request('GET', $page->getUrl(), $this->getHeaders());
            $snapshot->setResponseTime(microtime(true) - $start);

            $snapshot->setResponseCode($response->getStatusCode());
            $snapshot->setHeaders($response->getHeaders());
            $snapshot->setBody($response->getBody());
        } catch (BadResponseException $exception) {
            $snapshot->setResponseCode($exception->getCode());
            $snapshot->setHeaders($exception->getRequest()->getHeaders());
            $snapshot->setBody($exception->getRequest()->getBody());
        } catch (ConnectException $exception) {
            $snapshot->setResponseCode(0);
        }

        if (!empty($this->cookies)) {
            $this->seleniumService->setCookies($this->cookies);
        }

        $this->seleniumService->setPageSnapshot($snapshot);

        return $snapshot;
    }
}
