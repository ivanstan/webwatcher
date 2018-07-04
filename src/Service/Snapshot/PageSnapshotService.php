<?php

namespace App\Service\Snapshot;

use App\Entity\Link;
use App\Entity\Page;
use App\Entity\PageSnapshot;
use App\Entity\PageSnapshotSeo;
use App\Repository\LinkRepository;
use App\Service\Factory\PageSnapshotFactory;
use App\Service\KeywordExtractor;
use App\Service\Selenium\SeleniumScreenShotService;
use App\Service\Html;
use Facebook\WebDriver\Cookie;
use GuzzleHttp\Client;
use GuzzleHttp\Cookie\CookieJar;
use GuzzleHttp\Exception\BadResponseException;
use GuzzleHttp\Exception\ConnectException;

class PageSnapshotService
{
    public const MAX_TIMEOUT_SEC = 10;

    private $seleniumService;
    private $factory;
    private $cookieJar;
    private $cookies;
    private $links;
    private $linkRepository;
    private $html;
    private $extractor;

    public function __construct(
        SeleniumScreenShotService $seleniumService,
        PageSnapshotFactory $factory,
        LinkRepository $linkRepository,
        Html $html,
        KeywordExtractor $extractor
    )
    {
        $this->seleniumService = $seleniumService;
        $this->factory = $factory;
        $this->linkRepository = $linkRepository;
        $this->html = $html;
        $this->extractor = $extractor;
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

        if ($this->links === null) {
            $this->links = $this->linkRepository->select()->getQuery()->getResult();
        }

        $this->setAdditionalData($snapshot);

        $this->seleniumService->setPageSnapshot($snapshot);

        return $snapshot;
    }

    private function setAdditionalData(PageSnapshot $snapshot)
    {
        if (!$snapshot->getBody()) {
            return;
        }

        $seo = new PageSnapshotSeo();

        $this->html->setHtml($snapshot->getBody());

        $seo->setTitle($this->html->getTitle());
        $seo->setMetaDescription($this->html->getMetaDescription());
        $seo->setLanguage($this->html->getLanguage());
        $seo->setContent($this->html->getContent());
        $seo->setH1($this->html->getH1());

        $metaKeywords = $this->html->getMetaKeywords();
        if (!empty($metaKeywords)) {
            $seo->setMetaKeywords($metaKeywords);
        }

        $snapshot->setSeo($seo);

        $links = [];
        $baseUrl = $snapshot->getPage()->getProject()->getBaseUrl();
        foreach ($this->html->getLinks() as $url => $type) {
            $links[$this->forceAbsoluteUrl($url, $baseUrl)] = $type;
        }

        foreach ($links as $href => $type){
            if (isset($this->links[$href]) && !$snapshot->linkExists($href)) {
                $snapshot->addLink($this->links[$href]);
            } else {
                $link = new  Link();
                $link->setType($type);
                $link->setUrl($href);
                $this->links[$href] = $link;

                if (!$snapshot->linkExists($href)) {
                    $snapshot->addLink($link);
                }
            }
        }
    }

    private function forceAbsoluteUrl($url, $baseUrl) {
        if (parse_url($url, PHP_URL_HOST) === null) {
            $url = $baseUrl . $url;
        }

        return $url;
    }
}
