<?php

namespace App\Service;

use App\Entity\PageSnapshot;
use Facebook\WebDriver\Remote\DesiredCapabilities;
use Facebook\WebDriver\Remote\RemoteWebDriver;

class SeleniumService
{
    public const SNAPSHOT_FOLDER_NAME = 'snapshots';
    public const PUBLIC_FOLDER_NAME = 'public';

    private $seleniumServerUrl;
    private $projectDir;

    public function __construct(string $seleniumServerUrl, string $projectDir)
    {
        $this->projectDir = $projectDir;
        $this->seleniumServerUrl = $seleniumServerUrl;
    }

    public function setPageSnapshot(PageSnapshot $snapshot)
    {
        $driver = RemoteWebDriver::create($this->seleniumServerUrl, DesiredCapabilities::chrome());

        $driver->get($snapshot->getPage()->getUrl());

        $filename = $this->getSnapshotFilename($snapshot);
        $destination = $this->getPublicFolder() . '/' . self::SNAPSHOT_FOLDER_NAME . '/' . $filename;
        $driver->takeScreenshot($destination);

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
