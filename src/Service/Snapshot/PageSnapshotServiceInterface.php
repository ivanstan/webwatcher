<?php

namespace App\Service\Snapshot;

use App\Entity\AbstractResource;
use App\Entity\AbstractSnapshot;
use App\Entity\Page;
use App\Entity\PageSnapshot;
use App\Service\Factory\PageSnapshotFactory;
use App\Service\Html;
use App\Service\KeywordExtractor;
use App\Service\Selenium\SeleniumScreenShotService;
use App\Service\Selenium\SeleniumWebDriver;
use Facebook\WebDriver\Cookie;
use Facebook\WebDriver\WebDriver;
use GuzzleHttp\Cookie\CookieJar;

class PageSnapshotServiceInterface implements SnapshotServiceInterface
{
    public const MAX_TIMEOUT_SEC = 10;

    private $seleniumService;
    private $factory;
    private $cookieJar;
    private $cookies;
    private $html;
    private $extractor;
    /** @var WebDriver */
    private $webDriver;

    public function __construct(
        SeleniumScreenShotService $seleniumService,
        PageSnapshotFactory $factory,
        Html $html,
        KeywordExtractor $extractor,
        SeleniumWebDriver $webDriver
    )
    {
        $this->seleniumService = $seleniumService;
        $this->factory = $factory;
        $this->html = $html;
        $this->extractor = $extractor;
        $this->webDriver = $webDriver;
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

    public function snapshot(AbstractResource $page): AbstractSnapshot
    {
        $this->webDriver->setup();

        $driver = $this->webDriver->getDriver();
        $proxy = $this->webDriver->getProxy();

        $proxy->setup('page_1');

        $snapshot = $this->factory->create($page);

        if (!empty($this->cookies)) {
            $this->seleniumService->setCookies($this->cookies);
        }

        $image = $this->seleniumService->setPageSnapshot($page->getUrl(), $snapshot);

        $har = $proxy->har();

        $snapshot->setHar($har);
        $snapshot->setImage($image);
        $snapshot->setResponseCode(0);

        return $snapshot;
    }
}
