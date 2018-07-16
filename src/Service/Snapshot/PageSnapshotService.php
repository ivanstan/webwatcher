<?php

namespace App\Service\Snapshot;

use App\Entity\AbstractResource;
use App\Entity\AbstractSnapshot;
use App\Service\Factory\PageSnapshotFactory;
use App\Service\File\ImageFileManager;
use App\Service\Html;
use App\Service\KeywordExtractor;
use App\Service\Selenium\WebScreenshotService;
use App\Service\Selenium\SeleniumWebDriver;
use Facebook\WebDriver\Cookie;
use GuzzleHttp\Cookie\CookieJar;

class PageSnapshotService implements SnapshotServiceInterface
{
    public const MAX_TIMEOUT_SEC = 10;

    private $seleniumService;
    private $factory;
    private $cookieJar;
    private $cookies;
    private $html;
    private $extractor;
    private $webDriver;
    private $imageFileManager;

    public function __construct(
        WebScreenshotService $seleniumService,
        PageSnapshotFactory $factory,
        Html $html,
        KeywordExtractor $extractor,
        SeleniumWebDriver $webDriver,
        ImageFileManager $imageFileManager
    )
    {
        $this->seleniumService = $seleniumService;
        $this->factory = $factory;
        $this->html = $html;
        $this->extractor = $extractor;
        $this->webDriver = $webDriver;
        $this->imageFileManager = $imageFileManager;
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

        $proxy = $this->webDriver->getProxy();

        $proxy->setup('page_1');

        $snapshot = $this->factory->create($page);

        if (!empty($this->cookies)) {
            $this->seleniumService->setCookies($this->cookies);
        }

        $har = $proxy->har();
        $snapshot->setHar($har);

        $destination = $this->imageFileManager->getSnapshotImageDestination($snapshot);
        $image = $this->seleniumService->getPageScreenShot($page->getUrl());
        $imagePath = $this->imageFileManager->getSnapshotImagePath($snapshot);
        $this->imageFileManager->save($destination, $image);
        $snapshot->setImage($imagePath);

        $snapshot->setResponseCode(0);

        return $snapshot;
    }
}
