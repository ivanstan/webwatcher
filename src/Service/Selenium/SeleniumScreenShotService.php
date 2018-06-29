<?php

namespace App\Service\Selenium;

use App\Entity\PageSnapshot;
use Facebook\WebDriver\Cookie;
use Facebook\WebDriver\WebDriverDimension;
use Psr\Log\LoggerInterface;

class SeleniumScreenShotService
{
    public const SNAPSHOT_FOLDER_NAME = 'snapshots';
    public const PUBLIC_FOLDER_NAME = 'public';

    private $projectDir;
    private $logger;
    private $webDriver;
    private $cookies;

    public function __construct(string $projectDir, LoggerInterface $logger, SeleniumWebDriver $webDriver)
    {
        $this->projectDir = $projectDir;
        $this->logger = $logger;
        $this->webDriver = $webDriver;
    }

    public function setCookies(array $cookies)
    {
        $this->cookies = $cookies;
    }

    public function setPageSnapshot(PageSnapshot $snapshot)
    {
        $filename = $this->getSnapshotFilename($snapshot);
        $destination = $this->getPublicFolder() . '/' . self::SNAPSHOT_FOLDER_NAME . '/' . $filename;

        try {
            $driver = $this->webDriver->getInstance();

            $driver->get($snapshot->getPage()->getUrl());

            if (!empty($this->cookies)) {
                /** @var Cookie $cookie */
                foreach ($this->cookies as $cookie) {
                    $driver->manage()->addCookie($cookie->toArray());
                }

                $driver->get($snapshot->getPage()->getUrl());
            }

            $height = $driver->manage()->window()->getSize()->getHeight();
            $width = $driver->manage()->window()->getSize()->getWidth();
            $driver->manage()->window()->setSize(new WebDriverDimension($width, $height));

            $driver->takeScreenshot($destination);

        } catch (\Exception $exception) {
            $this->logger->error($exception->getMessage());

            return;
        }

        $snapshot->setImage(self::SNAPSHOT_FOLDER_NAME . '/' . $filename);
    }

    public function getPublicFolder(): string
    {
        return $this->projectDir . '/' . self::PUBLIC_FOLDER_NAME;
    }

    private function getSnapshotFilename(PageSnapshot $snapshot)
    {
        $dateTime = (new \DateTime())->setTimestamp($snapshot->getTimestamp());

        $projectId = $snapshot->getPage()->getProject()->getId();
        $pageId = $snapshot->getPage()->getId();
        return "project-$projectId-page-$pageId-timestamp-{$dateTime->getTimestamp()}.png";
    }
}
