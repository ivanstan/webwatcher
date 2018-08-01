<?php

namespace App\Service\Snapshot;

use App\Entity\Page;
use App\Entity\PageSnapshot;
use App\Service\Analytics\KeywordExtractor;
use App\Service\Factory\PageSnapshotFactory;
use App\Service\File\ImageFileManager;
use App\Service\Html;
use App\Service\HttpArchive\HttpArchive;
use App\Service\Selenium\SeleniumWebDriver;
use App\Service\Selenium\WebScreenshotService;
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

    /**
     * @param Page $page
     */
    public function snapshot($page): PageSnapshot
    {
        $this->webDriver->setup();

        $proxy = $this->webDriver->getProxy();
        $proxy->setup('project-' . $page->getProject()->getId() . '-page-' . $page->getId());

        $snapshot = $this->factory->create($page);

        if (!empty($this->cookies)) {
            $this->seleniumService->setCookies($this->cookies);
        }

        $destination = $this->imageFileManager->getSnapshotImageDestination($snapshot, 'full-page');
        $image = $this->seleniumService->getPageScreenShot($page->getUrl());
        $imagePath = $this->imageFileManager->getSnapshotImagePath($snapshot, 'full-page');
        $this->imageFileManager->save($destination, $image);
        $snapshot->setImage($imagePath);

        $har = $proxy->har();
        $snapshot->setHar(json_decode($har, true));

        $har = HttpArchive::fromString($har);
        $entry = $har->getEntry($page->getUrl());

        $snapshot->setResponseCode(0);

        if ($entry) {
            $snapshot->setResponseCode($entry['response']['status']);
            $snapshot->setHeaders($entry['response']['headers']);
        }

        return $snapshot;
    }

//    public function thumbnail(string $base64, $finalWidth = 400, $finalHeight = 300): string
//    {
//        $size = getimagesizefromstring($base64);
//        $initWidth = $size[0];
//        $initHeight = $size[1];
//
//        $ratio = $initWidth / $initHeight;
//        if ($ratio > 1) {
//            $width = 500;
//            $initHeight = 500 / $ratio;
//        } else {
//            $width = 500 * $ratio;
//            $height = 500;
//        }
//
//        $destination = imagecreatetruecolor($finalWidth, $finalHeight);
//        imagecopyresampled($destination, $base64, 0, 0, 0, 0, $finalWidth, $finalHeight, $initWidth, $initHeight);
//        imagedestroy($base64);
//        imagepng($destination, '~/Desktop/test.png'); // adjust format as needed
//        imagedestroy($destination);
//    }
}
