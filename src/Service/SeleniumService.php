<?php

namespace App\Service;

use App\Entity\PageSnapshot;
use App\Service\Factory\WebDriverFactory;
use Facebook\WebDriver\Cookie;
use Psr\Log\LoggerInterface;

class SeleniumService
{
    public const SNAPSHOT_FOLDER_NAME = 'snapshots';
    public const PUBLIC_FOLDER_NAME = 'public';

    private $projectDir;
    private $logger;
    private $factory;
    private $cookies;

    public function __construct(string $projectDir, LoggerInterface $logger, WebDriverFactory $factory)
    {
        $this->projectDir = $projectDir;
        $this->logger = $logger;
        $this->factory = $factory;
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
            $driver = $this->factory->create();

            /** @var Cookie $cookie */
            foreach ($this->cookies as $cookie) {
//                $driver->manage()->addCookie($cookie->toArray());
            }

            $driver->get($snapshot->getPage()->getUrl())->takeScreenshot($destination);

//            $driver->manage()->window()->setSize(new WebDriverDimension(1225, 996));

            $driver->quit();
            unset($driver);
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
