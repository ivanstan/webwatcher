<?php

namespace App\Service;

use App\Entity\PageSnapshot;
use Facebook\WebDriver\Remote\DesiredCapabilities;
use Facebook\WebDriver\Remote\RemoteWebDriver;
use Psr\Log\LoggerInterface;

class SeleniumService
{
    public const SNAPSHOT_FOLDER_NAME = 'snapshots';
    public const PUBLIC_FOLDER_NAME = 'public';

    private $seleniumServerUrl;
    private $projectDir;
    private $logger;

    public function __construct(string $seleniumServerUrl, string $projectDir, LoggerInterface $logger)
    {
        $this->projectDir = $projectDir;
        $this->seleniumServerUrl = $seleniumServerUrl;
        $this->logger = $logger;
    }

    public function setPageSnapshot(PageSnapshot $snapshot)
    {
        $filename = $this->getSnapshotFilename($snapshot);
        $destination = $this->getPublicFolder() . '/' . self::SNAPSHOT_FOLDER_NAME . '/' . $filename;

        try {
            $driver = RemoteWebDriver::create($this->seleniumServerUrl, DesiredCapabilities::chrome());
            $driver->get($snapshot->getPage()->getUrl())
                ->takeScreenshot($destination)
            ;

//            $driver->manage()->window()->setSize(new WebDriverDimension(1225, 996));

            $driver->quit();
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
