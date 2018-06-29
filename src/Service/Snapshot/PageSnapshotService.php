<?php

namespace App\Service\Snapshot;

use App\Entity\Link;
use App\Entity\Page;
use App\Entity\PageSnapshot;
use App\Entity\PageSnapshotSeo;
use App\Repository\LinkRepository;
use App\Service\Factory\PageSnapshotFactory;
use App\Service\Selenium\SeleniumScreenShotService;
use Facebook\WebDriver\Cookie;
use GuzzleHttp\Client;
use GuzzleHttp\Cookie\CookieJar;
use GuzzleHttp\Exception\BadResponseException;
use GuzzleHttp\Exception\ConnectException;
use Symfony\Component\DomCrawler\Crawler;

class PageSnapshotService
{
    public const MAX_TIMEOUT_SEC = 10;

    private $seleniumService;
    private $factory;
    private $cookieJar;
    private $cookies;
    private $links;
    private $linkRepository;

    public function __construct(SeleniumScreenShotService $seleniumService, PageSnapshotFactory $factory, LinkRepository $linkRepository)
    {
        $this->seleniumService = $seleniumService;
        $this->factory = $factory;
        $this->linkRepository = $linkRepository;
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
            $this->links = $this->linkRepository->getLinks()->getQuery()->getResult();
        }

        $this->setPageSeo($snapshot);

        $this->seleniumService->setPageSnapshot($snapshot);

        return $snapshot;
    }

    private function setPageSeo(PageSnapshot $snapshot)
    {
        $seo = new PageSnapshotSeo();

        $crawler = new Crawler($snapshot->getBody());

        if ($crawler->filter('title')->count()) {
            $title = preg_replace(['/\s{2,}/', '/[\t\n]/'], ' ', $crawler->filter('title')->text());
            $seo->setTitle($title);
        }

        if ($crawler->filter("meta[name='description']")->count()) {
            $seo->setMetaDescription($crawler->filter("meta[name='description']")->attr('content'));
        }

        if ($crawler->filter("meta[name='keywords']")->count()) {
            $metaKeywords = $crawler->filter("meta[name='keywords']")->attr('content');

            $seo->setMetaKeywords(explode(',', $metaKeywords));
        }

        if ($crawler->filter("html")->count() && $crawler->filter("html")->attr('lang')) {
            $seo->setLanguage($crawler->filter("html")->attr('lang'));
        }

        if ($crawler->filter('body')->count()) {
            $content = preg_replace(['/\s{2,}/', '/[\t\n]/'], ' ', $crawler->filter('body')->text());
            $seo->setContent($content);
        }

        if ($crawler->filter('h1')->count()) {
            $seo->setH1($crawler->filter('h1')->text());
        }

        $baseUrl = $snapshot->getPage()->getProject()->getBaseUrl();
        $host = parse_url($baseUrl, PHP_URL_HOST);

        $linksToAdd = [];
        foreach ($crawler->filter('a') as $node) {
            $href = $this->forceAbsoluteUrl($node->getAttribute('href'), $baseUrl);

            $type = Link::TYPE_LINK_EXTERNAL;
            if ($host === parse_url($href, PHP_URL_HOST)) {
                $type = Link::TYPE_LINK_INTERNAL;
            }

            $linksToAdd[$href] = $type;
        }

        foreach ($crawler->filter('img') as $node) {
            $src = $this->forceAbsoluteUrl($node->getAttribute('src'), $baseUrl);

            $linksToAdd[$src] = Link::TYPE_LINK_IMAGE;
        }

        foreach ($crawler->filter('script') as $node) {
            $src = $this->forceAbsoluteUrl($node->getAttribute('src'), $baseUrl);

            $linksToAdd[$src] = Link::TYPE_LINK_JAVASCRIPT;
        }

        foreach ($crawler->filter("link[rel='stylesheet']") as $node) {
            $href = $this->forceAbsoluteUrl($node->getAttribute('href'), $baseUrl);

            $linksToAdd[$href] = Link::TYPE_LINK_STYLESHEET;
        }

        foreach ($crawler->filter("link[rel='icon']") as $node) {
            $href = $this->forceAbsoluteUrl($node->getAttribute('href'), $baseUrl);

            $linksToAdd[$href] = Link::TYPE_LINK_RESOURCE;
        }

        foreach ($linksToAdd as $href => $type){
            if (isset($this->links[$href]) && !$seo->linkExists($href)) {
                $seo->addLink($this->links[$href]);
            } else {
                $link = new  Link();
                $link->setType($type);
                $link->setUrl($href);
                if ($host === parse_url($href, PHP_URL_HOST)) {
                    $link->setType(Link::TYPE_LINK_INTERNAL);
                }

                $this->links[$href] = $link;

                if (!$seo->linkExists($href)) {
                    $seo->addLink($link);
                }
            }
        }

        $snapshot->setSeo($seo);
    }

    private function forceAbsoluteUrl($url, $baseUrl) {
        if (parse_url($url, PHP_URL_HOST) === null) {
            $url = $baseUrl . $url;
        }

        return $url;
    }
}
